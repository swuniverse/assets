# Frühe Rebellen-Produktionskette: Gezeiten, Transparistahl und Phrik

Vier neue Gebäudefamilien im freigegebenen Star-Wars-Grundstücksstil. Diese Serie ergänzt die acht Startgebäude aus swu-rebel-starter-map-v1.

## Quellen und Reihenfolge

Gebäude: game-data/data/buildings/stu-buildings.yaml.
Forschungen: game-data/data/research/rebels.yaml.
Stand: 41d8af731510457b260dc5c6f3b672a28dc9dfb3.

| Gebäude                   | Haupt-ID | Forschung | Direkte Voraussetzung            | Aufwand |
| ------------------------- | -------- | --------- | -------------------------------- | ------- |
| Gezeitenkraftwerk         | 31020100 | 230101    | Grundlagenforschung 1001         | 5       |
| Transparistahl-Manufaktur | 62020100 | 254101    | Chemische Fabrik 254001          | 10      |
| Phrik-Mine                | 61110100 | 251001    | Transparistahl-Manufaktur 254101 | 8       |
| Phrik-Raffinerie          | 63100100 | 252101    | Phrik-Mine 251001                | 8       |

Der frühe Forschungsweg lautet: Grundlagenforschung -> Chemische Fabrik (Tibanna-Extraktor aus Serie 1) -> Transparistahl-Manufaktur -> Phrik-Mine -> Phrik-Raffinerie.
Gezeitenkraftwerk ist ein eigener direkter Zweig ab Grundlagenforschung.
Phrik-Raffinerie hat zwar sort=148, benötigt jedoch nur die Mine als direkte Voraussetzung. Die Position in der YAML-Datei ist nicht die Freischaltungsreihenfolge.

## Produktionsbezug

- Transparistahl-Manufaktur: Tibanna-Gas (3) -> Transparistahl (4).
- Phrik-Mine: endliches Erzvorkommen (1511) -> Phrik-Erz (11).
- Phrik-Raffinerie: Phrik-Erz (11) -> Phrik (20).
- Gezeitenkraftwerk: Energieanlage auf Wasserfeldern.

## Architektur

- Gezeitenkraftwerk: robuste Wasserplattform mit breiten Turbinen, Einläufen und Kontrollhaus.
- Transparistahl-Manufaktur: niedrige Fertigungshalle mit Formlinie und klaren Plattenstapeln.
- Phrik-Mine: dunkler offener Förderschacht, verstärkter Schachtrand, Förderanlage und Erzbunker.
- Phrik-Raffinerie: offene Aufbereitungstrommeln, niedrige Verarbeitungsanlage und Metallausgabe.

Das ursprüngliche Stilblatt aus ../swu-rebel-starter-map-v1/source-approved-four.png wurde als Bildreferenz verwendet. Erzeugt mit dem vom Nutzer gewählten gpt-image-2-MCP, edit_image, Modell gpt-image-2. Der vollständige Prompt ist prompt.txt, das erzeugte Blatt edit-20261119-175659-2e3fad-source-production-chain-four.png.

## Dateien und Anbindung

- manifest.json: vier Familien, zehn Rebellen-IDs, Voraussetzungen, Dateinamen und Quellblattzellen.
- masters/: normalisierte transparente 512x512-Master.
- Produktions-PNGs: 256x256 RGBA, 8 Bit, verlustfrei komprimiert, unter assets/buildings/generated/.
- export-assets.py: derselbe Exportvertrag wie Serie 1, mit vier Familien und Wasser-/Bergbau-/Land-Prüfflächen; benötigt ImageMagick.
- production-overview.png: große Ansicht sowie 40/68px.
- terrain-review.png: 68px auf passenden SWU-Feldern. Gezeiten ausschließlich auf Wasser; Mine auf Fels; Verarbeitung auf Land. Wald ist nur ein visueller Kontrasttest.
- review/: regenerierbare Zwischenbilder, nicht Bestandteil der Produktionsassets.

GENERATED_BUILDING_FILES in apps/frontend/src/lib/assets.ts bindet genau die zehn IDs aus manifest.json ein. Nicht ausgewählte Zuordnungen, imperiale Varianten, erste Gebäudeserie, Fallback und allgemeine Asteroidenmine 90560100 bleiben erhalten. Keine Forschungs-, Produktions-, Terrain- oder Rendering-Regeln wurden geändert.

## Verifikation

Quellen und 40/68px-Vorschauen wurden visuell geprüft. Der Export hat für alle vier PNGs 256x256 und echte Transparenz bestätigt. Alle zehn IDs, Forschungsbezüge und die gesamte Zuordnungstabelle wurden gegen YAML und den vorherigen HEAD geprüft. Der tatsächliche buildingImage-Resolver liefert die richtigen Pfade; alle vier PNGs wurden per HTTP mit image/png und bytegleichem Inhalt ausgeliefert (zusammen 435208 Bytes). Gezielter Prettier- und Whitespacecheck bestanden.
Die unveränderte FieldCell-/Statusdarstellung wurde mit Serie 1 geprüft; keine erneute breite Browser- oder Regressionstestserie für diese reinen Bild-/Dateizuordnungsänderungen.

Nächste fachliche Erweiterung wäre die Durastahl-Schmiede hinter Phrik-Raffinerie sowie der Hypermaterie-Zweig. Sie gehört nicht zu dieser Viererserie.

Geschätzte MCP-Kosten des neuen Quellblatts: 0.2243 USD.
