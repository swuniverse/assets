# Erneuerbare Energie

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie           | IDs                          | Forschung | Vorschaufelder                                    |
| ----------------- | ---------------------------- | --------- | ------------------------------------------------- |
| Solarspiegel      | 33010100, 33010131, 33010199 | 231301    | Wüste (STU) (401), Fels (STU) (713)               |
| Solarfokus        | 33020100, 33020199           | 231201    | Wüste (STU) (401), Fels (STU) (713)               |
| Strömungsanker    | 33030100, 33030199           | 231001    | Wasser (A410), Flachwasser (A430), Packeis (A530) |
| Strömungsturbinen | 33040100, 33040132, 33040199 | 231101    | Wasser (A410), Flachwasser (A430), Packeis (A530) |

Quelle: edit-20261120-114617-ca6535-source-energy.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 10 IDs, 416520 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.
