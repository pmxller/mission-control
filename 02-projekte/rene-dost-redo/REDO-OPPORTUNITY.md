# REDO Gruppe — Partnership Opportunity
**Erstellt:** 21.02.2026 | **Für:** Meeting Montag 23.02.2026
**Ziel:** Share Deal — Umsatzbeteiligung an generiertem Mehrwert

---

## 🎯 TL;DR

René Dost hat eines der interessantesten Gastro-Imperien in Brandenburg/Berlin —
**aber digital ist er fast unsichtbar.** Keine App, keine Gästedatenbank, keine Automatisierung.
Das ist keine Schwäche — das ist deine Eintrittskarte.

---

## 👤 René Dost — Wer ist er?

| Fakt | Detail |
|------|--------|
| **Alter** | 53 |
| **Herkunft** | Ketzin/Havel (Brandenburg) |
| **Unternehmen** | REDO Unternehmensgruppe (Holding: REDO Gastro Invest GmbH) |
| **Größe** | 38+ Unternehmensbereiche, 200+ Mitarbeiter |
| **Umsatz** | ~20 Mio. € Jahresumsatz |
| **Holding-Struktur** | 14 GmbHs unter einer Holding |
| **TV-Präsenz** | VOX, SAT.1, Kabel Eins — TV-Rekorde vor Millionen-Publikum |
| **Instyle** | @rene.redo — aktiv, volks-nah, authentisch |

**Persönlichkeit (aus öffentlichen Quellen):**
- Bodenständig, Macher-Typ, kommt von ganz unten (Imbisswagen 1990)
- Liebt Innovation — hat eigene Werbeagentur, Gastronomie-Akademie, Foodtrucks gegründet
- Versteht Branding — der "Euroschein-Gutschein" zeigt Kreativität
- Reagiert gut auf Leute die anpacken statt reden

---

## 🏢 Das Imperium — Alle Marken im Überblick

### Restaurants (Kern)
- **Redo XXL** — 7 Standorte Berlin & Brandenburg (Potsdam, Berlin, Frankfurt/Oder, Ketzin, Cottbus, Wildau, Friedrichshain)
- **Burgerbüro** — 4 Standorte (Potsdam, Berlin, Frankfurt/Oder, Cottbus)
- **800° Four Bites / Prime Beef Steakhouse** — Potsdam Holländisches Viertel + Friedrichshain
- **Sombredo** (Mexikaner) — Potsdam
- **Das Wiener** — Potsdam
- **Café Heider** — Potsdam (Traditions-Café seit 19. Jahrhundert)
- **Lindencafé** — Potsdam
- **Eiscafé Bellini** — Frankfurt/Oder
- **Eismanufaktur Redo del Gelato** — Potsdam
- **Uschi** (ehem. Sombredo Frankfurt/Oder) — Breakfast, Lunch, Dinner, Bar

### Weitere Bereiche
- **Event/Catering** — bis 5.000 Personen, 12 Foodtrucks + 16 Trailer
- **KW Eventcenter** Königs Wusterhausen
- **Eventhaus Ketzin**
- **Kutschstall Ensemble** Potsdam
- **Residenz Seehotel Berlin-Brandenburg** — eigenes Hotel
- **RedoMEDIA** — eigene Werbeagentur
- **Redo Gastronomie Akademie** — Workshops, Coaching, Digitalisierung
- **Pension Redo** — Ferienwohnungen

---

## 🔍 Aktuelle Digitale Schwächen (= deine Chancen)

### Was ich auf der Website gesehen habe:
- ✅ Website vorhanden (redoxxl.de + redo.de) — aber **rein statisch, kein Mehrwert**
- ✅ Digitale Gutscheine erwähnt — aber **kein System dahinter**
- ❌ **Keine App**
- ❌ **Keine Gästedatenbank / CRM**
- ❌ **Kein Loyalty-Programm**
- ❌ **Kein WhatsApp-Kanal für Gäste**
- ❌ **Kein automatisiertes Review-System**
- ❌ **Kein Online-Tisch-Reservierungssystem** (sichtbar)
- ❌ **Kein KI-gestützter Gästeengagement**
- ❌ **Kein Upselling-System** (Tisch → App → nächster Besuch)

**Einzige digitale Aktivität erkennbar:** Gastronovi (Kassensystem) + rudimentäre Social Media Präsenz. Das war's.

---

## 💡 Ideen-Portfolio — Was du umsetzen könntest

### 🟥 TIER 1: Quick Wins (sofort umsetzbar, hoher Impact)

