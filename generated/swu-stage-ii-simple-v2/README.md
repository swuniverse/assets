# Schlichte FZ2-Gebäudeassets · Version 2

Vollständig abgeschlossen und geprüft am 2026-11-24: **76 Gebäudefamilien / 138 IDs**, 38 Familien / 69 IDs je Fraktion. Enthalten sind sämtliche FP-II-Forschungszweige (Forschungsware 1702) sowie Forschungszentrum III als Übergang. Die erste FZ2-Serie bleibt als Quellenarchiv erhalten.

[Rebellenallianz – Übersicht](rebels-overview.png) · [Galaktisches Imperium – Übersicht](imperials-overview.png) · [Produktionsplan](plan.json) · [Freigegebene Muster](style/approved-comparison.png) · [Stilguide](../../../docs/art/building-style.md)

## Stil und Quellen

Hohe orthografische Draufsicht (etwa 80°), breite niedrige Baukörper, große helle matte Dachflächen und wenige funktionale Details. Rebellenallianz: Creme/Schiefergrau/Rostorange; Galaktisches Imperium: helles neutrales Grau/Graphit/kleine rote Statuslichter.

Beide freigegebenen Muster wurden bytegleich übernommen. Referenzen, Originalquellen, genaue Prompts und Generierungsmetadaten liegen im [Referenz-Kit](style/manifest.json) und in jeder Gruppe. Die Quellen wurden mit gpt-image-2-MCP, edit_image, einer Fraktionsreferenz und Qualität medium erzeugt; die Fertigstellung verwendet diese vorhandenen Bildbögen.

Das Gateway lieferte RGB mit Magenta-Freistellfarbe. Die Exporte entfernen den Hintergrund und zusammenhängende violette Farbsäume. Sechs visuell festgelegte Innenbereiche erhalten die emissiven Plasma-/Phasenkerne aus der Originalquelle (`protectedAlphaRegions`); diese Regionen sind keine Hintergrundöffnungen. Dünne weiße Rasterseparatoren in zwei Bildbögen werden als eigene, sparsame, canvasweite Komponente aus den Zuschnitten ausgeschlossen. Originale bleiben unverändert.

Runtime: 256×256 RGBA-PNG unter ../../buildings/generated; Master: 512×512. Der solide Motivumriss bleibt höchstens 244px breit/hoch, mit transparenter Randfläche und normaler Kantenglättung. Offene Dockräume und Orbitalzwischenräume sind transparent. 40px-Menübilder und 68px-Feldkompositionen wurden visuell geprüft.

Game-data-Quelle: 27ffb84b3446db8796c14d5c618b6e3b30efb29e. Importierte Minen-/Raffinerienamen bleiben unverändert; displayName und Bildfunktion folgen Cortosis, Laminanium, Quadranium, Neuranium und Bronzium. Fehlende Feldfreigaben bleiben reine, ausdrücklich markierte Kompositionsvorschauen.

## Gruppen

Jedes Manifest enthält alle Gebäude-IDs, die einzelnen Runtime-Dateien und Master, Forschung und Feldvorschauen. Die Quellen-/Promptdateien sowie die 40/68px- und Geländeübersichten liegen daneben.

