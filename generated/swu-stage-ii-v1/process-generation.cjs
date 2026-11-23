const fs = require('fs'),
  path = require('path'),
  cp = require('child_process');
const slug = process.argv[2],
  dir = path.join(__dirname, slug),
  mp = path.join(dir, 'manifest.json'),
  m = JSON.parse(fs.readFileSync(mp)),
  r = JSON.parse(fs.readFileSync(path.join(dir, 'generation.json')));
if (!r.images?.length) throw Error('No generated image');
const source = path.join(dir, path.basename(r.images[0].file_path));
if (!fs.existsSync(source)) throw Error('No source file');
const facts = cp
  .execFileSync('magick', [source, '-format', '%[opaque]', 'info:'], {
    encoding: 'utf8',
  })
  .trim();
const target = path.join(dir, 'source-alpha.png');
if (facts === 'True')
  cp.execFileSync('magick', [
    source,
    '-alpha',
    'set',
    '-fuzz',
    '12%',
    '-fill',
    'none',
    '-draw',
    'alpha 0,0 floodfill',
    ...(m.alphaSeeds ?? []).flatMap(([x, y]) => [
      '-draw',
      `alpha ${x},${y} floodfill`,
    ]),
    '-define',
    'png:color-type=6',
    target,
  ]);
else fs.copyFileSync(source, target);
// A surface landing pad needs a solid deck. The gateway occasionally paints
// checkerboard inside pad rims; replace only the reviewed interior ellipses.
if (m.surfacePadOverrides?.length) {
  const args = [target];
  for (const p of m.surfacePadOverrides)
    args.push(
      '-fill',
      '#68717a',
      '-stroke',
      'none',
      '-draw',
      `ellipse ${p.cx},${p.cy} ${p.rx},${p.ry} 0,360`,
      '-fill',
      'none',
      '-stroke',
      '#a0a8af',
      '-strokewidth',
      '2',
      '-draw',
      `ellipse ${p.cx},${p.cy} ${p.rx - 10},${p.ry - 7} 0,360`,
      '-stroke',
      '#49525c',
      '-strokewidth',
      '1',
      '-draw',
      `line ${p.cx - p.rx + 15},${p.cy} ${p.cx + p.rx - 15},${p.cy}`,
    );
  cp.execFileSync('magick', [...args, target]);
}
m.originalSource = path.basename(source);
m.sourceSheet = 'source-alpha.png';
m.generation = {
  tool: 'generate_image',
  modelRequested: r.model,
  quality: r.requested.quality,
  costEstimateUsd: r.cost_usd_estimated,
  alphaMethod:
    facts === 'True'
      ? 'connected background flood-fill (12% fuzz), original opaque source preserved; gateway applied.background was null'
      : 'preserved generated alpha',
};
fs.writeFileSync(mp, JSON.stringify(m, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'prompt.txt'), r.prompt + '\n');
cp.execFileSync('python3', [path.join(__dirname, 'pipeline.py'), slug], {
  stdio: 'inherit',
});
cp.execFileSync(
  process.execPath,
  [path.join(__dirname, 'check-artifacts.cjs'), slug],
  { stdio: 'inherit' },
);
