# Außenposten und Kuppeln

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie           | IDs                          | Forschung | Vorschaufelder                            |
| ----------------- | ---------------------------- | --------- | ----------------------------------------- |
| Außenposten       | 81010100, 81010199           | 1001      | Bauland (C119)                            |
| Versorgungskuppel | 12020100, 12020199           | 211201    | Bauland (C119), Fels (C640), Wüste (D819) |
| Habitatkuppel     | 12010100, 12010104, 12010199 | 211301    | Bauland (C119), Fels (C640), Wüste (D819) |
| Kryo-Zuchtanlage  | 21120100, 21120102, 21120199 | 800201    | Eiswasser (STU) (222)                     |

Quelle: edit-20261120-113550-e3d480-source-settlement.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 10 IDs, 424945 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Gemeinsame Abschlussprüfung vollständig bestanden: siehe ../full-verification.json und ../browser-verification.json.
