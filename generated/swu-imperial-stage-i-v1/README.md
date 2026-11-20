# Vollständige imperiale Gebäudeassets bis FP Stufe I

**42 Familien / 94 Gebäude-IDs erstellt, angebunden und geprüft. Keine offenen Familien in diesem Umfang.** Enthalten sind Grundgebäude, materialfinanzierte Frühforschung und FP-I-Gebäude sowie Forschungszentrum II als Übergang. Die drei Muster sind ausdrücklich vom Nutzer freigegeben und unverändert übernommen.

[Gesamtübersicht](full-overview.png) · [Daten-/Resolverprüfung](full-verification.json) · [Browserprüfung](browser-verification.json) · [Produktionsplan](plan.json)

| Serie                                                                | Familien | IDs | Stand               |
| -------------------------------------------------------------------- | -------- | --- | ------------------- |
| [Freigegebene Grundgebäude](approved/README.md)                      | 3        | 7   | vollständig geprüft |
| [Grundversorgung und Gas](starter/README.md)                         | 4        | 10  | vollständig geprüft |
| [Frühe Produktionsketten](production/README.md)                      | 4        | 11  | vollständig geprüft |
| [Metalle, Treibstoff und Raumfahrt](industry/README.md)              | 4        | 9   | vollständig geprüft |
| [Zivile Versorgung und Verwaltung](civic/README.md)                  | 4        | 8   | vollständig geprüft |
| [Kuppeln, Kryozucht und Forschung](settlement/README.md)             | 4        | 10  | vollständig geprüft |
| [Erneuerbare Energie](energy/README.md)                              | 4        | 10  | vollständig geprüft |
| [Rohstoffgewinnung](resources/README.md)                             | 4        | 8   | vollständig geprüft |
| [Orbitale Energie und Werften](orbital/README.md)                    | 4        | 8   | vollständig geprüft |
| [Module und Torpedos](modules/README.md)                             | 4        | 8   | vollständig geprüft |
| [Außenposten, Aurodium und Forschungsübergang](transition/README.md) | 3        | 5   | vollständig geprüft |

Stil: hohe Draufsicht, breite bebaute Grundstücke, kantige graue Panzerflächen, dunkle Technik und rote Akzente. Funktionale Glas-, Metall- und Rohstofffarben helfen bei der Erkennung. Eigene imperiale Silhouetten im Kontrast zur Rebellenserie. Orbitale Werften mit transparenten offenen Dockbereichen und ohne feste Schiffe.

256x256-RGBA-PNGs unter ../../buildings/generated/, 512px-Master, Quellen/Prompts/Manifeste je Serie erhalten. Erzeugung mit dem vom Nutzer gewünschten gpt-image-2 MCP (medium), Referenz aus der freigegebenen imperialen Stilprobe. Nachbarpixel an einer Quellblatt-Grenze korrigiert; Originalquellen erhalten.

Abgleich gegen game-data 8cda53525946df8fb8e998194acd1a06737630bc: alle 94 erwarteten imperialen IDs, Namen, Forschung und tatsächlich erlaubten Vorschaufelder vollständig geprüft. Startgebäude, Kolonisierungs-Außenposten und Forschungsupgrade berücksichtigt. Masterformat und Alpha, tatsächlicher Resolver und bytegleiche HTTP-Auslieferung aller 42 Bilder bestanden. Sämtliche Rebellen/shared Zuordnungen und Resolvercode gegenüber 5c31a4e97a7fe29f95a8276130f2f6b822879409 unverändert.

Die Browserfixture preview.html/preview.js importiert die tatsächliche FieldCell und buildingImage vom Vite-Frontend: 94 Varianten, 302 Bilder, 36 Statusfälle inklusive Orbit und numerischer STU-Felder sowie 42 Menübilder bei 40px bestanden. Keine Bildüberläufe oder Ladefehler; Inaktiv-/Beschädigt-Anzeigen und 50-%-Baufortschritt erhalten. Keine Gameplay-, Forschungs-, Terrain- oder Rendereränderungen. Keine breiten Test-/Buildläufe für Raster und statische Zuordnungen.

Reproduktion: node assets/generated/swu-imperial-stage-i-v1/full-verify.cjs; python3 assets/generated/swu-imperial-stage-i-v1/full-overview.py. Einzelserien: pipeline.py und check-artifacts.cjs mit dem Seriennamen. preview.html ist eine Entwicklungsfixture für den laufenden Vite-Server. review/ enthält ignorierte, regenerierbare Zwischenbilder.

Bildkosten laut MCP-Schätzung inklusive der drei Stilmuster: 0.7153 USD; kein gemessener Abrechnungsbetrag. Parent-Sitzungsmodell für Planung/Review, ticket-coder GPT-6 Luna high für die Code-Anbindung.

Browserprüfung mit dev-browser 1.0.0 in einer isolierten Headless-Sitzung durchgeführt. [Varianten-Screenshot](browser-variants.png) und [Status-Screenshot](browser-states.png) erhalten. Reproduktion bei laufendem Frontend: `DEV_BROWSER_HOME=/private/tmp/swu-imperial-dev-browser dev-browser --headless -b swu-imperial-assets -t 20 run assets/generated/swu-imperial-stage-i-v1/dev-browser-check.js`.
