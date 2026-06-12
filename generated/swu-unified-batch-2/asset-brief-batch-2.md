# SWU Unified Asset Icons — Batch 2

Quota constraint:
- GPT2 Image quota is 5 requests per minute.
- Generate exactly one contact sheet for this batch if possible.
- Do not create variants.
- Do not issue parallel image-generation requests.
- Keep this batch to the 4 requested icons only.

Generate one PNG contact sheet for the following missing UI icons. Use the same visual style as the existing SWU unified batch: dark sci-fi strategy UI asset icons, no text, no logos, no protected actor likenesses, centered subject, transparent-safe composition, consistent perspective and lighting.

Output requirements:
- One source sheet PNG named `batch-2-generated-sheet-1.png`.
- Layout: 4 icons in a 2x2 sheet or 5x2-compatible sheet; each icon must be suitable for final 256x256 transparent runtime crop.
- A JSON manifest named `generated-icons-batch-2.json`.
- Manifest fields per item: `kind`, `label`, `slug`, `contactSheet`, `cellIndex`, and `ids` for buildings or `id` for resources when known.
- Keep icons centered with enough padding.

Runtime crop target after import:
- trim icon subject
- fit max 240x240
- center on 256x256 transparent canvas

Items:

1. building — Rebel Koloniezentrale — slug `rebel-koloniezentrale` — ids: [82010100]
   - Starter colony center for Rebel Alliance.
   - Visual: compact rebel frontier command hub, rugged modular base, blue-white tactical lights, hangar/antenna details, practical alliance aesthetic.

2. building — Imperiale Koloniezentrale — slug `imperiale-koloniezentrale` — ids: [82010300]
   - Starter colony center for Galactic Empire.
   - Visual: angular imperial command complex, dark metal panels, red status lights, symmetrical authoritarian silhouette, no official insignia.

3. resource — Doonium — slug `doonium` — id: null
   - Missing resource icon requested by user; no matching commodity id exists in current YAML.
   - Visual: heavy rare industrial metal ingot/ore, dark silver-blue alloy, dense metallic mass, sci-fi material sample.

4. resource — Hypermaterie — slug `hypermaterie` — id: null
   - Missing resource icon requested by user; no matching commodity id exists in current YAML.
   - Visual: exotic high-energy matter capsule/crystal, luminous cyan-violet energy core, contained in sci-fi canister or field ring.
