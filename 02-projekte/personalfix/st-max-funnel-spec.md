# St-Max Personal — Bewerbungs-Funnel Spec

## Ziel
Perspective Funnels (350€/Monat) durch selbst gebaute Bewerbungsseiten ersetzen.

## Original-URL
https://apply.personalfix.co/st-lager-koblenz/

## Seitenstruktur (Multi-Step Funnel)

### Seite 1: Landingpage
- **Header:** ST Personal Logo + grüner Banner "Finde in unter 2 Minuten heraus, ob dieser Job zu dir passt!"
- **Job-Titel:** "Wir suchen Dich als **Lagerarbeiter** (m/w/d)"
- **Meta-Info:** 📍 Koblenz - 🕑 Vollzeit - 🚀 ab sofort - 💰 Top Gehalt + Boni + Zuschläge
- **CTA-Frage:** "Du bist gefragt: Sind Dir tolle Teamkollegen, gutes Gehalt und Spaß bei der Arbeit auch so wichtig wie uns?"
- **Zwei Buttons:** "Ja, absolut! 🎉" → weiter | "Mehr Infos 🙏🏻" → scrollt zu mehr Details
- **Arbeitsort-Sektion:** Stadtbild von Koblenz
- **Arbeitgeber-Sektion:** ST Personal GmbH, Unternehmensbeschreibung
- **Testimonials:** 3 Mitarbeiter-Zitate (Slider/Karussell)
- **Benefits-Icons:** Sicherer Arbeitgeber, Gutes Gehalt, Flexibilität, Erstklassige Auftraggeber, "Wir regeln das für Dich"
- **Google/Kununu Bewertungen** eingeblendet
- **Footer-CTA:** Gleiche Frage + Buttons wiederholt
- **Farbschema:** Creme/Beige Hintergrund, Orange Buttons, Grüner Akzent-Banner, Dunkelblauer Text
- **Progress-Bar:** Am unteren Rand

### Seite 2: Benefits
- **Header:** "Deine Aufgaben als Lagerarbeiter (m/w/d)" (Achtung: Seite heißt "Aufgaben" zeigt aber Benefits)
- **Bild:** Zwei Lagerarbeiter mit Tablet
- **Benefits mit Icons:**
  - 📝 Unbefristeter Arbeitsvertrag mit hohen Übernahmechancen
  - 🏦 Fixes Monatsgehalt von etwa 2.400€
  - 💶 Spätschichtzulage oder Fahrgeld
  - 🏝️ 27 Tage Urlaub + Urlaubsgeld
  - 🎄 Weihnachtsgeld
  - ⏱️ Geregelte Arbeitszeiten
- **Grüner Banner:** "Erhalte ein lukratives Jobangebot — weil du es verdient hast!"
- **CTA:** "Klingt gut, was sind meine Aufgaben? ▸▸▸" (orange Button)

### Seite 3: Aufgaben
- **Header:** "Deine Aufgaben als Lagerarbeiter (m/w/d)"
- **Bild:** Lagerarbeiter-Szene
- **Aufgaben mit Icons:**
  - 📆 Kommissionieren der Ware im Lager mit verschiedenen Systemen
  - 🚚 Abarbeitung und Unterstützung aller anfallenden Aufgaben im Warenein- und -ausgang
  - 👥 Bedienung und Störungsbehebung vollautomatischer Lager-, Kommissionier- und Palettieranlagen
- **Grüner Banner:** "Verdiene bis zu 2.400€ brutto PLUS Zuschläge"
- **CTA:** "klingt gut, weiter ▸▸▸"

### Seite 4-X: Quiz-Formular (Multi-Step)
Jede Frage auf einer eigenen Seite:
- **Frage 1:** "Wie lautet dein Vorname?" 😎 (Textfeld + "weiter ▸▸" Button)
- **Vermutete weitere Fragen:** Nachname, Telefonnummer, E-Mail, Wohnort/PLZ, Berufserfahrung, Verfügbarkeit
- **Jede Seite:** Logo oben, grüner Banner "Jetzt bist Du dran!", Progress-Bar unten

### Danke-Seite
- Bestätigung der Bewerbung
- Nächste Schritte

## Design-System
- **Hintergrund:** #FDF8F0 (warm cream/beige)
- **Primäre Buttons:** Orange/Amber (#F59E0B)
- **Akzent-Banner:** Grün (#10B981)
- **Text:** Dunkelblau/Navy (#1E3A5F)
- **Sekundärtext:** Grün für Highlights
- **Font:** Modern sans-serif
- **Layout:** Mobile-first, zentriert, max ~700px breit
- **Progress-Bar:** Grün, unten auf jeder Seite, wächst mit Fortschritt
- **Logo:** ST Personal oben auf jeder Seite
- **Footer:** Copyright + Impressum + Datenschutzerklärung + "Wir rekrutieren mit Personalfix"

## Technische Anforderungen
- **Single Page Application** (React oder Vanilla JS) — kein Backend nötig
- **Multi-Step Wizard** mit Fortschrittsbalken
- **Formular-Daten** am Ende per E-Mail senden (z.B. via Formspree, EmailJS oder simples mailto)
- **Responsive** — Mobile-first
- **Hosting:** Statisch (Vercel, Netlify oder GitHub Pages)
- **Keine Abhängigkeit von Perspective oder anderen SaaS-Tools**

## Bilder
- Bilder müssen als Platzhalter eingefügt werden (Paul liefert echte Bilder nach)
- Placeholder-Bilder von Unsplash (Lager/Warehouse Thema)
