# SWU Unified Asset Icons — Batch 3

Quota constraint:
- GPT2 Image quota is 5 requests per minute.
- Generate exactly one contact sheet for this batch if possible.
- Do not create variants.
- Do not issue parallel image-generation requests.
- Keep this batch to these missing build-menu icons only.

Generate one PNG contact sheet for missing icons currently shown in the colony build menu and early resource/effect UI. Use the same visual style as the SWU unified batches: dark sci-fi strategy UI asset icons, no text, no logos, no protected actor likenesses, centered subject, transparent-safe composition, consistent perspective and lighting.

Output requirements:
- One source sheet PNG named `batch-3-generated-sheet-1.png`.
- Layout: 5 columns x 3 rows, 13 used cells, enough padding for final transparent runtime crop.
- A JSON manifest named `generated-icons-batch-3.json`.
- Manifest fields per item: `kind`, `label`, `slug`, `contactSheet`, `cellIndex`, and `ids` for buildings or `id` for resources.
- Keep icons centered with enough padding.

Runtime crop target after import:
- trim icon subject
- fit max 240x240
- center on 256x256 transparent canvas

Building items from current Baumenü:

1. building — Rebel Baumaterialfabrik — slug `rebel-baumaterialfabrik` — ids: [61010100]
   - Rugged Rebel construction-material factory, modular frontier refinery/fabricator, blue-white utility lights.
2. building — Imperiale Baumaterialfabrik — slug `imperiale-baumaterialfabrik` — ids: [61010300]
   - Imperial construction-material factory, angular dark industrial complex, red status lights.
3. building — Rebel Farm — slug `rebel-farm` — ids: [21010100]
   - Rebel frontier hydroponic/agri domes, pragmatic settlement greenhouse.
4. building — Imperiale Targfarm — slug `imperiale-targfarm` — ids: [21010300]
   - Imperial livestock/agri compound, controlled pens and industrial feed modules; no creature likeness dependency.
5. building — Rebel Häuser — slug `rebel-hauser` — ids: [11010100]
   - Rebel residential habitat cluster, modular colony housing with warm windows.
6. building — Imperiale Häuser — slug `imperiale-hauser` — ids: [11010300]
   - Imperial residential block, austere angular habitat modules with red-white lighting.
7. building — Rebel Lager — slug `rebel-lager` — ids: [81210100]
   - Rebel storage depot, stacked cargo modules, antennas, practical logistics yard.
8. building — Imperiale Lager — slug `imperiale-lager` — ids: [81210300]
   - Imperial supply depot, orderly cargo bays, dark metal, red status lighting.
9. building — Rebel Solarzellen — slug `rebel-solarzellen` — ids: [31010100]
   - Rebel solar collector field / compact power array, blue energy glints.
10. building — Imperiale Solarzellen — slug `imperiale-solarzellen` — ids: [31010300]
   - Imperial solar collector array, symmetrical dark panels, red control pylons.

Resource/effect items from current early build menu:

11. resource — Baumaterial — slug `baumaterial` — id: 2
   - Construction materials crate/ingots/panels, industrial sci-fi supply stack.
12. resource — Wohnhäuser — slug `wohnhauser` — id: 1101
   - Housing capacity/effect icon, compact habitation module or settlement block.
13. resource — Lebensstandard — slug `lebensstandard` — id: 1300
   - Civilian welfare/quality-of-life effect icon, polished colony amenities module, no text.
