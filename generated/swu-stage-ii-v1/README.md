# Gebäudeassets Forschungsstufe II

76 neue Gebäudefamilien / 138 Gebäude-IDs: 38 Familien / 69 IDs je Fraktion. Auswahl unabhängig anhand research commodityId 1702 (FP II), einschließlich Forschungszentrum III als Übergang; Forschungszentrum II bereits in Stufe I vorhanden. Alle EXCLUDE-Spezialisierungszweige werden abgedeckt. Keine Änderung an Regeln, Forschung oder Feldfreigaben.

[Rebellenallianz – Übersicht](rebels-overview.png) · [Galaktisches Imperium – Übersicht](imperials-overview.png) · [Produktionsplan](plan.json)

## Quellen und Produktion

Game-data: 27ffb84b3446db8796c14d5c618b6e3b30efb29e. Gebäude: data/buildings/stu-buildings.yaml; Forschung: data/research/rebels.yaml und imperials.yaml; Felder: swu-field-build-categories.yaml; Upgrade-Ketten: stu-building-upgrades.yaml. Basis der Zuordnung: 4943f859dde713e3c4fa55c3e589777249899449.

Erzeugung mit installiertem gpt-image-2-MCP, generate_image, medium, PNG; exakte Prompts und API-Metadaten jeweils im Batch. Das Gateway lehnt Bildreferenz-Edits ab (HTTP 400, image[0] erwartet Datei statt String). Deshalb dokumentierter freigegebener Stufe-I-Stil als Textvorgabe.

Gateway liefert applied.background:null und RGB-Schachbrett statt Alpha. Originalquelle bleibt erhalten; source-alpha.png stellt nur zusammenhängenden Hintergrund frei (12% Flood-Fill), bei eingeschlossenen technischen Öffnungen mit visuell geprüften alphaSeeds. Imperiale Raumhafen-Decks mit dokumentierten surfacePadOverrides korrigiert. Fünf Bildbögen haben geprüfte columnEdges im Manifest, um Randpixel des Nachbargebäudes auszuschließen. Runtime: echte 256×256 RGBA-PNGs in ../../buildings/generated; Master: 512×512. Prüfung bei 40/68px.

Leere allowedFieldTypes werden als unassigned-fields markiert. Deren Geländeansichten sind ausdrücklich Kompositionsvorschauen ohne Feldfreigabe. Importierte Minen-/Raffinerienamen bleiben unverändert; displayName und Bild folgen der aktuellen Forschung (Cortosis, Laminanium, Quadranium, Neuranium, Bronzium).

## Serien

### Rebellenallianz · Siedlung und Klimaversorgung

[Quelle, Prompt und Metadaten](rebels-civic/manifest.json) · [40/68px](rebels-civic/production-overview.png) · [Gelände](rebels-civic/terrain-review.png) · [Visuelle Prüfung](rebels-civic/visual-review.md)

| Gebäude                   | IDs                                                        | Forschung | Laufzeitbild                                                                                                                           |
| ------------------------- | ---------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Siedlung                  | 13010100, 13010103, 13010199                               | 210101    | [13010100-rebels-siedlung-map-v1.png](../../buildings/generated/13010100-rebels-siedlung-map-v1.png)                                   |
| Klimakontrollzentrum      | 23030100, 23030199                                         | 225101    | [23030100-rebels-klimakontrollzentrum-map-v1.png](../../buildings/generated/23030100-rebels-klimakontrollzentrum-map-v1.png)           |
| Klimakontroll-Farm        | 23010100, 23010101, 23010199, 23110100, 23110101, 23110199 | 225401    | [23010100-rebels-klimakontroll-farm-map-v1.png](../../buildings/generated/23010100-rebels-klimakontroll-farm-map-v1.png)               |
| Klimakontroll-Zuchtanlage | 23020100, 23020102, 23020199, 23120100, 23120102, 23120199 | 225401    | [23020100-rebels-klimakontroll-zuchtanlage-map-v1.png](../../buildings/generated/23020100-rebels-klimakontroll-zuchtanlage-map-v1.png) |

### Rebellenallianz · Fortgeschrittene Energie

[Quelle, Prompt und Metadaten](rebels-energy/manifest.json) · [40/68px](rebels-energy/production-overview.png) · [Gelände](rebels-energy/terrain-review.png) · [Visuelle Prüfung](rebels-energy/visual-review.md)

