const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 8430;
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const DB_PATH = path.join(DATA_DIR, 'dashboard.db');
const API_KEY = process.env.API_KEY || 'change-this-api-key';
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-session-secret';

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

initDb();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

app.locals.formatDate = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('de-DE');
};

app.locals.formatHours = (value) => {
  const n = Number(value || 0);
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
};

app.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  return req.session.user.role === 'admin' ? res.redirect('/admin') : res.redirect('/worker');
});

app.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT id, username, password_hash, role FROM users WHERE username = ?').get((username || '').trim());

  if (!user || !bcrypt.compareSync(password || '', user.password_hash)) {
    return res.status(401).render('login', { error: 'Ungültiger Username oder Passwort.' });
  }

  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.redirect('/');
});

app.post('/logout', requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/worker', requireRole('worker'), (req, res) => {
  const month = normalizeMonth(req.query.month);
  const monthStart = `${month}-01`;
  const monthEnd = nextMonthFirst(month);

  const tasks = db
    .prepare(`SELECT * FROM tasks ORDER BY 
      CASE status WHEN 'open' THEN 1 WHEN 'in_progress' THEN 2 ELSE 3 END,
      COALESCE(deadline, '9999-12-31') ASC,
      created_at DESC`)
    .all();

  const availability = db
    .prepare('SELECT * FROM availability WHERE date >= ? AND date < ? ORDER BY date ASC')
    .all(monthStart, monthEnd);

  const reportRows = db
    .prepare('SELECT * FROM tasks WHERE status = ? AND completed_at >= ? AND completed_at < ? ORDER BY completed_at DESC')
    .all('done', monthStart, monthEnd);

  const workedHours = reportRows.reduce((sum, row) => sum + Number(row.hours_spent || 0), 0);
  const availableHours = availability.reduce((sum, row) => sum + Number(row.hours || 0), 0);
  const maxHours = 20;
  const remainingHours = Math.max(maxHours - workedHours, 0);

  res.render('worker-dashboard', {
    user: req.session.user,
    month,
    tasks,
    availability,
    reportRows,
    workedHours,
    availableHours,
    maxHours,
    remainingHours
  });
});

app.post('/worker/tasks/:id/complete', requireRole('worker'), (req, res) => {
  const id = Number(req.params.id);
  const hours = Number(req.body.hours_spent || 0);

  if (!Number.isFinite(hours) || hours < 0) {
    return res.status(400).send('Ungültige Stundenangabe');
  }

  db.prepare(
    `UPDATE tasks
     SET status = 'done',
         hours_spent = ?,
         completed_at = ?
     WHERE id = ?`
  ).run(hours, new Date().toISOString(), id);

  res.redirect('/worker');
});

app.post('/worker/availability', requireRole('worker'), (req, res) => {
  const date = (req.body.date || '').trim();
  const timeSlot = (req.body.time_slot || '').trim();
  const note = (req.body.note || '').trim();
  const hours = Number(req.body.hours || 0);

  if (!isIsoDate(date) || !Number.isFinite(hours) || hours < 0 || hours > 24) {
    return res.status(400).send('Ungültige Verfügbarkeitsdaten');
  }

  db.prepare(
    `INSERT INTO availability (date, hours, time_slot, note)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET
       hours = excluded.hours,
       time_slot = excluded.time_slot,
       note = excluded.note`
  ).run(date, hours, timeSlot || null, note || null);

  const month = date.slice(0, 7);
  res.redirect(`/worker?month=${month}`);
});

