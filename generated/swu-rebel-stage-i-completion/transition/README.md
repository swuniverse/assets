# Aurodium und Forschungsübergang

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie                    | IDs                | Forschung | Vorschaufelder                            |
| -------------------------- | ------------------ | --------- | ----------------------------------------- |
| Aurodium-Presse            | 63170100           | 254701    | Bauland (C119), Fels (C640), Wüste (D819) |
| Forschungszentrum Stufe II | 73010100, 73010199 | 200201    | Bauland (C119), Fels (C640), Wüste (D819) |

Quelle: edit-20261120-121313-5f15bd-source-transition.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 2 Familien, 3 IDs, 221851 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.
