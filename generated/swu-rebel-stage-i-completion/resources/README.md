# Rohstoffgewinnung

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie                | IDs                          | Forschung | Vorschaufelder                            |
| ---------------------- | ---------------------------- | --------- | ----------------------------------------- |
| Partikel-Beschleuniger | 62010100, 62010199           | 253101    | Bauland (C119), Fels (C640), Wüste (D819) |
| Kyber-Kristallmine     | 61210100, 61210121, 61210199 | 251101    | Fels (C640), Fels (STU) (713)             |
| Hypermaterie-Pumpe     | 61040100, 61040199           | 800301    | Fels (C640), Fels (STU) (713)             |
| Aurodium-Mine          | 61170100                     | 250701    | Fels (C640)                               |

Quelle: edit-20261120-115353-5e9e2e-source-resources.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 8 IDs, 457450 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.