app.get('/admin', requireRole('admin'), (req, res) => {
  const filterStatus = req.query.status || '';
  const filterPriority = req.query.priority || '';
  const filterMonth = normalizeMonth(req.query.month);
  const monthStart = `${filterMonth}-01`;
  const monthEnd = nextMonthFirst(filterMonth);

  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (filterStatus) {
    query += ' AND status = ?';
    params.push(filterStatus);
  }
  if (filterPriority) {
    query += ' AND priority = ?';
    params.push(filterPriority);
  }
  if (filterMonth) {
    query += ' AND ((deadline >= ? AND deadline < ?) OR (created_at >= ? AND created_at < ?))';
    params.push(monthStart, monthEnd, monthStart, monthEnd);
  }
  query += ' ORDER BY created_at DESC';

  const tasks = db.prepare(query).all(...params);
  const availability = db.prepare('SELECT * FROM availability ORDER BY date DESC LIMIT 60').all();
  const reportRows = db
    .prepare('SELECT * FROM tasks WHERE completed_at >= ? AND completed_at < ? ORDER BY completed_at DESC')
    .all(monthStart, monthEnd);
  const reportTotal = reportRows.reduce((sum, row) => sum + Number(row.hours_spent || 0), 0);

  res.render('admin-dashboard', {
    user: req.session.user,
    filters: { status: filterStatus, priority: filterPriority, month: filterMonth },
    tasks,
    availability,
    reportRows,
    reportTotal
  });
});

app.post('/admin/tasks', requireRole('admin'), (req, res) => {
  const { title, description, priority, deadline } = req.body;
  if (!title || !priority) return res.status(400).send('Titel und Priorität sind erforderlich');

  db.prepare(
    `INSERT INTO tasks (title, description, priority, deadline, status, hours_spent, created_at, created_by)
     VALUES (?, ?, ?, ?, 'open', 0, ?, 'paul')`
  ).run(title.trim(), (description || '').trim(), priority, deadline || null, new Date().toISOString());

  res.redirect('/admin');
});

app.post('/admin/tasks/:id/update', requireRole('admin'), (req, res) => {
  const id = Number(req.params.id);
  const { title, description, priority, deadline, status, hours_spent } = req.body;
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!existing) return res.status(404).send('Task nicht gefunden');

  let completedAt = existing.completed_at;
  if (status === 'done' && !existing.completed_at) completedAt = new Date().toISOString();
  if (status !== 'done') completedAt = null;

  db.prepare(
    `UPDATE tasks
       SET title = ?, description = ?, priority = ?, deadline = ?, status = ?, hours_spent = ?, completed_at = ?
     WHERE id = ?`
  ).run(
    (title || '').trim() || existing.title,
    (description || '').trim(),
    priority || existing.priority,
    deadline || null,
    status || existing.status,
    Number(hours_spent || 0),
    completedAt,
    id
  );

  res.redirect('/admin');
});

app.post('/admin/tasks/:id/delete', requireRole('admin'), (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.redirect('/admin');
});