| Gebäude           | IDs                | Forschung | Laufzeitbild                                                                                                           |
| ----------------- | ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| Fusionsreaktor    | 32010100, 32010199 | 231401    | [32010100-rebels-fusionsreaktor-map-v1.png](../../buildings/generated/32010100-rebels-fusionsreaktor-map-v1.png)       |
| Plasmakonverter   | 63010100, 63010199 | 253201    | [63010100-rebels-plasmakonverter-map-v1.png](../../buildings/generated/63010100-rebels-plasmakonverter-map-v1.png)     |
| Thermal-Extraktor | 36010100           | 236101    | [36010100-rebels-thermal-extraktor-map-v1.png](../../buildings/generated/36010100-rebels-thermal-extraktor-map-v1.png) |
| Thermalkraftwerk  | 36020100           | 237101    | [36020100-rebels-thermalkraftwerk-map-v1.png](../../buildings/generated/36020100-rebels-thermalkraftwerk-map-v1.png)   |

### Rebellenallianz · Logistik, Produktion und Forschung

[Quelle, Prompt und Metadaten](rebels-logistics/manifest.json) · [40/68px](rebels-logistics/production-overview.png) · [Gelände](rebels-logistics/terrain-review.png) · [Visuelle Prüfung](rebels-logistics/visual-review.md)

| Gebäude                     | IDs                | Forschung | Laufzeitbild                                                                                                                               |
| --------------------------- | ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Frachtkontainer-Depot       | 85900100           | 256001    | [85900100-rebels-frachtkontainer-depot-map-v1.png](../../buildings/generated/85900100-rebels-frachtkontainer-depot-map-v1.png)             |
| Raumhafen                   | 81130100, 81130199 | 270301    | [81130100-rebels-raumhafen-map-v1.png](../../buildings/generated/81130100-rebels-raumhafen-map-v1.png)                                     |
| Produktionshalle            | 84800100, 84800199 | 280101    | [84800100-rebels-produktionshalle-map-v1.png](../../buildings/generated/84800100-rebels-produktionshalle-map-v1.png)                       |
| Forschungszentrum Stufe III | 74010100, 74010199 | 200301    | [74010100-rebels-forschungszentrum-stufe-iii-map-v1.png](../../buildings/generated/74010100-rebels-forschungszentrum-stufe-iii-map-v1.png) |

### Rebellenallianz · Orbitale Infrastruktur

[Quelle, Prompt und Metadaten](rebels-orbital/manifest.json) · [40/68px](rebels-orbital/production-overview.png) · [Gelände](rebels-orbital/terrain-review.png) · [Visuelle Prüfung](rebels-orbital/visual-review.md)

| Gebäude                   | IDs                | Forschung | Laufzeitbild                                                                                                                           |
| ------------------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Orbitales Forschungslabor | 71910100, 71910199 | 201201    | [71910100-rebels-orbitales-forschungslabor-map-v1.png](../../buildings/generated/71910100-rebels-orbitales-forschungslabor-map-v1.png) |
| Orbital-Fallstation       | 21910100, 21910199 | 271101    | [21910100-rebels-orbital-fallstation-map-v1.png](../../buildings/generated/21910100-rebels-orbital-fallstation-map-v1.png)             |
| Orbital-Habitat           | 11910100, 11910199 | 271301    | [11910100-rebels-orbital-habitat-map-v1.png](../../buildings/generated/11910100-rebels-orbital-habitat-map-v1.png)                     |
| Korvetten-Werft           | 85130100, 85130199 | 275301    | [85130100-rebels-korvetten-werft-map-v1.png](../../buildings/generated/85130100-rebels-korvetten-werft-map-v1.png)                     |

### Rebellenallianz · Modulfabriken

[Quelle, Prompt und Metadaten](rebels-modules/manifest.json) · [40/68px](rebels-modules/production-overview.png) · [Gelände](rebels-modules/terrain-review.png) · [Visuelle Prüfung](rebels-modules/visual-review.md)

