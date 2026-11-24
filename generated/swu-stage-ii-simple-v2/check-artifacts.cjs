const fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  cp = require('child_process');
const root = path.resolve(__dirname, '../../..'),
  slug = process.argv[2],
  dir = path.join(__dirname, slug);
const m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json')));
const load = (p) => yaml.load(fs.readFileSync(path.join(root, p), 'utf8'));
const bs = load(m.buildingSource).buildings,
  ts = load(m.researchSource).technologies,
  cats = load(m.terrainSource).fieldBuildCategories,
  upgrades = load(m.upgradeSource).upgrades;
if (
  !m.sourceSheet ||
  !fs.existsSync(path.join(dir, m.sourceSheet)) ||
  !fs.existsSync(path.join(dir, 'prompt.txt')) ||
  !fs.existsSync(path.join(dir, 'generation.json'))
)
  throw Error('Missing generation evidence');
for (const i of m.items) {
  const canonical = bs.find((b) => b.id === i.ids[0]);
  const expected = bs
    .filter(
      (b) => b.name === canonical.name && b.researchId === canonical.researchId,
    )
    .map((b) => b.id);
  if (JSON.stringify(expected) !== JSON.stringify(i.ids))
    throw Error('Incomplete family ' + i.ids[0]);
  for (const id of i.ids) {
    const b = bs.find((b) => b.id === id);
    if (!b || b.name !== i.label || b.researchId !== i.researchId)
      throw Error('Building mismatch ' + id);
  }
  const t = ts.find((t) => t.id === i.researchId);
  if (
    !t ||
    t.commodityId !== 1702 ||
    t.commodityId !== i.researchCommodityId ||
    t.effort !== i.effort ||
    JSON.stringify(t.dependencies) !== JSON.stringify(i.requires)
  )
    throw Error('Research mismatch');
  const pb = bs.find((b) => b.id === i.permissionBuildingId);
  if (i.placement === 'upgrade-chain') {
    const queue = [pb.id],
      seen = new Set(queue);
    while (queue.length) {
      const from = queue.shift();
      for (const u of upgrades.filter((u) => u.fromBuildingId === from))
        if (!seen.has(u.toBuildingId)) {
          seen.add(u.toBuildingId);
          queue.push(u.toBuildingId);
        }
    }
    if (!seen.has(i.ids[0])) throw Error('No actual upgrade chain');
  }
  if (i.placement === 'unassigned-fields' && canonical.allowedFieldTypes.length)
    throw Error('Incorrect unassigned marker');
  for (const p of i.previews) {
    if (!fs.existsSync(path.join(root, 'assets', p.file)))
      throw Error('Missing terrain');
    if (i.placement === 'unassigned-fields') {
      if (!p.label.includes('keine Feldfreigabe'))
        throw Error('Unmarked composition preview');
      continue;
    }
    const allowed =
      typeof p.code === 'number'
        ? pb.allowedFieldTypes.includes(p.code)
        : cats.some(
            (c) =>
              c.tiles.includes(p.code) && pb.allowedFieldTypes.includes(c.id),
          );
    if (!allowed) throw Error('Disallowed terrain ' + i.ids[0]);
  }
  const png = fs.readFileSync(
      path.join(root, 'assets/buildings/generated', i.file),
    ),
    master = fs.readFileSync(path.join(dir, i.master));
  if (i.approvedSample) {
    const faction = i.ids[0] === 13010100 ? 'rebel' : 'imperial';
    const approvedDir = path.join(__dirname, 'style', faction);
    if (
      !png.equals(fs.readFileSync(path.join(approvedDir, 'preview-256.png'))) ||
      !master.equals(fs.readFileSync(path.join(approvedDir, 'master-512.png')))
    )
      throw Error('Approved sample changed ' + i.ids[0]);
  }
  if (
    png.readUInt32BE(16) !== 256 ||
    png.readUInt32BE(20) !== 256 ||
    png[25] !== 6 ||
    master.readUInt32BE(16) !== 512 ||
    master.readUInt32BE(20) !== 512
  )
    throw Error('Wrong PNG dimensions/type');
  const alpha = cp
    .execFileSync(
      'magick',
      [
        path.join(root, 'assets/buildings/generated', i.file),
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
  if (alpha[0] !== 0 || alpha[1] < 0.99 || alpha[2] < 0.05 || alpha[2] > 0.95)
    throw Error('Wrong alpha ' + i.file);
}
const result = {
  batch: slug,
  families: m.items.length,
  ids: m.items.flatMap((i) => i.ids).length,
  data: true,
  research: true,
  terrain: true,
  unassignedFields: m.items
    .filter((i) => i.placement === 'unassigned-fields')
    .map((i) => i.ids[0]),
  rgba256: true,
  masters512: true,
  alpha: true,
};
fs.writeFileSync(
  path.join(dir, 'artifact-verification.json'),
  JSON.stringify(result, null, 2) + '\n',
);
console.log(JSON.stringify(result));
