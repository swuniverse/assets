const fs = require('fs'),
  path = require('path'),
  cp = require('child_process'),
  yaml = require('js-yaml'),
  ts = require('typescript'),
  vm = require('vm');
const root = path.resolve(__dirname, '../../..'),
  slug = process.argv[2],
  plan = JSON.parse(fs.readFileSync(path.join(__dirname, 'plan.json'), 'utf8'));
if (!plan.batches.some((b) => b.slug === slug)) throw Error('Unknown batch');
const dir = path.join(__dirname, slug),
  m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const bs = yaml.load(
    fs.readFileSync(path.join(root, m.buildingSource), 'utf8'),
  ).buildings,
  techs = yaml.load(
    fs.readFileSync(path.join(root, m.researchSource), 'utf8'),
  ).technologies,
  cats = yaml.load(
    fs.readFileSync(path.join(root, m.terrainSource), 'utf8'),
  ).fieldBuildCategories;
const upgrades = yaml.load(
  fs.readFileSync(path.join(root, m.upgradeSource), 'utf8'),
).upgrades;
const code = fs.readFileSync(
    path.join(root, 'apps/frontend/src/lib/assets.ts'),
    'utf8',
  ),
  old = cp.execFileSync(
    'git',
    ['show', 'HEAD:apps/frontend/src/lib/assets.ts'],
    { cwd: root, encoding: 'utf8' },
  );
function table(s) {
  const block = s.match(
    /const GENERATED_BUILDING_FILES: Record<number, string> = \{([\s\S]*?)\n\};/,
  )[1];
  return new Map(
    [...block.matchAll(/\s(\d+): '([^']+)'/g)].map((x) => [+x[1], x[2]]),
  );
}
const current = table(code),
  previous = table(old),
  selected = new Set(m.items.flatMap((i) => i.ids));
for (const i of m.items) {
  for (const id of i.ids) {
    const b = bs.find((b) => b.id === id);
    if (
      !b ||
      b.name !== i.label ||
      b.researchId !== i.researchId ||
      current.get(id) !== i.file
    )
      throw Error('Data/mapping mismatch ' + id);
  }
  const t = techs.find((t) => t.id === i.researchId);
  if (
    !t ||
    t.effort !== i.effort ||
    t.commodityId !== i.researchCommodityId ||
    JSON.stringify(t.dependencies) !== JSON.stringify(i.requires)
  )
    throw Error('Research mismatch ' + i.researchId);
  const b = bs.find((b) => b.id === i.permissionBuildingId);
  if (
    i.placement === 'upgrade' &&
    !upgrades.some(
      (u) =>
        u.fromBuildingId === i.permissionBuildingId &&
        u.toBuildingId === i.ids[0] &&
        u.researchId === i.researchId,
    )
  )
    throw Error('Upgrade mismatch');
  if (i.placement === 'colonization') {
    const ships = yaml.load(
      fs.readFileSync(
        path.join(root, 'game-data/data/ship-building/ship-classes.yaml'),
        'utf8',
      ),
    ).shipClasses;
    if (
      !ships.some(
        (s) =>
          s.isColonizer &&
          s.colonizationBuildingId === i.ids[0] &&
          s.factionKey === 'REBEL_ALLIANCE',
      )
    )
      throw Error('Colonization mismatch');
  }
  for (const p of i.previews) {
    if (!fs.existsSync(path.join(root, 'assets', p.file)))
      throw Error('Missing terrain ' + p.code);
    if (i.placement !== 'colonization') {
      const allowed =
        typeof p.code === 'number'
          ? b.allowedFieldTypes.includes(p.code)
          : cats
              .filter((c) => c.tiles.includes(p.code))
              .some((c) => b.allowedFieldTypes.includes(c.id));
      if (!allowed)
        throw Error('Disallowed terrain ' + i.ids[0] + ' ' + p.code);
    }
  }
  const png = fs.readFileSync(
    path.join(root, 'assets/buildings/generated', i.file),
  );
  if (
    png.readUInt32BE(16) !== 256 ||
    png.readUInt32BE(20) !== 256 ||
    png[25] !== 6
  )
    throw Error('Wrong PNG format ' + i.file);
}
for (const id of new Set([...current.keys(), ...previous.keys()]))
  if (!selected.has(id) && current.get(id) !== previous.get(id))
    throw Error('Other ID changed ' + id);
const ast = ts.createSourceFile(
    'assets.ts',
    code,
    ts.ScriptTarget.Latest,
    true,
  ),
  needed = new Set(['ASSET_BASE', 'GENERATED_BUILDING_FILES']),
  parts = [];
for (const s of ast.statements) {
  if (
    ts.isVariableStatement(s) &&
    s.declarationList.declarations.some((d) => needed.has(d.name.getText(ast)))
  )
    parts.push(s.getText(ast));
  if (ts.isFunctionDeclaration(s) && s.name?.text === 'buildingImage')
    parts.push(s.getText(ast));
}
const context = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(
    parts
      .join('\n')
      .replace('import.meta.env', '({VITE_ASSET_BASE_URL:undefined})'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText,
  context,
);
for (const i of m.items)
  for (const id of i.ids)
    if (
      context.exports.buildingImage(id) !==
      '/assets/buildings/generated/' + i.file
    )
      throw Error('Resolver mismatch ' + id);
(async () => {
  let bytes = 0;
  await Promise.all(
    m.items.map(async (i) => {
      const expected = fs.readFileSync(
          path.join(root, 'assets/buildings/generated', i.file),
        ),
        response = await fetch(
          'http://localhost:5173' + context.exports.buildingImage(i.ids[0]),
        ),
        data = Buffer.from(await response.arrayBuffer());
      if (
        !response.ok ||
        response.headers.get('content-type') !== 'image/png' ||
        !expected.equals(data)
      )
        throw Error('HTTP mismatch ' + i.file);
      bytes += expected.length;
    }),
  );
  const result = {
    batch: slug,
    families: m.items.length,
    ids: selected.size,
    bytes,
    data: true,
    terrain: true,
    resolver: true,
    http: true,
    unselectedMappingsUnchanged: true,
  };
  fs.writeFileSync(
    path.join(dir, 'verification.json'),
    JSON.stringify(result, null, 2) + '\n',
  );
  console.log(JSON.stringify(result));
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