| Gebäude             | IDs                | Forschung | Laufzeitbild                                                                                                               |
| ------------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| Waffenmodulfabrik   | 82810100, 82810199 | 281201    | [82810100-rebels-waffenmodulfabrik-map-v1.png](../../buildings/generated/82810100-rebels-waffenmodulfabrik-map-v1.png)     |
| Schildmodulfabrik   | 82820100, 82820199 | 282201    | [82820100-rebels-schildmodulfabrik-map-v1.png](../../buildings/generated/82820100-rebels-schildmodulfabrik-map-v1.png)     |
| Antriebsmodulfabrik | 82830100, 82830199 | 283201    | [82830100-rebels-antriebsmodulfabrik-map-v1.png](../../buildings/generated/82830100-rebels-antriebsmodulfabrik-map-v1.png) |

### Rebellenallianz · Ausbildung, Holografie und Plasma

[Quelle, Prompt und Metadaten](rebels-holo/manifest.json) · [40/68px](rebels-holo/production-overview.png) · [Gelände](rebels-holo/terrain-review.png) · [Visuelle Prüfung](rebels-holo/visual-review.md)

| Gebäude          | IDs                                    | Forschung | Laufzeitbild                                                                                                         |
| ---------------- | -------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| Allianz-Schule   | 41010100, 41010199                     | 300101    | [41010100-rebels-allianz-schule-map-v1.png](../../buildings/generated/41010100-rebels-allianz-schule-map-v1.png)     |
| Holo-Simulator   | 42010100, 42010199                     | 300301    | [42010100-rebels-holo-simulator-map-v1.png](../../buildings/generated/42010100-rebels-holo-simulator-map-v1.png)     |
| Holo-Generator   | 42020100, 42020199                     | 300401    | [42020100-rebels-holo-generator-map-v1.png](../../buildings/generated/42020100-rebels-holo-generator-map-v1.png)     |
| Plasma-Extraktor | 86000100, 86000101, 86000102, 86000103 | 10002301  | [86000100-rebels-plasma-extraktor-map-v1.png](../../buildings/generated/86000100-rebels-plasma-extraktor-map-v1.png) |

### Rebellenallianz · Spezialisierte Erzminen

[Quelle, Prompt und Metadaten](rebels-mines/manifest.json) · [40/68px](rebels-mines/production-overview.png) · [Gelände](rebels-mines/terrain-review.png) · [Visuelle Prüfung](rebels-mines/visual-review.md)

| Gebäude                                    | IDs      | Forschung | Laufzeitbild                                                                                                     |
| ------------------------------------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Cortosis-Mine (Datensatz: Galazit-Mine)    | 16010100 | 250201    | [16010100-rebels-galazit-mine-map-v1.png](../../buildings/generated/16010100-rebels-galazit-mine-map-v1.png)     |
| Laminanium-Mine (Datensatz: Nitrium-Mine)  | 16020100 | 250301    | [16020100-rebels-nitrium-mine-map-v1.png](../../buildings/generated/16020100-rebels-nitrium-mine-map-v1.png)     |
| Quadranium-Mine (Datensatz: Magnesit-Mine) | 16030100 | 250401    | [16030100-rebels-magnesit-mine-map-v1.png](../../buildings/generated/16030100-rebels-magnesit-mine-map-v1.png)   |
| Neuranium-Mine                             | 16040100 | 250501    | [16040100-rebels-neuranium-mine-map-v1.png](../../buildings/generated/16040100-rebels-neuranium-mine-map-v1.png) |
| Bronzium-Mine (Datensatz: Talgonit-Mine)   | 16050100 | 250601    | [16050100-rebels-talgonit-mine-map-v1.png](../../buildings/generated/16050100-rebels-talgonit-mine-map-v1.png)   |

### Rebellenallianz · Spezialisierte Raffinerien

[Quelle, Prompt und Metadaten](rebels-refineries/manifest.json) · [40/68px](rebels-refineries/production-overview.png) · [Gelände](rebels-refineries/terrain-review.png) · [Visuelle Prüfung](rebels-refineries/visual-review.md)

