# Orbitale Energie und Werften

Serie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.

| Familie                | IDs                | Forschung | Vorschaufelder |
| ---------------------- | ------------------ | --------- | -------------- |
| Orbital-Solarkollektor | 31910100, 31910199 | 271401    | Orbit (OO10)   |
| Werftkomplex           | 85010100, 85010199 | 275001    | Orbit (OO10)   |
| Jägerwerft             | 85110100, 85110199 | 275101    | Orbit (OO10)   |
| Fregattenwerft         | 85120100, 85120199 | 275201    | Orbit (OO10)   |

Quelle: edit-20261120-120034-56b418-source-orbital.png. Prompt: prompt.txt. Modell/Qualität: gpt-image-2 / medium.

Quellen: game-data/data/buildings/stu-buildings.yaml, game-data/data/research/rebels.yaml, game-data/data/buildings/swu-field-build-categories.yaml. game-data: 8cda53525946df8fb8e998194acd1a06737630bc.

pipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.

Fokussierte Prüfung bestanden: 4 Familien, 8 IDs, 327857 PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.
