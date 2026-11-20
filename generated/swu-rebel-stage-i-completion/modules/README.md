# Modulfertigung und Torpedos

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie                | IDs                | Forschung | Vorschaufelder                            |
| ---------------------- | ------------------ | --------- | ----------------------------------------- |
| Waffenmodulfertigung   | 81810100, 81810199 | 281101    | Bauland (C119), Fels (C640), Wüste (D819) |
| Schildmodulfertigung   | 81820100, 81820199 | 282101    | Bauland (C119), Fels (C640), Wüste (D819) |
| Antriebsmodulfertigung | 81830100, 81830199 | 283101    | Bauland (C119), Fels (C640), Wüste (D819) |
| Protonentorpedo-Fabrik | 81990100, 81990199 | 288001    | Bauland (C119), Fels (C640), Wüste (D819) |

Quelle: edit-20261120-120411-259329-source-modules.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 8 IDs, 447426 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Gemeinsame Abschlussprüfung vollständig bestanden: siehe ../full-verification.json und ../browser-verification.json.
