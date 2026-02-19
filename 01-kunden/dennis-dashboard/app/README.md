# Dennis Dashboard (Task-Management + Zeiterfassung)

## Features
- Node.js + Express + SQLite (`better-sqlite3`)
- Login mit Sessions (2 Rollen)
  - Admin: `paul / admin123`
  - Worker: `dennis / dennis123`
- Worker-Dashboard
  - Aufgaben sehen
  - Aufgabe als erledigt markieren + Stunden eintragen
  - Verfügbarkeit je Tag eintragen
  - Monatsübersicht inkl. Progress (20h)
- Admin-Dashboard
  - Aufgaben CRUD + Filter
  - Verfügbarkeit ansehen
  - Monatsbericht + CSV Export
- REST API mit API-Key (`X-API-Key`)

## Pfade
- App: `02-Projects/dennis-dashboard/app`
- SQLite DB (auto-created): `02-Projects/dennis-dashboard/data/dashboard.db`
- Port: `http://localhost:8430`

## Setup
```bash
cd /Users/turtok/.openclaw/workspace/02-Projects/dennis-dashboard/app
npm install
cp .env.example .env
# API_KEY / SESSION_SECRET in .env anpassen
npm start
```

## API Endpunkte
Auth für alle API-Routen:
- Header: `X-API-Key: <dein_api_key>`

### Tasks
- `POST /api/tasks` → `{ title, description, priority, deadline }`
- `GET /api/tasks?status=open&month=2026-02`
- `PATCH /api/tasks/:id` → beliebige Task-Felder (`status`, `hours_spent`, ...)
- `DELETE /api/tasks/:id`

### Availability
- `GET /api/availability?week=2026-W08`
- `POST /api/availability` → `{ date, hours, timeSlot, note }`

### Monatsreport
- `GET /api/report/:month` → z.B. `/api/report/2026-02`

## Hinweise
- Beim ersten Start wird die DB-Struktur automatisch erstellt.
- Default-User werden automatisch angelegt, falls nicht vorhanden.
- Für Produktion `SESSION_SECRET` und `API_KEY` unbedingt ändern.