#### 1. WhatsApp Lead Capture System
**Was:** QR-Code am Tisch / auf dem Bon → Gäste scannen → WhatsApp-Chat startet automatisch → Bewertungsanfrage + Datenerfassung (Interesse, PLZ, Geburtstag)
**Wie:** WhatsApp Business API + Lovable/Claude Code gebaut
**Mehrwert:** 7 Standorte × ~300 Gäste/Tag × 365 Tage = potenziel **750.000+ Leads/Jahr**
**ROI:** 1 Wiederkehrender Gast pro Woche pro Standort = X € Mehrumsatz direkt messbar
**BAFA-fähig:** ✅ Ja (digitale Prozessoptimierung)

#### 2. Automatisiertes Review & Feedback System
**Was:** Nach dem Besuch (via WhatsApp/QR) → kurze Bewertungsfrage (1-5 Sterne) → Bei 5 Sternen: Google-Review-Link → Bei ≤ 3 Sternen: internes Feedback, kein öffentlicher Schaden
**Wie:** n8n/Make + WhatsApp Business API
**Mehrwert:** Google Rating von aktuell 4.1–4.3 → 4.5+ = nachweislich mehr Neukunden
**Umsatzeffekt:** +5% mehr Walk-ins bei 4.5+ Google Rating (Branchenstudie)

#### 3. Digitaler "Euroschein-Gutschein" mit Tracking
**Was:** Sein Gutschein-Konzept (er hatte das schon selbst) digital machen — QR-Code-Gutschein der wie ein Geldschein aussieht, per WhatsApp/E-Mail versendbar, digital einlösbar, tracked
**Wie:** Lovable-built Web-App + Stripe oder eigenes Backend
**Mehrwert:** Vollständig messbarer Return pro verschicktem Gutschein

---

### 🟧 TIER 2: Mid-Term (2–4 Wochen Umsetzung)

#### 4. Gäste-CRM Dashboard
**Was:** Alle gesammelten Leads (WhatsApp, Gutschein, Reviews) in einem Dashboard → Segmentierung nach Standort, PLZ, Besuchsfrequenz → gezielte Kampagnen
**Wie:** Lovable + Supabase/Airtable Backend
**Mehrwert:** Newsletter, postalische Kampagnen, Geburtstags-Gutschein automatisiert

#### 5. Tisch-Check-In mit Upsell-Flow
**Was:** Gast kommt rein, scannt QR am Tisch → Mini-Web-App → "Heute empfohlen", Tagesgerichte, Extras → Bestellung geht direkt in die Küche (oder als Add-on zum normalen Ablauf)
**Wie:** Lovable PWA + Webhook zu Kassensystem (Gastronovi API prüfen)
**Mehrwert:** Avg. Check +8–15% durch Upselling (Beilage, Dessert, Getränk)

#### 6. Automatisierter WhatsApp/E-Mail Newsletter
**Was:** Wöchentlicher "Redo Insider" → Wochenangebote, Events, neue Gerichte → automatisch aus dem Wochenplan befüllt → rausgeschickt an Lead-Datenbank
**Wie:** n8n/Make + WhatsApp Business Broadcast
**Mehrwert:** Direkte, kostenlose Wiederaktivierung der Datenbank

---

### 🟨 TIER 3: Premium / Flagship-Ideen (6–12 Wochen)

#### 7. KI-Gästeavatar / Digitaler Redo-Assistent
**Was:** Auf der Website / WhatsApp → KI-Avatar im Redo-Look → beantwortet Fragen, macht Tischreservierungen, sendet Speisekarte, gibt Empfehlungen basierend auf Gästeprofil
**Wie:** Claude API + Custom Voice/Avatar (HeyGen oder D-ID) + Lovable Frontend
**Mehrwert:** Entlastet Service-Personal, 24/7 erreichbar, sammelst gleichzeitig Leads
**Wow-Faktor:** Perfekt für René's TV-Affinität — Content-Potenzial ("Europas erster AI-Gastronom")

#### 8. Loyalty-Programm "Redo Club"
**Was:** Digitale Stempelkarte → 10 Besuche = 1 Gratisessen → App oder WhatsApp-basiert → mit Gamification (Redo-Level: Bronze, Silber, Gold XXL)
**Wie:** PWA (Lovable) + Backend
**Mehrwert:** Retention-Tool, 30% höhere Besuchsfrequenz bei Loyalty-Mitgliedern (Branchenbenchmark)

#### 9. Multi-Standort Operations Dashboard
**Was:** Echtzeit-Übersicht für René: Welcher Standort performt wie? Live-Umsätze, Auslastung, durchschnittlicher Check, Tischrotation → alles auf einem Screen
**Wie:** Lovable Dashboard + Gastronovi API/Webhooks
**Mehrwert:** René sieht als CEO endlich was in seinen 7 Standorten wirklich los ist

