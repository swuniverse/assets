const fs = require('fs'),
  path = require('path'),
  cp = require('child_process'),
  yaml = require('js-yaml'),
  ts = require('typescript'),
  vm = require('vm');
const root = path.resolve(__dirname, '../../..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const plan = read('assets/generated/swu-imperial-stage-i-v1/plan.json');
const sources = plan.batches.map((b) => b.manifest);
for (const b of plan.batches)
  cp.execFileSync(
    process.execPath,
    [path.join(__dirname, 'check-artifacts.cjs'), b.slug],
    { cwd: root },
  );
const items = sources.flatMap((p) =>
  read(p).items.map((i) => ({ ...i, manifest: p })),
);
const bs = yaml.load(
  fs.readFileSync(
    path.join(root, 'game-data/data/buildings/stu-buildings.yaml'),
    'utf8',
  ),
).buildings;
const techs = yaml.load(
  fs.readFileSync(
    path.join(root, 'game-data/data/research/imperials.yaml'),
    'utf8',
  ),
).technologies;
const early = new Set(
  techs
    .filter((t) => Number.isFinite(t.commodityId) && t.commodityId < 1702)
    .map((t) => t.id),
);
const expectedIds = new Set(
  bs.filter((b) => early.has(b.researchId)).map((b) => b.id),
);
const ids = items.flatMap((i) => i.ids),
  selected = new Set(ids);
if (
  items.length !== 42 ||
  ids.length !== 94 ||
  selected.size !== 94 ||
  expectedIds.size !== 94 ||
  [...expectedIds].some((id) => !selected.has(id))
)
  throw Error('Incomplete scope');
const source = fs.readFileSync(
  path.join(root, 'apps/frontend/src/lib/assets.ts'),
  'utf8',
);
const pattern =
  /const GENERATED_BUILDING_FILES: Record<number, string> = \{([\s\S]*?)\n\};/;
const table = (s) =>
  new Map(
    [...s.match(pattern)[1].matchAll(/\s(\d+): '([^']+)'/g)].map((x) => [
      +x[1],
      x[2],
    ]),
  );
const current = table(source),
  baselineRef = plan.mappingBaseline;
const baseline = cp.execFileSync(
  'git',
  ['show', baselineRef + ':apps/frontend/src/lib/assets.ts'],
  { cwd: root, encoding: 'utf8' },
);
const previous = table(baseline);
for (const id of new Set([...current.keys(), ...previous.keys()]))
  if (!selected.has(id) && current.get(id) !== previous.get(id))
    throw Error('Unselected mapping changed ' + id);
if (source.replace(pattern, '') !== baseline.replace(pattern, ''))
  throw Error('Resolver or other asset code changed');
const ast = ts.createSourceFile(
    'assets.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
  ),
  parts = [];
for (const s of ast.statements) {
  if (
    ts.isVariableStatement(s) &&
    s.declarationList.declarations.some((d) =>
      ['ASSET_BASE', 'GENERATED_BUILDING_FILES'].includes(d.name.getText(ast)),
    )
  )
    parts.push(s.getText(ast));
  if (ts.isFunctionDeclaration(s) && s.name?.text === 'buildingImage')
    parts.push(s.getText(ast));
}
const ctx = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(
    parts
      .join('\n')
      .replace('import.meta.env', '({VITE_ASSET_BASE_URL:undefined})'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText,
  ctx,
);
const families = new Set();
for (const i of items) {
  const canonical = bs.find((b) => b.id === i.ids[0]);
  if (!canonical || canonical.name !== i.label)
    throw Error('Family mismatch ' + i.label);
  const key = canonical.name + '|' + canonical.researchId;
  if (families.has(key)) throw Error('Duplicate family ' + key);
  families.add(key);
  for (const id of i.ids) {
    const b = bs.find((b) => b.id === id);
    if (
      !b ||
      b.name !== i.label ||
      b.researchId !== i.researchId ||
      current.get(id) !== i.file ||
      ctx.exports.buildingImage(id) !== '/assets/buildings/generated/' + i.file
    )
      throw Error('ID mismatch ' + id);
  }
  const file = path.join(root, 'assets/buildings/generated', i.file),
    png = fs.readFileSync(file);
  if (
    png.readUInt32BE(16) !== 256 ||
    png.readUInt32BE(20) !== 256 ||
    png[25] !== 6
  )
    throw Error('PNG format ' + i.file);
  const master = fs.readFileSync(
    path.join(root, path.dirname(i.manifest), i.master),
  );
  if (master.readUInt32BE(16) !== 512 || master.readUInt32BE(20) !== 512)
    throw Error('Master size ' + i.file);
  const stats = cp
    .execFileSync(
      'magick',
      [
        file,
        '-alpha',
        'extract',
        '-format',
        '%[fx:minima] %[fx:maxima] %[fx:mean]',
        'info:',
      ],
      { encoding: 'utf8' },
    )
    .trim()
    .split(' ')
    .map(Number);
  // Earlier approved exports use 254/255 for near-opaque structural pixels.
  if (stats[0] !== 0 || stats[1] < 0.99 || stats[2] <= 0.05 || stats[2] >= 0.95)
    throw Error('Invalid transparency ' + i.file);
  i.alphaMean = stats[2];
  i.previewCode =
    i.previews?.[0]?.code ??
    i.previewTerrainCodes?.[0] ??
    (i.terrain === 'water' ? 'A410' : 'C119');
}
(async () => {
  let bytes = 0;
  await Promise.all(
    items.map(async (i) => {
      const local = fs.readFileSync(
        path.join(root, 'assets/buildings/generated', i.file),
      );
      const response = await fetch(
        'http://localhost:5173' + ctx.exports.buildingImage(i.ids[0]),
      );
      if (
        !response.ok ||
        response.headers.get('content-type') !== 'image/png' ||
        !local.equals(Buffer.from(await response.arrayBuffer()))
      )
        throw Error('HTTP mismatch ' + i.file);
      bytes += local.length;
    }),
  );
  const result = {
    date: '2026-11-20',
    gameDataCommit: plan.gameDataCommit,
    mappingBaseline: baselineRef,
    families: items.length,
    tierIFamilies: 41,
    transitionFamilies: 1,
    ids: selected.size,
    bytes,
    sourceGroundedScope: true,
    noMissingIds: true,
    resolver: true,
    http: true,
    alpha: true,
    masters512: true,
    unselectedMappingsUnchanged: true,
    resolverCodeUnchanged: true,
    items,
  };
  fs.writeFileSync(
    path.join(__dirname, 'full-verification.json'),
    JSON.stringify(result, null, 2) + '\n',
  );
  console.log(JSON.stringify({ ...result, items: undefined }));
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