| Gebäude                                                | IDs      | Forschung | Laufzeitbild                                                                                                                 |
| ------------------------------------------------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Cortosis-Raffinerie (Datensatz: Galazit-Raffinerie)    | 26010100 | 254201    | [26010100-rebels-galazit-raffinerie-map-v1.png](../../buildings/generated/26010100-rebels-galazit-raffinerie-map-v1.png)     |
| Laminanium-Raffinerie (Datensatz: Nitrium-Raffinerie)  | 26020100 | 254301    | [26020100-rebels-nitrium-raffinerie-map-v1.png](../../buildings/generated/26020100-rebels-nitrium-raffinerie-map-v1.png)     |
| Quadranium-Raffinerie (Datensatz: Magnesit-Raffinerie) | 26030100 | 254401    | [26030100-rebels-magnesit-raffinerie-map-v1.png](../../buildings/generated/26030100-rebels-magnesit-raffinerie-map-v1.png)   |
| Neuranium-Raffinerie                                   | 26040100 | 254501    | [26040100-rebels-neuranium-raffinerie-map-v1.png](../../buildings/generated/26040100-rebels-neuranium-raffinerie-map-v1.png) |
| Bronzium-Raffinerie (Datensatz: Talgonit-Raffinerie)   | 26050100 | 254601    | [26050100-rebels-talgonit-raffinerie-map-v1.png](../../buildings/generated/26050100-rebels-talgonit-raffinerie-map-v1.png)   |

### Rebellenallianz · Spezialkomponenten

[Quelle, Prompt und Metadaten](rebels-components/manifest.json) · [40/68px](rebels-components/production-overview.png) · [Gelände](rebels-components/terrain-review.png) · [Visuelle Prüfung](rebels-components/visual-review.md)

| Gebäude                       | IDs      | Forschung | Laufzeitbild                                                                                                                                   |
| ----------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Hyperraum-Spulen-Fabrik       | 37010100 | 904101    | [37010100-rebels-hyperraum-spulen-fabrik-map-v1.png](../../buildings/generated/37010100-rebels-hyperraum-spulen-fabrik-map-v1.png)             |
| Laminanium-Schaltkreis-Fabrik | 37020100 | 903101    | [37020100-rebels-laminanium-schaltkreis-fabrik-map-v1.png](../../buildings/generated/37020100-rebels-laminanium-schaltkreis-fabrik-map-v1.png) |
| Phasenkonverter-Fabrik        | 37030100 | 905101    | [37030100-rebels-phasenkonverter-fabrik-map-v1.png](../../buildings/generated/37030100-rebels-phasenkonverter-fabrik-map-v1.png)               |
| Speicherchip-Fabrik           | 37040100 | 901101    | [37040100-rebels-speicherchip-fabrik-map-v1.png](../../buildings/generated/37040100-rebels-speicherchip-fabrik-map-v1.png)                     |
| Mikrodyne-Fabrik              | 37050100 | 906101    | [37050100-rebels-mikrodyne-fabrik-map-v1.png](../../buildings/generated/37050100-rebels-mikrodyne-fabrik-map-v1.png)                           |

### Galaktisches Imperium · Siedlung und Klimaversorgung

[Quelle, Prompt und Metadaten](imperials-civic/manifest.json) · [40/68px](imperials-civic/production-overview.png) · [Gelände](imperials-civic/terrain-review.png) · [Visuelle Prüfung](imperials-civic/visual-review.md)

| Gebäude                   | IDs                                                        | Forschung | Laufzeitbild                                                                                                                                 |
| ------------------------- | ---------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Siedlung                  | 13010300, 13010303, 13010399                               | 210103    | [13010300-imperials-siedlung-map-v1.png](../../buildings/generated/13010300-imperials-siedlung-map-v1.png)                                   |
| Klimakontrollzentrum      | 23030300, 23030399                                         | 225103    | [23030300-imperials-klimakontrollzentrum-map-v1.png](../../buildings/generated/23030300-imperials-klimakontrollzentrum-map-v1.png)           |
| Klimakontroll-Bantha-Farm | 23010300, 23010301, 23010399, 23110300, 23110301, 23110399 | 225403    | [23010300-imperials-klimakontroll-bantha-farm-map-v1.png](../../buildings/generated/23010300-imperials-klimakontroll-bantha-farm-map-v1.png) |
| Klimakontroll-Nerf-Zucht  | 23020300, 23020302, 23020399, 23120300, 23120302, 23120399 | 225403    | [23020300-imperials-klimakontroll-nerf-zucht-map-v1.png](../../buildings/generated/23020300-imperials-klimakontroll-nerf-zucht-map-v1.png)   |