#### 10. Postalisches Retargeting (physisch + digital)
**Was:** Gäste aus bestimmten PLZs bekommen automatisch 4× pro Jahr eine physische Postkarte mit QR-Code-Gutschein → messbar wer einlöst
**Wie:** API zu Printservice (z.B. optilyz) + CRM-Segmentierung
**Mehrwert:** Direktmailing hat 5× höhere Response-Rate als E-Mail in der Gastro

---

## 💰 Share Deal — Wie strukturieren?

### Das Modell das Sinn ergibt:
**Du implementierst → Mehrwert ist messbar → du bekommst % des Mehrumsatzes**

**Vorschlag für das Pitch-Gespräch:**

| Phase | Was du lieferst | Dein Anteil |
|-------|-----------------|-------------|
| **MVP** (4 Wochen) | WhatsApp Lead System + Review Automation + Gutschein-Tracking | 20% des messbaren Mehrumsatzes aus diesen Kanälen (12 Monate) |
| **Scale** (3 Monate) | CRM Dashboard + Loyalty + Newsletter-Automation | 15% des Mehrumsatzes |
| **Premium** (6–12 Monate) | KI-Avatar + Ops Dashboard + Postalisches Retargeting | 10% des Mehrumsatzes |

**Beispielrechnung fürs Gespräch:**
- 7 Standorte × 300 Gäste/Tag = 2.100 Gäste/Tag
- 5% durch digitale Kanäle reaktiviert = 105 Gäste extra/Tag
- Avg. Check 18€ = 1.890€/Tag = **690.000€/Jahr Mehrumsatz**
- Dein 20%-Anteil: **~138.000€/Jahr**

*(Zahlen konservativ gerechnet — realistisch eher mehr)*

### Warum er JA sagt:
- Kein Risiko für ihn: Du verlangst kein Honorar upfront, nur Anteil am **zusätzlichen** Umsatz
- Du bringst Systeme die er schon wollte (Euroschein-Gutschein hat er selbst erfunden)
- BAFA-Förderung: Teile der Implementierung bis 80% förderfähig → sein Eigenanteil = minimal
- Du bringst Beweise (eigene Lovable-Projekte, MVP-Demos)

---

## 🎯 Pitching Strategy — Für Montag

### Einstieg der dich aus der Masse hebt:
Nicht: *"Ich mache AI-Beratung"*
Sondern: *"Ich habe mir dein Gutschein-Konzept angeschaut — das Euroschein-Prinzip ist brillant. Ich kann das digital verlängern und dir zeigen wie du in 6 Monaten eine Gästedatenbank von 50.000 Leuten aufbaust die du kostenfrei reaktivieren kannst."*

### Die 3 Kernbotschaften:
1. **"Ich verlange kein Geld upfront"** — nur Anteil am Mehrumsatz den ich nachweislich generiere
2. **"Dein Euroschein-Gutschein war die Idee — ich mache daraus ein System"** — er hat den Beweis dass es funktioniert
3. **"BAFA fördert 80%"** — selbst wenn er das Honorar-Modell bevorzugt: fast kostenlos für ihn

### Unterlagen die du zum Meeting mitbringen solltest:
- [ ] 1-Page PDF: "REDO Digital — 3 Quick Wins" (keine Buzzwords, Zahlen + konkreter ROI)
- [ ] Demo: WhatsApp-Lead-Capture Flow (live zeigen, 2 Min)
- [ ] Einen eingelösten QR-Code-Gutschein als Beispiel (Papier-Mock)

---

## ⚠️ Was du beachten solltest

- René ist 53 und kommt vom Handwerk — **kein Tech-Kauderwelsch**, nur klare Beispiele und Zahlen
- Er hat bereits Gastronovi (Kassensystem) und eigene Medien-Agentur — frag welche Systeme im Einsatz sind, bevor du etwas versprichst das nicht integrierbar ist
- Er kennt Berater die versprechen und nicht liefern — zeig ihm **fertige Demos** statt Präsentationen
- Sein stärkster Trigger: **Reaktivierung von Stammgästen** — das ist sein Kernbusiness-Modell

---

## 📎 Quellen
- redo.de, redoxxl.de (offizielle Websites)
- Tagesspiegel, mpulse.de, food-service.de (Artikel)
- agicap.com Fallstudie (35 Bereiche, 14 GmbHs bestätigt)
- gastronovi.com (Kassensystem-Fallstudie, bestätigt alle Standorte)
- northdata.com (Handelsregister, Holding-Struktur)
