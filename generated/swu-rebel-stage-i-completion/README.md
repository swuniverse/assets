# Abschluss der Rebellen-Assets bis FP Stufe I

Nutzerfreigabe: 25 fehlende Stufe-I-Familien plus Forschungszentrum Stufe II als Übergang. Vorher fertig: 16 Familien / 39 IDs.

Restserie umgesetzt: 24 von 26 Familien / 52 von 55 IDs. Gemeinsame Abschlussprüfung noch ausstehend.

| Serie                           | Familien | IDs | Stand       |
| ------------------------------- | -------- | --- | ----------- |
| Zivile Versorgung und Verkehr   | 4        | 8   | implemented |
| Außenposten und Kuppeln         | 4        | 10  | implemented |
| Erneuerbare Energie             | 4        | 10  | implemented |
| Rohstoffgewinnung               | 4        | 8   | implemented |
| Orbitale Energie und Werften    | 4        | 8   | implemented |
| Modulfertigung und Torpedos     | 4        | 8   | implemented |
| Aurodium und Forschungsübergang | 2        | 3   | pending     |

Gemeinsamer Produktionsvertrag: 256x256 transparentes RGBA-PNG, 512px-Master, Quellen/Prompts/Manifeste. Neue versionierte Dateien, keine Altgrafiken überschrieben. Keine Änderungen an Spiel-, Forschungs-, Gebäudezustands- oder Terrainregeln.

Aufruf: python3 assets/generated/swu-rebel-stage-i-completion/pipeline.py <serie>; node assets/generated/swu-rebel-stage-i-completion/verify.cjs <serie>.

Freigaben prüfen sowohl SWU-Kategorien als auch numerische STU-Felder. Außenposten als Kolonisierungsgebäude, Forschungszentrum II als echtes Upgrade von 72010100; familienübergreifende Geländealternativen erhalten. Orbitale Anlagen mit transparentem Hintergrund auf Orbitfeldern.

Plan: plan.json. Je Serie: manifest.json, prompt.txt, Quellblatt, masters/, Produktionsübersicht, Geländeprüfung, export-report.json und verification.json. review/ enthält ignorierte regenerierbare Zwischenbilder.