app.get('/admin/report.csv', requireRole('admin'), (req, res) => {
  const month = normalizeMonth(req.query.month);
  const monthStart = `${month}-01`;
  const monthEnd = nextMonthFirst(month);

  const rows = db
    .prepare('SELECT title, hours_spent, status, completed_at FROM tasks WHERE completed_at >= ? AND completed_at < ? ORDER BY completed_at DESC')
    .all(monthStart, monthEnd);

  const csv = [
    'title,hours_spent,status,completed_at',
    ...rows.map((r) =>
      [escapeCsv(r.title), escapeCsv(r.hours_spent), escapeCsv(r.status), escapeCsv(r.completed_at)].join(',')
    )
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="report-${month}.csv"`);
  res.send(csv);
});

function requireApiKey(req, res, next) {
  const key = req.header('X-API-Key');
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
}

app.get('/api/tasks', requireApiKey, (req, res) => {
  const { status, month } = req.query;
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const monthStart = `${month}-01`;
    const monthEnd = nextMonthFirst(month);
    query += ' AND ((deadline >= ? AND deadline < ?) OR (created_at >= ? AND created_at < ?))';
    params.push(monthStart, monthEnd, monthStart, monthEnd);
  }

  query += ' ORDER BY created_at DESC';
  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

app.post('/api/tasks', requireApiKey, (req, res) => {
  const { title, description = '', priority = 'medium', deadline = null } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  const info = db.prepare(
    `INSERT INTO tasks (title, description, priority, deadline, status, hours_spent, created_at, created_by)
     VALUES (?, ?, ?, ?, 'open', 0, ?, 'turtok')`
  ).run(title.trim(), String(description).trim(), priority, deadline, new Date().toISOString());

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', requireApiKey, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Task not found' });

  const payload = req.body || {};
  const status = payload.status || existing.status;
  let completedAt = existing.completed_at;
  if (status === 'done' && !existing.completed_at) completedAt = new Date().toISOString();
  if (status !== 'done') completedAt = null;

  db.prepare(
    `UPDATE tasks
      SET title = ?, description = ?, priority = ?, deadline = ?, status = ?, hours_spent = ?, completed_at = ?
     WHERE id = ?`
  ).run(
    payload.title ? String(payload.title).trim() : existing.title,
    payload.description !== undefined ? String(payload.description).trim() : existing.description,
    payload.priority || existing.priority,
    payload.deadline !== undefined ? payload.deadline : existing.deadline,
    status,
    payload.hours_spent !== undefined ? Number(payload.hours_spent) : existing.hours_spent,
    completedAt,
    id
  );

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/tasks/:id', requireApiKey, (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (!info.changes) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

app.get('/api/availability', requireApiKey, (req, res) => {
  const { week } = req.query;
  let query = 'SELECT * FROM availability';
  const params = [];

  if (week && /^\d{4}-W\d{2}$/.test(week)) {
    const { start, end } = weekToRange(week);
    query += ' WHERE date >= ? AND date < ?';
    params.push(start, end);
  }

  query += ' ORDER BY date ASC';
  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

app.post('/api/availability', requireApiKey, (req, res) => {
  const { date, hours = 0, timeSlot = null, note = null } = req.body;
  if (!isIsoDate(date)) return res.status(400).json({ error: 'date must be YYYY-MM-DD' });

  db.prepare(
    `INSERT INTO availability (date, hours, time_slot, note)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET
       hours = excluded.hours,
       time_slot = excluded.time_slot,
       note = excluded.note`
  ).run(date, Number(hours), timeSlot, note);

  const row = db.prepare('SELECT * FROM availability WHERE date = ?').get(date);
  res.status(201).json(row);
});

app.get('/api/report/:month', requireApiKey, (req, res) => {
  const month = req.params.month;
  if (!/^\d{4}-\d{2}$/.test(month)) return res.status(400).json({ error: 'month must be YYYY-MM' });

  const monthStart = `${month}-01`;
  const monthEnd = nextMonthFirst(month);
  const rows = db
    .prepare('SELECT id, title, status, hours_spent, completed_at FROM tasks WHERE completed_at >= ? AND completed_at < ? ORDER BY completed_at DESC')
    .all(monthStart, monthEnd);
  const totalHours = rows.reduce((sum, row) => sum + Number(row.hours_spent || 0), 0);

  res.json({ month, totalHours, tasks: rows });
});

app.listen(PORT, () => {
  console.log(`Dennis Dashboard läuft auf http://localhost:${PORT}`);
  console.log(`SQLite DB: ${DB_PATH}`);
});

function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    if (req.session.user.role !== role) return res.status(403).send('Kein Zugriff');
    next();
  };
}

function normalizeMonth(month) {
  const now = new Date();
  const fallback = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return fallback;
  return month;
}

function nextMonthFirst(month) {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1, 1));
  d.setUTCMonth(d.getUTCMonth() + 1);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-01`;
}

function isIsoDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function weekToRange(week) {
  const [yearPart, weekPart] = week.split('-W');
  const year = Number(yearPart);
  const weekNo = Number(weekPart);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - day + 1 + (weekNo - 1) * 7);
  const sundayPlusOne = new Date(monday);
  sundayPlusOne.setUTCDate(monday.getUTCDate() + 7);

  const toIso = (d) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return { start: toIso(monday), end: toIso(sundayPlusOne) };
}

function escapeCsv(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'worker'))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high', 'critical')),
      deadline TEXT,
      status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'in_progress', 'done')),
      hours_spent REAL DEFAULT 0,
      created_at TEXT NOT NULL,
      completed_at TEXT,
      created_by TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      hours REAL NOT NULL DEFAULT 0,
      time_slot TEXT,
      note TEXT
    );
  `);

  seedUser('paul', 'admin123', 'admin');
  seedUser('dennis', 'dennis123', 'worker');
}

function seedUser(username, password, role) {
  const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (user) return;

  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run(username, hash, role);
}