### Galaktisches Imperium · Fortgeschrittene Energie

[Quelle, Prompt und Metadaten](imperials-energy/manifest.json) · [40/68px](imperials-energy/production-overview.png) · [Gelände](imperials-energy/terrain-review.png) · [Visuelle Prüfung](imperials-energy/visual-review.md)

| Gebäude           | IDs                | Forschung | Laufzeitbild                                                                                                                 |
| ----------------- | ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Fusionsreaktor    | 32010300, 32010399 | 231403    | [32010300-imperials-fusionsreaktor-map-v1.png](../../buildings/generated/32010300-imperials-fusionsreaktor-map-v1.png)       |
| Plasmakonverter   | 63010300, 63010399 | 253203    | [63010300-imperials-plasmakonverter-map-v1.png](../../buildings/generated/63010300-imperials-plasmakonverter-map-v1.png)     |
| Thermal-Extraktor | 36010300           | 236103    | [36010300-imperials-thermal-extraktor-map-v1.png](../../buildings/generated/36010300-imperials-thermal-extraktor-map-v1.png) |
| Thermalkraftwerk  | 36020300           | 237103    | [36020300-imperials-thermalkraftwerk-map-v1.png](../../buildings/generated/36020300-imperials-thermalkraftwerk-map-v1.png)   |

### Galaktisches Imperium · Logistik, Produktion und Forschung

[Quelle, Prompt und Metadaten](imperials-logistics/manifest.json) · [40/68px](imperials-logistics/production-overview.png) · [Gelände](imperials-logistics/terrain-review.png) · [Visuelle Prüfung](imperials-logistics/visual-review.md)

| Gebäude                     | IDs                | Forschung | Laufzeitbild                                                                                                                                     |
| --------------------------- | ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frachtkontainer-Depot       | 85900300           | 256003    | [85900300-imperials-frachtkontainer-depot-map-v1.png](../../buildings/generated/85900300-imperials-frachtkontainer-depot-map-v1.png)             |
| Raumhafen                   | 81130300, 81130399 | 270303    | [81130300-imperials-raumhafen-map-v1.png](../../buildings/generated/81130300-imperials-raumhafen-map-v1.png)                                     |
| Produktionshalle            | 84800300, 84800399 | 280103    | [84800300-imperials-produktionshalle-map-v1.png](../../buildings/generated/84800300-imperials-produktionshalle-map-v1.png)                       |
| Forschungszentrum Stufe III | 74010300, 74010399 | 200303    | [74010300-imperials-forschungszentrum-stufe-iii-map-v1.png](../../buildings/generated/74010300-imperials-forschungszentrum-stufe-iii-map-v1.png) |

### Galaktisches Imperium · Orbitale Infrastruktur

[Quelle, Prompt und Metadaten](imperials-orbital/manifest.json) · [40/68px](imperials-orbital/production-overview.png) · [Gelände](imperials-orbital/terrain-review.png) · [Visuelle Prüfung](imperials-orbital/visual-review.md)

| Gebäude                    | IDs                | Forschung | Laufzeitbild                                                                                                                                   |
| -------------------------- | ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Orbitales Forschungslabor  | 71910300, 71910399 | 201203    | [71910300-imperials-orbitales-forschungslabor-map-v1.png](../../buildings/generated/71910300-imperials-orbitales-forschungslabor-map-v1.png)   |
| Anti-Grav Trainingszentrum | 21910300, 21910399 | 271103    | [21910300-imperials-anti-grav-trainingszentrum-map-v1.png](../../buildings/generated/21910300-imperials-anti-grav-trainingszentrum-map-v1.png) |
| Orbital-Habitat            | 11910300, 11910399 | 271303    | [11910300-imperials-orbital-habitat-map-v1.png](../../buildings/generated/11910300-imperials-orbital-habitat-map-v1.png)                       |
| Korvetten-Werft            | 85130300, 85130399 | 275303    | [85130300-imperials-korvetten-werft-map-v1.png](../../buildings/generated/85130300-imperials-korvetten-werft-map-v1.png)                       |

### Galaktisches Imperium · Modulfabriken

[Quelle, Prompt und Metadaten](imperials-modules/manifest.json) · [40/68px](imperials-modules/production-overview.png) · [Gelände](imperials-modules/terrain-review.png) · [Visuelle Prüfung](imperials-modules/visual-review.md)

