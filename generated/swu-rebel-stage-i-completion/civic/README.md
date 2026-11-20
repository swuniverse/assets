# Zivile Versorgung und Verkehr

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie              | IDs                | Forschung | Vorschaufelder                            |
| -------------------- | ------------------ | --------- | ----------------------------------------- |
| Blaue-Milch-Brauerei | 22020100, 22020199 | 223401    | Bauland (C119), Fels (C640), Wüste (D819) |
| Cantina              | 22010100, 22010199 | 223301    | Bauland (C119), Fels (C640), Wüste (D819) |
| Allianz-Akademie     | 51010100, 51010199 | 399901    | Bauland (C119), Fels (C640), Wüste (D819) |
| Raumbahnhof          | 81120100, 81120199 | 270201    | Bauland (C119), Fels (C640), Wüste (D819) |

Quelle: edit-20261120-112731-089f5c-source-civic.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / high. Ergebnis nach MCP-Zeitlimit aus der tatsächlich gespeicherten Datei geborgen; Kostentelemetrie nicht verfügbar.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 8 IDs, 369907 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.
