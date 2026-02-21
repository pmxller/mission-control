# DECISIONS.md

Format:
- YYYY-MM-DD | Decision | Why | Impact | TTL

## Entries
- 2026-02-15 | Memory-OS als Markdown-first aufgebaut (MEMORY.md + daily logs + decisions + project files) | Schnell, wartungsarm, sofort nutzbar ohne Overengineering | Bessere Kontinuität und weniger Kontextverlust | Permanent
- 2026-02-15 | API-Key nur für Voice-Memo-Transkription/Übersetzung | Kostenkontrolle und klare Trennung von Chat vs. Audio-Processing | Niedriger API-Verbrauch im Alltag | Permanent
- 2026-02-15 | Wochenpriorität: Förderanträge + BAFA-Berichte vor Website/Community | Deadline-/Cashflow-Kritikalität | Fokus auf zwingend notwendige Aufgaben zuerst | Active (14d)
- 2026-02-17 | MEMORY-Baseline + Reset-Script eingeführt (`05-Memory/MEMORY-BASELINE.md`, `scripts/memory-reset.sh`) | Drift reduzieren, schnelle Recovery mit Backup | Stabileres Langzeitverhalten ohne Overengineering | Permanent
- 2026-02-17 | Rollenklärung Agenten: Delegation nur durch 🐢 Turtok; ⚡ Pika als ausführender Social-Media/Marketing-Spezialist | Falsche Zuordnung in vorheriger Zusammenfassung korrigieren | Klarere Verantwortlichkeiten, weniger Missverständnisse | Permanent