| Gebäude             | IDs                | Forschung | Laufzeitbild                                                                                                                     |
| ------------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Waffenmodulfabrik   | 82810300, 82810399 | 281203    | [82810300-imperials-waffenmodulfabrik-map-v1.png](../../buildings/generated/82810300-imperials-waffenmodulfabrik-map-v1.png)     |
| Schildmodulfabrik   | 82820300, 82820399 | 282203    | [82820300-imperials-schildmodulfabrik-map-v1.png](../../buildings/generated/82820300-imperials-schildmodulfabrik-map-v1.png)     |
| Antriebsmodulfabrik | 82830300, 82830399 | 283203    | [82830300-imperials-antriebsmodulfabrik-map-v1.png](../../buildings/generated/82830300-imperials-antriebsmodulfabrik-map-v1.png) |

### Galaktisches Imperium · Ausbildung, Holografie und Plasma

[Quelle, Prompt und Metadaten](imperials-holo/manifest.json) · [40/68px](imperials-holo/production-overview.png) · [Gelände](imperials-holo/terrain-review.png) · [Visuelle Prüfung](imperials-holo/visual-review.md)

| Gebäude             | IDs                                    | Forschung | Laufzeitbild                                                                                                                     |
| ------------------- | -------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Kampftrainingslager | 41010300, 41010399                     | 300103    | [41010300-imperials-kampftrainingslager-map-v1.png](../../buildings/generated/41010300-imperials-kampftrainingslager-map-v1.png) |
| Holo-Simulator      | 42010300, 42010399                     | 300303    | [42010300-imperials-holo-simulator-map-v1.png](../../buildings/generated/42010300-imperials-holo-simulator-map-v1.png)           |
| Holo-Generator      | 42020300, 42020399                     | 300403    | [42020300-imperials-holo-generator-map-v1.png](../../buildings/generated/42020300-imperials-holo-generator-map-v1.png)           |
| Plasma-Extraktor    | 86000300, 86000301, 86000302, 86000303 | 10002303  | [86000300-imperials-plasma-extraktor-map-v1.png](../../buildings/generated/86000300-imperials-plasma-extraktor-map-v1.png)       |

### Galaktisches Imperium · Spezialisierte Erzminen

[Quelle, Prompt und Metadaten](imperials-mines/manifest.json) · [40/68px](imperials-mines/production-overview.png) · [Gelände](imperials-mines/terrain-review.png) · [Visuelle Prüfung](imperials-mines/visual-review.md)

| Gebäude                                    | IDs      | Forschung | Laufzeitbild                                                                                                           |
| ------------------------------------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| Cortosis-Mine (Datensatz: Galazit-Mine)    | 16010103 | 250203    | [16010103-imperials-galazit-mine-map-v1.png](../../buildings/generated/16010103-imperials-galazit-mine-map-v1.png)     |
| Laminanium-Mine (Datensatz: Nitrium-Mine)  | 16020103 | 250303    | [16020103-imperials-nitrium-mine-map-v1.png](../../buildings/generated/16020103-imperials-nitrium-mine-map-v1.png)     |
| Quadranium-Mine (Datensatz: Magnesit-Mine) | 16030103 | 250403    | [16030103-imperials-magnesit-mine-map-v1.png](../../buildings/generated/16030103-imperials-magnesit-mine-map-v1.png)   |
| Neuranium-Mine                             | 16040103 | 250503    | [16040103-imperials-neuranium-mine-map-v1.png](../../buildings/generated/16040103-imperials-neuranium-mine-map-v1.png) |
| Bronzium-Mine (Datensatz: Talgonit-Mine)   | 16050103 | 250603    | [16050103-imperials-talgonit-mine-map-v1.png](../../buildings/generated/16050103-imperials-talgonit-mine-map-v1.png)   |

### Galaktisches Imperium · Spezialisierte Raffinerien

[Quelle, Prompt und Metadaten](imperials-refineries/manifest.json) · [40/68px](imperials-refineries/production-overview.png) · [Gelände](imperials-refineries/terrain-review.png) · [Visuelle Prüfung](imperials-refineries/visual-review.md)

