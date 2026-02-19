# DESIGN.md — UI Standard for Coding Projects

## Zielbild (Default)
Modern, clean, premium.

- Viel Whitespace, klare Hierarchie
- Karten/Container mit subtiler Tiefe (Schatten + Border)
- Hochwertige Buttons (States: default/hover/active/disabled/focus)
- Klare Typografie (Inter), konsistente Größen/Abstände
- Accessibility first (Kontrast, Focus-Ring, Keyboard)

## Tech-Default
- Framework: React + Tailwind + shadcn/ui
- Components: shadcn + gezielte externe Komponenten (z. B. Ruixen)
- Icons: lucide-react
- Animation: dezent (120–220ms, kein over-animation)

## Farb-/Stilrichtung (Default)
- Neutraler, cleaner Base-Look
- 1 Primärfarbe + 1 Support-Akzent
- Radius: 10–16px
- Schatten: soft, nicht muddy
- Border: subtle, immer sichtbar auf Cards

## Quality Bar (immer)
1. Einheitliche Spacing-Scale (4/8px Raster)
2. Saubere Hover-/Focus-States auf allen interaktiven Elementen
3. Mobile + Desktop responsiv
4. Keine "unstyled" Tabellen/Formulare
5. Leerer Zustand, Loading, Error-State vorhanden

## Workflow für neue Projekte
1. Erst Design-Basis (Layout, Tokens, Buttons, Cards)
2. Dann Feature-Implementierung
3. Dann Polishing-Pass (Spacing, Typo, Kontrast, Zustände)

## Ruixen/shadcn Nutzung
Command-Schema:
- `npx shadcn@latest add "https://ruixen.com/r/[component]"`

Hinweis:
- `[component]` ist Platzhalter und muss ersetzt werden (sonst 404).
- Vor Import prüfen: dependencies + a11y + responsive Verhalten.

## Entscheidung für Turtok (ab jetzt)
Wenn nicht anders gesagt: ich baue standardmäßig in diesem Stil.
