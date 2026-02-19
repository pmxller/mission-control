# Dennis Dashboard — Technische Spec

## Überblick
Task-Management + Zeiterfassung für Minijob-Mitarbeiter Dennis. Zwei Rollen: Admin (Paul) und Mitarbeiter (Dennis). Plus REST-API damit Turtok Aufgaben automatisch anlegen kann.

## Tech Stack
- **Frontend:** HTML/CSS/JS (Vanilla oder leichtes Framework)
- **Backend:** Node.js + Express
- **Datenbank:** SQLite (leichtgewichtig, kein externer DB-Server)
- **Auth:** Einfaches Passwort-Login (zwei Accounts: paul + dennis)
- **Hosting:** Lokal auf Mac Mini (Port 8430)

## Seiten

### 1. Login
- Einfaches Login mit Username + Passwort
- Zwei Rollen: `admin` (Paul) und `worker` (Dennis)

### 2. Dennis-View (Worker)

#### 2a. Meine Aufgaben
- Liste aller zugewiesenen Aufgaben (offen + erledigt)
- Jede Aufgabe zeigt: Titel, Beschreibung, Priorität, Deadline, Status
- Button: "Erledigt" → markiert als done + fragt nach Stunden
- Stunden-Input pro Aufgabe (z.B. "2.5h")

#### 2b. Verfügbarkeit eintragen
- Kalender-/Wochenansicht
- Pro Tag: Zeitslot eintragen (z.B. "Mo: 10-14 Uhr" oder "3h verfügbar")
- Monatsübersicht: Gesamt verfügbare Stunden vs. max 20h

#### 2c. Mein Monat
- Übersicht: Stunden gearbeitet / Stunden verfügbar / Stunden übrig
- Liste erledigter Aufgaben mit Stunden
- Progress-Bar (z.B. 12/20h genutzt)

### 3. Admin-View (Paul)

#### 3a. Aufgaben verwalten
- Alle Aufgaben sehen (offen, in Arbeit, erledigt)
- Neue Aufgabe erstellen: Titel, Beschreibung, Priorität (low/medium/high/critical), Deadline
- Aufgabe bearbeiten / löschen
- Filter: Status, Priorität, Monat

#### 3b. Dennis' Verfügbarkeit
- Wochenansicht von Dennis' eingetragenen Zeiten
- Auf einen Blick sehen: Wann hat er Zeit?

#### 3c. Monatsbericht
- Monats-Dropdown zur Auswahl
- Tabelle: Aufgabe | Stunden | Status | Datum erledigt
- Summe: Gesamtstunden im Monat
- Export als CSV (optional)

### 4. API-Endpunkte (für Turtok)

```
POST   /api/tasks          → Neue Aufgabe {title, description, priority, deadline}
GET    /api/tasks           → Alle Aufgaben (Filter: ?status=open&month=2026-02)
PATCH  /api/tasks/:id       → Aufgabe updaten (Status, Stunden etc.)
DELETE /api/tasks/:id       → Aufgabe löschen

GET    /api/availability    → Dennis' Verfügbarkeit (?week=2026-W08)
POST   /api/availability    → Verfügbarkeit eintragen {date, hours, timeSlot}

GET    /api/report/:month   → Monatsbericht (z.B. /api/report/2026-02)
```

Auth: Simple API-Key im Header (`X-API-Key: <key>`) für Turtok-Zugriff.

## Datenmodell

### tasks
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | INTEGER PK | Auto-increment |
| title | TEXT | Aufgabentitel |
| description | TEXT | Details |
| priority | TEXT | low/medium/high/critical |
| deadline | TEXT | ISO-Date (optional) |
| status | TEXT | open/in_progress/done |
| hours_spent | REAL | Stunden gearbeitet |
| created_at | TEXT | ISO-Timestamp |
| completed_at | TEXT | ISO-Timestamp (nullable) |
| created_by | TEXT | paul/turtok |

### availability
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | INTEGER PK | Auto-increment |
| date | TEXT | ISO-Date |
| hours | REAL | Verfügbare Stunden |
| time_slot | TEXT | z.B. "10:00-14:00" (optional) |
| note | TEXT | Notiz (optional) |

### users
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | INTEGER PK | |
| username | TEXT | paul / dennis |
| password_hash | TEXT | bcrypt |
| role | TEXT | admin / worker |

## Design
- Clean, modern, minimalistisch
- Farbschema: Dunkel/Hell Toggle (default: hell)
- Mobile-responsive (Dennis soll es auch vom Handy nutzen können)
- Ähnlicher Stil wie das Mission Control Dashboard (Liquid Glass optional)

## Wichtig
- Muss auf Mac Mini laufen (localhost:8430)
- SQLite-DB unter `02-Projects/dennis-dashboard/data/dashboard.db`
- Alles in einem Ordner: `02-Projects/dennis-dashboard/app/`
- README mit Setup-Anleitung (npm install + npm start)
- Default-Accounts: paul/admin123 und dennis/dennis123 (werden später geändert)
