# Erste Rebellen-Gebäudeserie: Star-Wars-Grundstücke

Acht Produktionsassets im freigegebenen Stil: hohe orthografische Draufsicht, breite Grundfläche, helle verwitterte Duracrete-/Metallflächen und klare Gebäudefunktionen. Transparente Zwischenräume lassen die vorhandenen SWU-Geländetexturen sichtbar.

## Auswahl aus den tatsächlichen Spieldaten

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml und FactionService in apps/backend/src/modules/faction/faction.service.ts.
game-data-Stand: 41d8af731510457b260dc5c6f3b672a28dc9dfb3.

| Gebäude                 | Haupt-ID | Warum zuerst?                                                                 |
| ----------------------- | -------- | ----------------------------------------------------------------------------- |
| Kommandozentrale        | 82010100 | Tatsächliches Rebellen-Startgebäude laut Fraktionskonfiguration               |
| Wohnkomplex             | 11010100 | Grundlagenforschung 1001: Bevölkerung                                         |
| Hydrokultur-Gewächshaus | 21010100 | Grundlagenforschung 1001: Grundversorgung                                     |
| Ionensegel-Kollektor    | 31010100 | Grundlagenforschung 1001: Energie                                             |
| Doonium-Schmelze        | 61010100 | Grundlagenforschung 1001: erste Produktion                                    |
| Versorgungslager        | 81210100 | Grundlagenforschung 1001: Lagerkapazität                                      |
| Aqua-Zuchtanlage        | 21020100 | Aqua-Zuchtfarm 220101, Aufwand 5, direkt nach 1001; Versorgung auf Wasser     |
| Tibanna-Extraktor       | 61030100 | Chemische Fabrik 254001, Aufwand 10, direkt nach 1001; frühe Produktionskette |

Der Außenposten ist ein anderes Gebäude (81010100) und wird hier nicht ersetzt. Der Quellenabgleich mit der Fraktionskonfiguration hat die anfängliche Auswahl vor dem Export auf die tatsächliche Kommandozentrale korrigiert; der Command-and-support-Entwurf mit Kommunikationsschüssel ist ihr zugeordnet.

Phrik-Mine und Landeplattform folgen später im Forschungsweg. Forschungslabor 71010100 ist im aktuellen Gebäude-Datensatz nicht sichtbar und kein reguläres Startgebäude. Eine sinnvolle nächste Serie ist: Gezeitenkraftwerk, Transparistahl-Manufaktur, Phrik-Mine, Phrik-Raffinerie, Durastahl-Schmiede und Hypermaterie-Synthesizer, danach Landeplattform und Forschungszentrum Stufe I. Voraussetzungen dafür erneut aus dem dann aktuellen game-data-Stand ablesen.

## Produktion und Integration

- Acht versionierte PNGs liegen unter assets/buildings/generated/.
- Produktionsformat: 256x256, RGBA, 8 Bit, verlustfrei komprimiert.
- masters/: normalisierte 512x512-Master; sichtbare Grundfläche maximal 488x488.
- manifest.json: alle acht Familien, 20 IDs einschließlich Gelände-/Bonusvarianten, Dateinamen, Forschung und Quellblattzellen.
- Vier freigegebene Entwürfe (Wohnen, Energie, Schmelze, Lager) wurden unverändert aus source-approved-four.png übernommen.
- Die vier fehlenden Entwürfe stammen aus edit-20261119-140656-f6f659-source-new-four.png. Der erste Compound wurde als Command-and-support-Anlage erzeugt und der tatsächlichen Start-Kommandozentrale zugeordnet.
- prompt-approved-four.txt und prompt-new-four.txt: vollständige Prompts.
- Erzeugung über den vom Nutzer gewählten gpt-image-2-MCP, edit_image, Modell gpt-image-2.
- export-assets.py exportiert und prüft die acht PNGs und erzeugt die Übersicht sowie Geländeprüfungen. Voraussetzung: ImageMagick.
- GENERATED_BUILDING_FILES in apps/frontend/src/lib/assets.ts bindet exakt die 20 Rebellen-IDs ein. Andere IDs und alte Dateien bleiben erhalten.

## Vorschauen

- production-overview.png: acht Gebäude, große Ansicht sowie 40/68px.
- terrain-review.png: 68px auf SWU-Wald, Bauland, Fels, Wüsten-Baugrund und Wasser. Wald ist ein visueller Kontrasttest, keine zusätzliche Bauberechtigung.
- preview.html / preview.js: echte FieldCell-Komponente und buildingImage-Resolver, mit Kolonieansicht, 40/68/96px, aktiv/inaktiv/beschädigt/im Bau und allen 20 Varianten.
- Lokale Browseradresse bei laufendem Vite: http://localhost:5173/@fs/Users/TMUNDIN/git/github.com/swuniverse/core/assets/generated/swu-rebel-starter-map-v1/preview.html
- review/: regenerierbare Zwischenbilder der Größen-/Geländeprüfungen; nicht Bestandteil der Produktionsassets.

## Prüfung

- Alle 20 IDs gegen Gebäude-, Forschungs- und Fraktionsdaten geprüft.
- Sämtliche nicht ausgewählten Zuordnungen mit HEAD verglichen: unverändert.
- PNG-Auflösung und echte Transparenz geprüft; Quellen und 40/68px-Montagen visuell geprüft.
- Browserprüfung der tatsächlichen FieldCell-Komponente: Kolonieansicht, Statusmarkierungen und sämtliche 20 Varianten sichtbar, einschließlich Wasseranlage.
- Alle acht Produktions-PNGs über den laufenden Vite-Server unter /assets abgerufen: HTTP-Erfolg, image/png und bytegleich mit den gespeicherten Dateien.
- Gezielter Prettier-Check und git diff --check bestanden.
- Keine Datenbank-, Forschungs-, Gebäudestatus-, Terrain- oder Rendering-Regeln geändert. Keine Daten einer laufenden Kolonie verändert.

MCP-Kostenschätzung des neuen Viererblatts: 0.2242 USD; die vier vorher freigegebenen Entwürfe wurden wiederverwendet.
