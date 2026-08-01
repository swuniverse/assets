Generate the remaining missing Star Wars Universe colony building icon assets in the same established style as previous SWU unified building icon batches.

CRITICAL CHANGE FROM PREVIOUS BATCH:
- Use a PURE WHITE (#ffffff) flat background for every contact sheet cell.
- No dark background. No black/near-black floor fill. No vignette background.
- Keep subject fully inside each cell with 18-24px padding.
- Avoid drop shadows/glow that merge into the white background if possible; soft object shadows are acceptable but should remain near-white-key removable.
- Purpose: downstream import will remove white background to create transparent PNGs. Previous dark-background cutouts clipped building parts.

Style to preserve for the buildings themselves:
- same SWU dark sci-fi strategy UI icon family as projects `swu-building-icons-batch-legacy-refresh` and `swu-unified-asset-icons`
- clean isometric/3D building silhouettes
- rim lighting and subtle holographic blue/amber accents on the object only
- high readability at 48px
- no text in icons, no logos, no protected actor likenesses

Output contract:
- Generate 256x256-ready building icons as contact-sheet PNGs.
- Use one icon per family below; IDs in family share same icon.
- Split into sequential sheets, preferably 5x5 for sheets 1-4 and 5x4 for sheet 5 (15 used cells).
- Create generated-icons-batch-5-white.json with items: kind="building", label, slug, ids, contactSheet, cellIndex, filename, short visualPrompt.
- Create README/overview with what was generated and any items you could not generate.
- Prefer exact filenames for final icon intent: <first-id>-<slug>.png in manifest.

Missing building families to generate (115 families; 226 visible building entries):
1. Allianz-Schule — slug allianz-schule — ids: [41010100] — raw/STU: Schule
2. Antriebsmodulfabrik — slug antriebsmodulfabrik — ids: [82830100, 82830300] — raw/STU: Modulfabrik (Hauptsysteme)
3. Antriebsmodulfertigung — slug antriebsmodulfertigung — ids: [81830100, 81830300] — raw/STU: Modulfertigung (Hauptsysteme)
4. Antriebsmodulkomplex — slug antriebsmodulkomplex — ids: [83830100, 83830300] — raw/STU: Modulkomplex (Hauptsysteme)
5. Aqua-Zuchtanlage — slug aqua-zuchtanlage — ids: [21020102] — raw/STU: Algenfarm
6. Aurodium-Mine — slug aurodium-mine — ids: [61170100, 61170300] — raw/STU: Latinum-Mine
7. Aurodium-Presse — slug aurodium-presse — ids: [63170100, 63170300] — raw/STU: Latinum-Presse
8. Außenposten — slug aussenposten — ids: [81010300] — raw/STU: Basislager
9. Bantha-Farm — slug bantha-farm — ids: [21010301] — raw/STU: Targfarm
10. Blaster-Schießstand — slug blaster-schiessstand — ids: [25030300] — raw/STU: Waffenschießsstand
11. Deflektorschild-Generator — slug deflektorschild-generator — ids: [100010100, 100010300] — raw/STU: Schildgenerator
12. Durastahl-Schmiede — slug durastahl-schmiede — ids: [63110300] — raw/STU: Duraniumanlage
13. Exotarium — slug exotarium — ids: [24020100] — raw/STU: Zoo
14. Fischgründe — slug fischgrunde — ids: [25020300, 25020302, 25120300, 25120302] — raw/STU: Fischgründe
15. Forschungslabor — slug forschungslabor — ids: [71010300] — raw/STU: Forschungslabor
16. Forschungszentrum III mit Hypermaterie-Labor — slug forschungszentrum-iii-mit-hypermaterie-labor — ids: [74020100, 74020300] — raw/STU: Forschungszentrum (Level 3) mit Antimaterie-Labor
17. Forschungszentrum Stufe I — slug forschungszentrum-stufe-i — ids: [72010300] — raw/STU: Forschungszentrum (Level 1)
18. Forschungszentrum Stufe II — slug forschungszentrum-stufe-ii — ids: [73010100, 73010300] — raw/STU: Forschungszentrum (Level 2)
19. Forschungszentrum Stufe III — slug forschungszentrum-stufe-iii — ids: [74010100, 74010300] — raw/STU: Forschungszentrum (Level 3)
20. Frachtkontainer-Depot — slug frachtkontainer-depot — ids: [85900100, 85900300] — raw/STU: Lagerkomplex
21. Fregattenwerft — slug fregattenwerft — ids: [85120100, 85120300] — raw/STU: Fregattenwerft
22. Freie Universität — slug freie-universitat — ids: [45010100] — raw/STU: Universität
23. Freizeitpark — slug freizeitpark — ids: [24030100] — raw/STU: Freizeitpark
24. Fusionsreaktor — slug fusionsreaktor — ids: [32010100, 32010300] — raw/STU: Fusionsreaktor
25. Gebäude-Forschungszentrum — slug gebaude-forschungszentrum — ids: [75310100, 75310300] — raw/STU: Forschungszentrum (Gebäude)
26. Gebäude-FZ mit Hypermaterie-Labor — slug gebaude-fz-mit-hypermaterie-labor — ids: [75320100, 75320300] — raw/STU: Forschungszentrum (Gebäude) mit Antimaterie-Labor
27. Gebäude-FZ mit Legierungslabor — slug gebaude-fz-mit-legierungslabor — ids: [75330100, 75330300] — raw/STU: Forschungszentrum (Gebäude) mit Material-Labor
28. Geothermalkraftwerk — slug geothermalkraftwerk — ids: [90650100, 90650300] — raw/STU: Geothermalkraftwerk
29. Gezeitenkraftwerk — slug gezeitenkraftwerk — ids: [31020132, 31020300, 31020332] — raw/STU: Gezeitenkraftwerk
30. Grav-Ball-Arena — slug grav-ball-arena — ids: [25010100, 25010101, 25110100, 25110101] — raw/STU: Parisses squares Arena
31. Habitatkuppel — slug habitatkuppel — ids: [12010100, 12010104, 12010300, 12010304] — raw/STU: Habitatkuppel
32. Halle der Krieger — slug halle-der-krieger — ids: [45010300] — raw/STU: Halle der Krieger
33. Hauptkuppel — slug hauptkuppel — ids: [14010100, 14010300] — raw/STU: Hauptkuppel
34. Holo-Generator — slug holo-generator — ids: [42020100, 42020300] — raw/STU: Holo-Generator
35. Holo-Kern — slug holo-kern — ids: [43010100, 43010300] — raw/STU: Holo-Kern
36. Holo-Komplex — slug holo-komplex — ids: [44010100, 44010300] — raw/STU: Holo-Komplex
37. Holo-Simulator — slug holo-simulator — ids: [42010100, 42010300] — raw/STU: Holodeck
38. Hydrokultur-Gewächshaus — slug hydrokultur-gewachshaus — ids: [21010101] — raw/STU: Farm
39. Hypermaterie-Pumpe — slug hypermaterie-pumpe — ids: [61040300] — raw/STU: Deuterium-Pumpe
40. Hypermaterie-Reaktor — slug hypermaterie-reaktor — ids: [35010100, 35010300] — raw/STU: Warpkern
41. Hypermaterie-Synthesizer — slug hypermaterie-synthesizer — ids: [61020111, 61020300, 61020311] — raw/STU: Deuteriumsynthesizer
42. Hyperraum-Teleskop — slug hyperraum-teleskop — ids: [100060100, 100060300] — raw/STU: Subraumteleskop
43. Imperiale Militärakademie — slug imperiale-militarakademie — ids: [51010300] — raw/STU: Kriegerinstitut
44. Ionensegel-Kollektor — slug ionensegel-kollektor — ids: [31010131, 31010331] — raw/STU: Solarzellen
45. Jagdgründe — slug jagdgrunde — ids: [25010300, 25010301, 25110300, 25110301] — raw/STU: Jagdgründe
46. Jägerwerft — slug jagerwerft — ids: [85110100, 85110300] — raw/STU: Jägerwerft
47. Kampfsport-Arena — slug kampfsport-arena — ids: [24010300] — raw/STU: Mok'bara-Platz
48. Kampftrainingslager — slug kampftrainingslager — ids: [41010300] — raw/STU: Trainingsanlage
49. Klimakontroll-Bantha-Farm — slug klimakontroll-bantha-farm — ids: [23010300, 23010301, 23110300, 23110301] — raw/STU: Wetterkontroll-Targfarm
50. Klimakontroll-Farm — slug klimakontroll-farm — ids: [23010100, 23010101, 23110100, 23110101] — raw/STU: Wetterkontroll-Farm
51. Klimakontroll-Nerf-Zucht — slug klimakontroll-nerf-zucht — ids: [23020300, 23020302, 23120300, 23120302] — raw/STU: Wetterkontroll-Gaghfarm
52. Klimakontroll-Zuchtanlage — slug klimakontroll-zuchtanlage — ids: [23020100, 23020102, 23120100, 23120102] — raw/STU: Wetterkontroll-Algenfarm
53. Klimakontrollzentrum — slug klimakontrollzentrum — ids: [23030100, 23030300] — raw/STU: Wetterkontroll-Zentrum
54. Korvetten-Werft — slug korvetten-werft — ids: [85130100, 85130300] — raw/STU: Eskortschiffwerft
55. Kreuzer-Werft — slug kreuzer-werft — ids: [85150100, 85150300] — raw/STU: Kreuzerwerft
56. Kryo-Nerf-Zucht — slug kryo-nerf-zucht — ids: [21120300, 21120302] — raw/STU: Kälteresistente Gaghfarm
57. Kryo-Zuchtanlage — slug kryo-zuchtanlage — ids: [21120100, 21120102] — raw/STU: Kälteresistente Algenfarm
58. Kyber-Kristallmine — slug kyber-kristallmine — ids: [61210121, 61210300, 61210321] — raw/STU: Dilithium-Mine
59. Landeplattform — slug landeplattform — ids: [81110300] — raw/STU: Flugfeld
60. MC-Kreuzer-Werft — slug mc-kreuzer-werft — ids: [85140100, 85140300] — raw/STU: Zerstörerwerft
61. Modul-Forschungszentrum — slug modul-forschungszentrum — ids: [75210100, 75210300] — raw/STU: Forschungszentrum (Module)
62. Modul-FZ mit Hypermaterie-Labor — slug modul-fz-mit-hypermaterie-labor — ids: [75220100, 75220300] — raw/STU: Forschungszentrum (Module) mit Antimaterie-Labor
63. Modul-FZ mit Legierungslabor — slug modul-fz-mit-legierungslabor — ids: [75230100, 75230300] — raw/STU: Forschungszentrum (Module) mit Material-Labor
64. Nerf-Zucht — slug nerf-zucht — ids: [21020302] — raw/STU: Gaghfarm
65. Orbital-Fallstation — slug orbital-fallstation — ids: [21910100] — raw/STU: Orbitalskydiving-Station
66. Orbital-Habitat — slug orbital-habitat — ids: [11910100, 11910300] — raw/STU: Orbitalhabitat
67. Orbital-Solarkollektor — slug orbital-solarkollektor — ids: [31910100, 31910300] — raw/STU: Solarsatellit
68. Orbitale Ionenkanonen-Batterie — slug orbitale-ionenkanonen-batterie — ids: [100030100] — raw/STU: Orbitale Phaserphalanx
69. Orbitale Turbolaser-Batterie — slug orbitale-turbolaser-batterie — ids: [100030300] — raw/STU: Orbitales Disruptorgeschütz
70. Orbitales Forschungslabor — slug orbitales-forschungslabor — ids: [71910100, 71910300] — raw/STU: Orbitales Forschungslabor
71. Orbitales Torpedogeschütz — slug orbitales-torpedogeschutz — ids: [100040100, 100040300] — raw/STU: Orbitales Torpedogeschütz
72. Partikel-Beschleuniger — slug partikel-beschleuniger — ids: [62010100, 62010300] — raw/STU: Teilchenbeschleuniger
73. Phrik-Mine — slug phrik-mine — ids: [61110112, 61110300, 61110312] — raw/STU: Iridium-Mine
74. Phrik-Raffinerie — slug phrik-raffinerie — ids: [63100300] — raw/STU: Iridium-Raffinerie
75. Plasma-Extraktor — slug plasma-extraktor — ids: [86000100, 86000300] — raw/STU: Plasmaextraktor
76. Plasmakonverter — slug plasmakonverter — ids: [63010100, 63010300] — raw/STU: Plasmakonverter
77. Plasmareaktor — slug plasmareaktor — ids: [34010100, 34010300] — raw/STU: Plasmareaktor
78. Produktionshalle — slug produktionshalle — ids: [84800100, 84800300] — raw/STU: Fabrikationshalle
79. Protonentorpedo-Fabrik — slug protonentorpedo-fabrik — ids: [81990100, 81990300] — raw/STU: Torpedofabrik
80. Punkt-Abwehrsystem — slug punkt-abwehrsystem — ids: [100050100, 100050300] — raw/STU: Orbitales Torpedoabwehrsystem
81. Raumbahnhof — slug raumbahnhof — ids: [81120100, 81120300] — raw/STU: Raumbahnhof
82. Raumhafen — slug raumhafen — ids: [81130100, 81130300] — raw/STU: Raumhafen
83. Raumkonstrukt-Forschungszentrum — slug raumkonstrukt-forschungszentrum — ids: [75440100, 75440300] — raw/STU: Forschungszentrum (Raumkonstrukte)
84. Raumkonstrukt-FZ mit Hypermaterie-Labor — slug raumkonstrukt-fz-mit-hypermaterie-labor — ids: [75450100, 75450300] — raw/STU: Forschungszentrum (Raumkonstrukte) mit Antimaterie-Labor
85. Raumkonstrukt-FZ mit Legierungslabor — slug raumkonstrukt-fz-mit-legierungslabor — ids: [75460100, 75460300] — raw/STU: Forschungszentrum (Raumkonstrukte) mit Material-Labor
86. Reparaturstation — slug reparaturstation — ids: [85190100, 85190300] — raw/STU: Reparaturstation
87. Schildbatterie — slug schildbatterie — ids: [100020100, 100020300] — raw/STU: Schildbatterie
88. Schildmodulfabrik — slug schildmodulfabrik — ids: [82820100, 82820300] — raw/STU: Modulfabrik (Defensiv)
89. Schildmodulfertigung — slug schildmodulfertigung — ids: [81820100, 81820300] — raw/STU: Modulfertigung (Defensiv)
90. Schildmodulkomplex — slug schildmodulkomplex — ids: [83820100, 83820300] — raw/STU: Modulkomplex (Defensiv)
91. Siedlung — slug siedlung — ids: [13010100, 13010300] — raw/STU: Siedlung
92. Solarfokus — slug solarfokus — ids: [33020300] — raw/STU: Solarfokus
93. Solarspiegel — slug solarspiegel — ids: [33010131, 33010300, 33010331] — raw/STU: Solarspiegel
94. Sport-Arena — slug sport-arena — ids: [25020100, 25020102, 25120100, 25120102] — raw/STU: Racquetball Arena
95. Stadtkomplex — slug stadtkomplex — ids: [15010100, 15010300] — raw/STU: Stadt
96. Strömungsanker — slug stromungsanker — ids: [33030300] — raw/STU: Strömungsanker
97. Strömungsturbinen — slug stromungsturbinen — ids: [33040100, 33040132, 33040300, 33040332] — raw/STU: Strömungturbinen
98. Technologie-Komplex — slug technologie-komplex — ids: [85800100, 85800300] — raw/STU: Technologiecenter
99. Thermal-Extraktor — slug thermal-extraktor — ids: [36010100, 36010300] — raw/STU: Thermalextraktor
100. Thermalkraftwerk — slug thermalkraftwerk — ids: [36020100, 36020300] — raw/STU: Thermalkraftwerk
101. Tibanna-Extraktor — slug tibanna-extraktor — ids: [61030300] — raw/STU: Tibanna-Extraktor
102. Trainingshalle — slug trainingshalle — ids: [25030100] — raw/STU: Turnhalle
103. Transparistahl-Manufaktur — slug transparistahl-manufaktur — ids: [62020300] — raw/STU: Aluminiumwerk
104. Untergrund-Forschungszentrum — slug untergrund-forschungszentrum — ids: [75410100, 75410300] — raw/STU: Forschungszentrum (Untergrund)
105. Untergrund-FZ mit Hypermaterie-Labor — slug untergrund-fz-mit-hypermaterie-labor — ids: [75420100, 75420300] — raw/STU: Forschungszentrum (Untergrund) mit Antimaterie-Labor
106. Untergrund-FZ mit Legierungslabor — slug untergrund-fz-mit-legierungslabor — ids: [75430100, 75430300] — raw/STU: Forschungszentrum (Untergrund) mit Material-Labor
107. Untergrundlift (oben) — slug untergrundlift-oben — ids: [90100100, 90100300] — raw/STU: Untergrundlift (oben)
108. Untergrundlift (unten) — slug untergrundlift-unten — ids: [90200100, 90200300] — raw/STU: Untergrundlift (unten)
109. Versorgungskuppel — slug versorgungskuppel — ids: [12020100, 12020300] — raw/STU: Versorgungskuppel
110. Vibro-Klingen-Halle — slug vibro-klingen-halle — ids: [24020300] — raw/STU: Schwerthalle
111. Waffenmodulfabrik — slug waffenmodulfabrik — ids: [82810100, 82810300] — raw/STU: Modulfabrik (Offensiv)
112. Waffenmodulfertigung — slug waffenmodulfertigung — ids: [81810100, 81810300] — raw/STU: Modulfertigung (Offensiv)
113. Waffenmodulkomplex — slug waffenmodulkomplex — ids: [83810100, 83810300] — raw/STU: Modulkomplex (Offensiv)
114. Werftkomplex — slug werftkomplex — ids: [85010100, 85010300] — raw/STU: Werfthub
115. Wohnkomplex — slug wohnkomplex — ids: [11010103, 11010303] — raw/STU: Häuser
