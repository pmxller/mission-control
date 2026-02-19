# Dennis Task-Dashboard — Mitarbeiter-Management

## Mitarbeiter
- **Name:** Dennis
- **Basis:** 520€/Monat (Minijob)
- **Max. Stunden:** ~20h/Monat
- **Aufgaben:** Bürokratie, Dokumente, Berichte, Papierkram, Krankenkasse etc.

## Dashboard-Anforderungen

### Für Dennis (Login-Bereich)
- Verfügbare Zeiten eintragen (pro Woche/Tag)
- Zugewiesene Aufgaben sehen
- Aufgaben abhaken + Stunden pro Aufgabe eintragen
- Übersicht: Verbrauchte Stunden vs. verfügbare Stunden im Monat

### Für Paul (Admin/Turtok-Schnittstelle)
- Aufgaben erstellen und zuweisen (auch via Turtok → API)
- Dennis' verfügbare Zeiten einsehen
- Monatsübersicht: Aufgaben erledigt + Stunden gesamt
- Task-Prioritäten setzen

### API (Turtok-Integration)
- POST /api/tasks → Neue Aufgabe anlegen
- GET /api/tasks → Alle Aufgaben abrufen
- GET /api/availability → Dennis' Verfügbarkeit abrufen
- GET /api/report/:month → Monatsbericht
- Datenformat: JSON, gespeichert in lokaler JSON-Datei oder SQLite

## Status
- [ ] Spec erstellen
- [ ] Dashboard bauen (Bisa-Code)
- [ ] Deployment auf Mac Mini
- [ ] Dennis Zugang einrichten
