# SWU Building Icons — Batch 5

Generated: 2026-07-27  
Model: gpt-image-2 (via Open Design media dispatcher)  
Style: Dark sci-fi strategy UI, isometric/3D, rim lighting, holographic blue/amber accents

## Output

| File | Families | Grid |
|------|----------|------|
| `batch-5-sheet-1.png` | 1–25 (Allianz-Schule → Gebäude-Forschungszentrum) | 5×5 |
| `batch-5-sheet-2.png` | 26–50 (Gebäude-FZ Hypermaterie → Klimakontroll-Farm) | 5×5 |
| `batch-5-sheet-3.png` | 51–75 (Klimakontroll-Nerf-Zucht → Plasma-Extraktor) | 5×5 |
| `batch-5-sheet-4.png` | 76–100 (Plasmakonverter → Thermalkraftwerk) | 5×5 |
| `batch-5-sheet-5.png` | 101–115 (Tibanna-Extraktor → Wohnkomplex) | 5×4, 15 used cells |

## Manifest

`generated-icons-batch-5.json` — full mapping of all 115 families with:

- `cellIndex` (0-based position in sheet grid, row-major)
- `contactSheet` (which PNG)
- `ids` (all building IDs sharing this icon)
- `filename` (intended final filename: `<first-id>-<slug>.png`)
- `visualPrompt` (what was generated)

## Next Steps

1. Review sheets for visual quality and distinct silhouettes
2. Slice individual icons from sheets using corrected grids: sheets 1–4 are 5×5; sheet 5 is 5×4.
3. Remove dark sheet background during import: 12px cell inset, border flood-fill transparency at 5% fuzz, trim, fit max 240×240, center on 256×256 transparent canvas.
4. Export to `assets/buildings/generated/` using filenames from manifest.
5. Regenerate any icons that need refinement.

## Coverage

All 115 missing families covered. No items skipped.
