const fs = require('fs'),
  path = require('path'),
  cp = require('child_process');
const slug = process.argv[2],
  dir = path.join(__dirname, slug),
  mp = path.join(dir, 'manifest.json'),
  m = JSON.parse(fs.readFileSync(mp)),
  r = JSON.parse(fs.readFileSync(path.join(dir, 'generation.json')));
if (!r.images?.length) throw Error('No generated image');
const source = path.join(dir, path.basename(r.images[0].file_path)),
  target = path.join(dir, 'source-alpha.png');
const opaque =
  cp
    .execFileSync('magick', [source, '-format', '%[opaque]', 'info:'], {
      encoding: 'utf8',
    })
    .trim() === 'True';
if (opaque) {
  const color = cp
    .execFileSync(
      'magick',
      [
        source,
        '-format',
        '%[fx:p{0,0}.r] %[fx:p{0,0}.g] %[fx:p{0,0}.b]',
        'info:',
      ],
      { encoding: 'utf8' },
    )
    .trim()
    .split(' ')
    .map(Number);
  if (color[0] < 0.75 || color[1] > 0.2 || color[2] < 0.75)
    throw Error('Expected magenta backing, got ' + color.join(','));
  const key = cp
    .execFileSync('magick', [source, '-format', '%[pixel:p{0,0}]', 'info:'], {
      encoding: 'utf8',
    })
    .trim();
  cp.execFileSync('magick', [
    source,
    '-alpha',
    'set',
    '-fuzz',
    '12%',
    '-transparent',
    key,
    '-define',
    'png:color-type=6',
    target,
  ]);
} else fs.copyFileSync(source, target);
cp.execFileSync('python3', [
  path.join(__dirname, 'despill.py'),
  target,
  source,
  mp,
]);
// Locate complete isolated compounds rather than trusting exact model grid seams.
// This avoids copying a neighbouring structure when it crosses a nominal cell.
const dims = cp
  .execFileSync('magick', [target, '-format', '%w %h', 'info:'], {
    encoding: 'utf8',
  })
  .trim()
  .split(' ')
  .map(Number);
const raw = cp.execFileSync(
  'magick',
  [
    target,
    '-alpha',
    'extract',
    '-threshold',
    '1%',
    '-define',
    'connected-components:verbose=true',
    '-connected-components',
    '8',
    'null:',
  ],
  { encoding: 'utf8' },
);
const components = [
  ...raw.matchAll(
    /^\s*(\d+): (\d+)x(\d+)\+(\d+)\+(\d+) ([\d.]+),([\d.]+) (\d+) srgb\(255,255,255\)/gm,
  ),
]
  .filter((x) => +x[8] > 500)
  .map((x) => ({
    id: +x[1],
    area: +x[8],
    x: +x[4],
    y: +x[5],
    w: +x[2],
    h: +x[3],
    cell:
      Math.min(m.grid.rows - 1, Math.floor((+x[7] / dims[1]) * m.grid.rows)) *
        m.grid.columns +
      Math.min(
        m.grid.columns - 1,
        Math.floor((+x[6] / dims[0]) * m.grid.columns),
      ),
  }));
// Two source sheets contain thin white separator lines joining all canvas edges.
// They are not compounds: exclude only a sparse component spanning the full
// canvas, then retain the overlap guard for every actual building component.
const separators = components.filter(
  (o) =>
    o.x === 0 &&
    o.y === 0 &&
    o.w === dims[0] &&
    o.h === dims[1] &&
    o.area / (o.w * o.h) < 0.03,
);
const objects = components.filter((o) => !separators.includes(o));
const generated = m.items.filter((i) => !i.approvedSample),
  expected = new Set(generated.map((i) => i.cell));
if (objects.some((o) => !expected.has(o.cell)))
  throw Error('Unexpected compound in empty grid cell');
for (const i of generated) {
  const parts = objects.filter((o) => o.cell === i.cell);
  if (!parts.length) throw Error('Missing compound ' + i.label);
  const x = Math.min(...parts.map((p) => p.x)),
    y = Math.min(...parts.map((p) => p.y)),
    x1 = Math.max(...parts.map((p) => p.x + p.w)),
    y1 = Math.max(...parts.map((p) => p.y + p.h));
  i.cropBox = [x, y, x1 - x, y1 - y];
  if (
    objects.some(
      (o) =>
        o.cell !== i.cell &&
        o.x < x1 &&
        o.x + o.w > x &&
        o.y < y1 &&
        o.y + o.h > y,
    )
  )
    throw Error('Overlapping compound crops ' + i.label);
}
fs.writeFileSync(
  path.join(dir, 'grid-verification.json'),
  JSON.stringify(
    {
      dimensions: dims,
      objects,
      ignoredCanvasSeparators: separators,
      crops: generated.map((i) => ({
        id: i.ids[0],
        cell: i.cell,
        cropBox: i.cropBox,
      })),
      noAdjacentPixels: true,
    },
    null,
    2,
  ) + '\n',
);
m.originalSource = path.basename(source);
m.sourceSheet = 'source-alpha.png';
m.generation = {
  tool: 'edit_image',
  modelRequested: r.model,
  quality: r.requested.quality,
  costEstimateUsd: r.cost_usd_estimated,
  alphaMethod: opaque
    ? '12% sampled-magenta chroma-key extraction, including enclosed orbital openings; original source preserved'
    : 'preserved generated alpha',
};
fs.writeFileSync(mp, JSON.stringify(m, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'prompt.txt'), r.prompt.trimEnd() + '\n');
cp.execFileSync('python3', [path.join(__dirname, 'pipeline.py'), slug], {
  stdio: 'inherit',
});
cp.execFileSync(
  process.execPath,
  [path.join(__dirname, 'check-artifacts.cjs'), slug],
  { stdio: 'inherit' },
);