| Gruppe | Familien | IDs | Manifest | Exakte Prompts | 40/68px | Visuelle Prüfung |
| --- | ---: | ---: | --- | --- | --- | --- |
| Rebellenallianz · Siedlung und Klimaversorgung | 4 | 17 | [Manifest](rebels-civic/manifest.json) | [Prompt](rebels-civic/prompt.txt) | [Übersicht](rebels-civic/production-overview.png) | [Prüfung](rebels-civic/visual-review.md) |
| Rebellenallianz · Fortgeschrittene Energie | 4 | 6 | [Manifest](rebels-energy/manifest.json) | [Prompt](rebels-energy/prompt.txt) | [Übersicht](rebels-energy/production-overview.png) | [Prüfung](rebels-energy/visual-review.md) |
| Rebellenallianz · Logistik, Produktion und Forschung | 4 | 7 | [Manifest](rebels-logistics/manifest.json) | [Prompt](rebels-logistics/prompt.txt) | [Übersicht](rebels-logistics/production-overview.png) | [Prüfung](rebels-logistics/visual-review.md) |
| Rebellenallianz · Orbitale Infrastruktur | 4 | 8 | [Manifest](rebels-orbital/manifest.json) | [Prompt](rebels-orbital/prompt.txt) | [Übersicht](rebels-orbital/production-overview.png) | [Prüfung](rebels-orbital/visual-review.md) |
| Rebellenallianz · Modulfabriken | 3 | 6 | [Manifest](rebels-modules/manifest.json) | [Prompt](rebels-modules/prompt.txt) | [Übersicht](rebels-modules/production-overview.png) | [Prüfung](rebels-modules/visual-review.md) |
| Rebellenallianz · Ausbildung, Holografie und Plasma | 4 | 10 | [Manifest](rebels-holo/manifest.json) | [Prompt](rebels-holo/prompt.txt) | [Übersicht](rebels-holo/production-overview.png) | [Prüfung](rebels-holo/visual-review.md) |
| Rebellenallianz · Spezialisierte Erzminen | 5 | 5 | [Manifest](rebels-mines/manifest.json) | [Prompt](rebels-mines/prompt.txt) | [Übersicht](rebels-mines/production-overview.png) | [Prüfung](rebels-mines/visual-review.md) |
| Rebellenallianz · Spezialisierte Raffinerien | 5 | 5 | [Manifest](rebels-refineries/manifest.json) | [Prompt](rebels-refineries/prompt.txt) | [Übersicht](rebels-refineries/production-overview.png) | [Prüfung](rebels-refineries/visual-review.md) |
| Rebellenallianz · Spezialkomponenten | 5 | 5 | [Manifest](rebels-components/manifest.json) | [Prompt](rebels-components/prompt.txt) | [Übersicht](rebels-components/production-overview.png) | [Prüfung](rebels-components/visual-review.md) |
| Galaktisches Imperium · Siedlung und Klimaversorgung | 4 | 17 | [Manifest](imperials-civic/manifest.json) | [Prompt](imperials-civic/prompt.txt) | [Übersicht](imperials-civic/production-overview.png) | [Prüfung](imperials-civic/visual-review.md) |
| Galaktisches Imperium · Fortgeschrittene Energie | 4 | 6 | [Manifest](imperials-energy/manifest.json) | [Prompt](imperials-energy/prompt.txt) | [Übersicht](imperials-energy/production-overview.png) | [Prüfung](imperials-energy/visual-review.md) |
| Galaktisches Imperium · Logistik, Produktion und Forschung | 4 | 7 | [Manifest](imperials-logistics/manifest.json) | [Prompt](imperials-logistics/prompt.txt) | [Übersicht](imperials-logistics/production-overview.png) | [Prüfung](imperials-logistics/visual-review.md) |
| Galaktisches Imperium · Orbitale Infrastruktur | 4 | 8 | [Manifest](imperials-orbital/manifest.json) | [Prompt](imperials-orbital/prompt.txt) | [Übersicht](imperials-orbital/production-overview.png) | [Prüfung](imperials-orbital/visual-review.md) |
| Galaktisches Imperium · Modulfabriken | 3 | 6 | [Manifest](imperials-modules/manifest.json) | [Prompt](imperials-modules/prompt.txt) | [Übersicht](imperials-modules/production-overview.png) | [Prüfung](imperials-modules/visual-review.md) |
| Galaktisches Imperium · Ausbildung, Holografie und Plasma | 4 | 10 | [Manifest](imperials-holo/manifest.json) | [Prompt](imperials-holo/prompt.txt) | [Übersicht](imperials-holo/production-overview.png) | [Prüfung](imperials-holo/visual-review.md) |
| Galaktisches Imperium · Spezialisierte Erzminen | 5 | 5 | [Manifest](imperials-mines/manifest.json) | [Prompt](imperials-mines/prompt.txt) | [Übersicht](imperials-mines/production-overview.png) | [Prüfung](imperials-mines/visual-review.md) |
| Galaktisches Imperium · Spezialisierte Raffinerien | 5 | 5 | [Manifest](imperials-refineries/manifest.json) | [Prompt](imperials-refineries/prompt.txt) | [Übersicht](imperials-refineries/production-overview.png) | [Prüfung](imperials-refineries/visual-review.md) |
| Galaktisches Imperium · Spezialkomponenten | 5 | 5 | [Manifest](imperials-components/manifest.json) | [Prompt](imperials-components/prompt.txt) | [Übersicht](imperials-components/production-overview.png) | [Prüfung](imperials-components/visual-review.md) |

## Nachweise und Reproduktion

[Daten-/Resolver-/HTTP-Prüfung](full-verification.json) · [Alpha-/Öffnungs-/Kernprüfung](alpha-verification.json) · [Browserprüfung](browser-verification.json) · [Feldvarianten](browser-variants.png) · [Gebäudezustände](browser-states.png)

- 76 PNGs und 512px-Master geprüft; beide freigegebenen Muster bytegleich.
- Alle 138 IDs anhand der aktuellen Forschung/Gebäudedaten geprüft, ohne fehlende Varianten.
- Exakte Bildauflösung und bytegleiche HTTP-Auslieferung aller 76 Dateien bestanden.
- 308 übrige Gebäudezuordnungen und Code außerhalb der Zuordnungstabelle unverändert.
- Sechs geschützte technische Kerne haben innerhalb der dokumentierten Regionen dieselben RGBA-Pixel wie die Originalquellen. Vier unabhängige Punktprüfungen bestätigen transparente Docköffnungen im Quellbild und Runtime-PNG.
- Browser: echte FieldCell, 138 Varianten, 576 geladene Bilder, 112 aktive/inaktive/beschädigte/im-Bau-Zustände und 76 Menübilder. Keine Ladefehler oder Überläufe, Felder 68px, Menüs 40px. Prüfung der finalen Bilder mit deaktiviertem Bildcache.

Bei laufendem Frontend-Vite auf localhost:5173 aus dem Core-Checkout:

```sh
node assets/generated/swu-stage-ii-simple-v2/full-verify.cjs
python3 assets/generated/swu-stage-ii-simple-v2/verify-alpha.py
DEV_BROWSER_HOME=/private/tmp/swu-stage-ii-dev-browser dev-browser --headless -b swu-stage-ii-simple-v2 -t 30 run assets/generated/swu-stage-ii-simple-v2/dev-browser-check.js
```

Die Browserbefunde und Screenshots sind dauerhaft in diesem Verzeichnis gespeichert. Laufzeitintegration erfolgt ausschließlich über GENERATED_BUILDING_FILES in apps/frontend/src/lib/assets.ts; Forschung, Gebäudezustände, Gameplay und Feldfreigaben bleiben unverändert.
