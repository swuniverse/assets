# Vollständige Rebellen-Gebäudeassets bis FP Stufe I

Alle 25 fehlenden Stufe-I-Familien sowie Forschungszentrum II als Übergang sind fertig. Zusammen mit den vorherigen Serien: **42 Familien / 94 Gebäude-IDs, keine offenen Familien in diesem Umfang.**

[Gesamtübersicht](full-overview.png) · [Inventar und Datenprüfung](full-verification.json) · [Browserprüfung](browser-verification.json) · [Produktionsplan](plan.json)

| Serie                                                   | Familien | IDs | Stand               |
| ------------------------------------------------------- | -------- | --- | ------------------- |
| [Zivile Versorgung und Verkehr](civic/README.md)        | 4        | 8   | vollständig geprüft |
| [Außenposten und Kuppeln](settlement/README.md)         | 4        | 10  | vollständig geprüft |
| [Erneuerbare Energie](energy/README.md)                 | 4        | 10  | vollständig geprüft |
| [Rohstoffgewinnung](resources/README.md)                | 4        | 8   | vollständig geprüft |
| [Orbitale Energie und Werften](orbital/README.md)       | 4        | 8   | vollständig geprüft |
| [Modulfertigung und Torpedos](modules/README.md)        | 4        | 8   | vollständig geprüft |
| [Aurodium und Forschungsübergang](transition/README.md) | 2        | 3   | vollständig geprüft |

Vorherige Serien: 16 Familien / 39 IDs; Restserie: 26 Familien / 55 IDs. 41 Familien gehören zum Grund-/Stufe-I-Umfang, Forschungszentrum II ist der Übergang zur nächsten Stufe.

Alle Laufzeitassets liegen unter ../../buildings/generated/ als 256×256-RGBA-PNGs. 512px-Master, Quellen, exakte Prompts und Manifeste je Serie erhalten. Erzeugung über das vom Nutzer gewünschte gpt-image-2 MCP im freigegebenen hohen Draufsicht-/Star-Wars-Grundstücksstil. Modulserie durch die parallele Claude-/Opus-5.5-Sitzung erstellt und unabhängig geprüft.

Prüfung gegen game-data 8cda53525946df8fb8e998194acd1a06737630bc: sämtliche Gebäude-IDs, Namen, Forschungszuordnungen und erlaubte Vorschaufelder; Kolonisierungs-Außenposten und Forschungsupgrade separat berücksichtigt. Alle 94 erwarteten IDs vorhanden, keine fremden Zuordnungen oder Resolveränderungen gegenüber 03f4ae8e^. 42 RGBA-PNGs und Masterdateien sowie bytegleiche HTTP-Auslieferung geprüft.

Die Browserfixture preview.html/preview.js importiert die tatsächliche FieldCell und buildingImage vom laufenden Vite-Frontend. 94 Varianten, 302 geladene Bilder, 36 Statusfälle (Orbit, numerische Felder, letzte Gebäude) und 42 Menübilder bei 40px bestanden; kein Gebäudeüberlauf. Inaktiv-/Beschädigt-Anzeigen und 50-%-Baufortschritt erhalten. Vorhandene Terrainkacheln, Spielregeln, Forschung und Statusrenderer wurden für diese Serie nicht verändert. Native Chrome-Sichtung über CUA; kein Browserconnector-Host verfügbar. Keine breiten Test-/Buildläufe für reine Raster-/Mappingänderungen.

Reproduktion: node assets/generated/swu-rebel-stage-i-completion/full-verify.cjs; python3 assets/generated/swu-rebel-stage-i-completion/full-overview.py. Einzelserien: pipeline.py und verify.cjs mit dem Seriennamen. Browserfixture: http://localhost:5173/@fs/Users/TMUNDIN/git/github.com/swuniverse/core/assets/generated/swu-rebel-stage-i-completion/preview.html. review/ enthält ignorierte, regenerierbare Zwischenbilder.