| Gebäude                                                | IDs      | Forschung | Laufzeitbild                                                                                                                       |
| ------------------------------------------------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Cortosis-Raffinerie (Datensatz: Galazit-Raffinerie)    | 26010103 | 254203    | [26010103-imperials-galazit-raffinerie-map-v1.png](../../buildings/generated/26010103-imperials-galazit-raffinerie-map-v1.png)     |
| Laminanium-Raffinerie (Datensatz: Nitrium-Raffinerie)  | 26020103 | 254303    | [26020103-imperials-nitrium-raffinerie-map-v1.png](../../buildings/generated/26020103-imperials-nitrium-raffinerie-map-v1.png)     |
| Quadranium-Raffinerie (Datensatz: Magnesit-Raffinerie) | 26030103 | 254403    | [26030103-imperials-magnesit-raffinerie-map-v1.png](../../buildings/generated/26030103-imperials-magnesit-raffinerie-map-v1.png)   |
| Neuranium-Raffinerie                                   | 26040103 | 254503    | [26040103-imperials-neuranium-raffinerie-map-v1.png](../../buildings/generated/26040103-imperials-neuranium-raffinerie-map-v1.png) |
| Bronzium-Raffinerie (Datensatz: Talgonit-Raffinerie)   | 26050103 | 254603    | [26050103-imperials-talgonit-raffinerie-map-v1.png](../../buildings/generated/26050103-imperials-talgonit-raffinerie-map-v1.png)   |

### Galaktisches Imperium · Spezialkomponenten

[Quelle, Prompt und Metadaten](imperials-components/manifest.json) · [40/68px](imperials-components/production-overview.png) · [Gelände](imperials-components/terrain-review.png) · [Visuelle Prüfung](imperials-components/visual-review.md)

| Gebäude                       | IDs      | Forschung | Laufzeitbild                                                                                                                                         |
| ----------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hyperraum-Spulen-Fabrik       | 37010103 | 904103    | [37010103-imperials-hyperraum-spulen-fabrik-map-v1.png](../../buildings/generated/37010103-imperials-hyperraum-spulen-fabrik-map-v1.png)             |
| Laminanium-Schaltkreis-Fabrik | 37020103 | 903103    | [37020103-imperials-laminanium-schaltkreis-fabrik-map-v1.png](../../buildings/generated/37020103-imperials-laminanium-schaltkreis-fabrik-map-v1.png) |
| Phasenkonverter-Fabrik        | 37030103 | 905103    | [37030103-imperials-phasenkonverter-fabrik-map-v1.png](../../buildings/generated/37030103-imperials-phasenkonverter-fabrik-map-v1.png)               |
| Speicherchip-Fabrik           | 37040103 | 901103    | [37040103-imperials-speicherchip-fabrik-map-v1.png](../../buildings/generated/37040103-imperials-speicherchip-fabrik-map-v1.png)                     |
| Mikrodyne-Fabrik              | 37050103 | 906103    | [37050103-imperials-mikrodyne-fabrik-map-v1.png](../../buildings/generated/37050103-imperials-mikrodyne-fabrik-map-v1.png)                           |

## Prüfung

Unabhängige Daten-/PNG-/Alpha-Prüfung: check-artifacts.cjs. Gesamte Resolver-/HTTP-Prüfung: full-verify.cjs. Browserfixture: preview.html / preview.js mit echter FieldCell und buildingImage. Reproduktion bei laufendem Vite auf localhost:5173:

```sh
node assets/generated/swu-stage-ii-v1/full-verify.cjs
DEV_BROWSER_HOME=/private/tmp/swu-stage-ii-dev-browser dev-browser --headless -b swu-stage-ii-assets -t 30 run assets/generated/swu-stage-ii-v1/dev-browser-check.js
```

Vollständig verifiziert: 76 Familien / 138 IDs; 576 geladene Bilder, 112 aktive/inaktive/beschädigte/im-Bau-Zustände, 76 Menübilder bei 40px, 138 FieldCells bei 68px. Keine Ladefehler oder Überläufe. Exakter Resolver und bytegleiche HTTP-Auslieferung aller 76 Bilder bestanden.

[Daten-/Resolver-/HTTP-Protokoll](full-verification.json) · [dev-browser-Protokoll](browser-verification.json) · [Varianten im Browser](browser-variants.png) · [Gebäudezustände im Browser](browser-states.png).
