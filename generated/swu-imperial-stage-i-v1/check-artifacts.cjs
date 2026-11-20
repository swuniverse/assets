const fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  cp = require('child_process');
const root = path.resolve(__dirname, '../../..'),
  slug = process.argv[2],
  dir = path.join(__dirname, slug);
const m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const bs = yaml.load(
  fs.readFileSync(path.join(root, m.buildingSource), 'utf8'),
).buildings;
const techs = yaml.load(
  fs.readFileSync(path.join(root, m.researchSource), 'utf8'),
).technologies;
const cats = yaml.load(
  fs.readFileSync(path.join(root, m.terrainSource), 'utf8'),
).fieldBuildCategories;
const upgrades = yaml.load(
  fs.readFileSync(path.join(root, m.upgradeSource), 'utf8'),
).upgrades;
const ships = yaml.load(
  fs.readFileSync(
    path.join(root, 'game-data/data/ship-building/ship-classes.yaml'),
    'utf8',
  ),
).shipClasses;
if (
  !m.sourceSheet ||
  !fs.existsSync(path.join(dir, m.sourceSheet)) ||
  !fs.existsSync(path.join(dir, 'prompt.txt'))
)
  throw Error('Missing source/prompt');
for (const i of m.items) {
  for (const id of i.ids) {
    const b = bs.find((b) => b.id === id);
    if (!b || b.name !== i.label || b.researchId !== i.researchId)
      throw Error('Building mismatch ' + id);
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
  if (
    i.placement === 'colonization' &&
    !ships.some(
      (s) =>
        s.isColonizer &&
        s.colonizationBuildingId === i.ids[0] &&
        s.factionKey === 'GALACTIC_EMPIRE',
    )
  )
    throw Error('Colonization mismatch');
  if (
    i.placement === 'faction-start-building' &&
    !/startBuildingId: 82010300/.test(
      fs.readFileSync(
        path.join(root, 'apps/backend/src/modules/faction/faction.service.ts'),
        'utf8',
      ),
    )
  )
    throw Error('Start building mismatch');
  for (const p of i.previews) {
    if (!fs.existsSync(path.join(root, 'assets', p.file)))
      throw Error('Missing terrain');
    if (!['colonization', 'faction-start-building'].includes(i.placement)) {
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
  const file = path.join(root, 'assets/buildings/generated', i.file),
    png = fs.readFileSync(file),
    master = fs.readFileSync(path.join(dir, i.master));
  if (
    png.readUInt32BE(16) !== 256 ||
    png.readUInt32BE(20) !== 256 ||
    png[25] !== 6 ||
    master.readUInt32BE(16) !== 512 ||
    master.readUInt32BE(20) !== 512
  )
    throw Error('Raster mismatch ' + i.file);
  const a = cp
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
  if (a[0] !== 0 || a[1] < 0.99 || a[2] < 0.05 || a[2] > 0.95)
    throw Error('Alpha mismatch ' + i.file);
}
const result = {
  batch: slug,
  families: m.items.length,
  ids: m.items.flatMap((i) => i.ids).length,
  data: true,
  research: true,
  terrain: true,
  specialPlacement: true,
  rgba256: true,
  masters512: true,
  alpha: true,
};
fs.writeFileSync(
  path.join(dir, 'artifact-verification.json'),
  JSON.stringify(result, null, 2) + '\n',
);
console.log(JSON.stringify(result));
