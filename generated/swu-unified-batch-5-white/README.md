# SWU Building Icons — Batch 5 White Background

Generated: 2026-07-27 via Open Design / gpt-image-2.

These contact sheets replace the original dark-background Batch 5 sheets for import.
They intentionally use a pure white (`#ffffff`) background so the import step can
remove only connected white background and avoid clipping dark building parts.

## Output

| File | Families | Grid |
| --- | --- | --- |
| `contact-sheet-1.png` | 1–25 | 5×5 |
| `contact-sheet-2.png` | 26–50 | 5×5 |
| `contact-sheet-3.png` | 51–75 | 5×5 |
| `contact-sheet-4.png` | 76–100 | 5×5 |
| `contact-sheet-5.png` | 101–115 | 5×4, 15 used cells |

## Import notes

- Crop sheets 1–4 as 5×5 cells.
- Crop sheet 5 as 5×4 cells.
- Do not use dark-background flood-fill.
- Remove connected white background from cell borders, then trim, fit max 240×240,
  and center on a transparent 256×256 canvas.
