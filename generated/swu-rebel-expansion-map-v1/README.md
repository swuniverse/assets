# Rebellen-Ausbau: Durastahl, Hypermaterie, Landeplattform und Forschung

Vier neue Gebäudefamilien im freigegebenen Star-Wars-Grundstücksstil. Zusammen mit den beiden vorigen Serien sind damit 16 Familien abgedeckt.

## Quellen

Gebäude: game-data/data/buildings/stu-buildings.yaml.
Forschungen: game-data/data/research/rebels.yaml.
SWU-Geländefreigaben: game-data/data/buildings/swu-field-build-categories.yaml.
game-data-Stand: 8cda53525946df8fb8e998194acd1a06737630bc.

| Gebäude                   | Haupt-ID | Forschung | Direkte Voraussetzung            | Aufwand |
| ------------------------- | -------- | --------- | -------------------------------- | ------- |
| Durastahl-Schmiede        | 63110100 | 252001    | Phrik-Raffinerie 252101          | 12      |
| Hypermaterie-Synthesizer  | 61020100 | 253001    | Transparistahl-Manufaktur 254101 | 12      |
| Landeplattform            | 81110100 | 270101    | Hypermateriesynthesizer 253001   | 30      |
| Forschungszentrum Stufe I | 72010100 | 200101    | Keine Technologievoraussetzung   | 12      |

Die Forschungszentrum-Forschung wird mit Durastahl (21) finanziert, hat aber keine direkte Technologievoraussetzung. Durastahl-Schmiede ist also keine technische Freischaltungsvoraussetzung; vorhandenes Durastahl kann bereits für die Forschung verwendet werden.

## Produktionsbezug und Formen

- Durastahl-Schmiede: Phrik (20) -> Durastahl-Legierung (21); schwere Pressen, niedriger Ofenbereich und Metallplattenausgabe.
- Hypermaterie-Synthesizer: endliches Hypermaterie-Vorkommen (1505) -> Hypermaterie (5); isolierte waagerechte Behälter, Kondensatoren, Leitungen und modulare Serviceplattform.
- Landeplattform: freie breite Landefläche mit niedrigen Servicegebäuden, ohne fest dargestelltes Schiff.
- Forschungszentrum Stufe I: Erzeugung von Forschungspunkten Stufe I (1701); verbundene Labormodule und blaue Beobachtungsflächen.

Synthesizer ist kein normales Landgebäude. Die Vorschauen verwenden die nach wasser_limitiert erlaubten SWU-Felder A430 (Flaches Wasser) und A530 (Packeis). Das zuvor betrachtete normale Wasser A410 und Eispanzer A540 sind hierfür nicht freigegeben. Geländealternative 90640100 ist eine andere Gebäudefamilie und bleibt erhalten.
Übrige Vorschauen: C119 (Bauland), C640 (Felsplatte), D819 (Wüsten-Bauplatz), jeweils standard-freigegeben.

## Quelle und Produktionsdateien

Erzeugt mit dem vom Nutzer gewählten gpt-image-2-MCP, edit_image, Modell gpt-image-2, anhand ../swu-rebel-starter-map-v1/source-approved-four.png als Stilreferenz.
Quellblatt: edit-20261119-184656-e188bb-source-expansion-four.png; vollständiger Generierungsprompt: prompt.txt.
Hohe orthografische Draufsicht, breite Grundfläche, verwitterte helle Duracrete-/Metallflächen, kompakte Schatten und transparente Gelände-Zwischenräume.

- manifest.json: vier Familien, neun Rebellen-IDs, Voraussetzungen, Dateinamen, Quellblattzellen und geprüfte Vorschaufelder.
- masters/: transparente 512x512-Master; sichtbare Grundfläche maximal 488x488.
- Produktions-PNGs: 256x256 RGBA, 8 Bit, verlustfrei komprimiert, unter assets/buildings/generated/.
- export-assets.py: bestehender Exportvertrag, angepasst auf diese vier Familien; ImageMagick erforderlich.
- production-overview.png: große Ansicht und 40/68px.
- terrain-review.png: Darstellung auf passenden Land-, Flachwasser- und Packeisfeldern.
- review/: regenerierbare Zwischenbilder, nicht Bestandteil der Produktionsassets.

Generierte Dateien werden über die bestehende GENERATED_BUILDING_FILES-Tabelle in apps/frontend/src/lib/assets.ts eingebunden. Genau neun ausgewählte Rebellen-IDs werden umgestellt, einschließlich Gelände-/Bonusvarianten. Vorige Serien, imperiale/shared Zuordnungen, 90640100 und Resolver-Fallback bleiben erhalten.

## Prüfung

Quellen und 40/68px sowie Flachwasser/Packeis/Land wurden visuell geprüft. Der Export bestätigt 256x256 und echte Transparenz für jede Datei. Abschlusscheck bestanden: neun Namen-/ID-Zuordnungen, Forschungsbezüge, Voraussetzungen und Aufwand gegen YAML; alle Vorschau-Geländecodes gegen Bebaubarkeitskategorien; sämtliche nicht ausgewählten Zuordnungen gegenüber vorherigem HEAD unverändert. Der tatsächliche buildingImage-Resolver liefert korrekte Pfade. Alle vier PNGs wurden per HTTP mit image/png und bytegleichem Inhalt ausgeliefert (421474 Bytes). Gezielter Prettier- und Whitespacecheck bestanden.
Unveränderte FieldCell-/Statusdarstellung ist aus Serie 1 geprüft; keine erneute breite Browser-/Regressionsserie für reine Bild- und Dateizuordnungsänderungen.

Geschätzte MCP-Kosten des neuen Quellblatts: 0.2247 USD.
