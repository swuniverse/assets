const fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  cp = require('child_process');
const root = path.resolve(__dirname, '../../..'),
  base = 'assets/generated/swu-imperial-stage-i-v1',
  out = path.join(root, base);
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
if (fs.existsSync(path.join(out, 'plan.json')))
  throw Error('Already initialized; use the existing manifests');
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
const cats = yaml.load(
  fs.readFileSync(
    path.join(root, 'game-data/data/buildings/swu-field-build-categories.yaml'),
    'utf8',
  ),
).fieldBuildCategories;
const rebels = read(
  'assets/generated/swu-rebel-stage-i-completion/full-verification.json',
).items;
const sample = read('output/imagegen/swu-imperial-style-v1/manifest.json');
const groups = [
  ['approved', 'Freigegebene Grundgebäude', [82010300, 11010300, 61010300]],
  [
    'starter',
    'Grundversorgung und Gas',
    [21010300, 31010300, 81210300, 61030300],
  ],
  [
    'production',
    'Frühe Produktionsketten',
    [21020300, 31020300, 62020300, 61110300],
  ],
  [
    'industry',
    'Metalle, Treibstoff und Raumfahrt',
    [63100300, 63110300, 61020300, 81110300],
  ],
  [
    'civic',
    'Zivile Versorgung und Verwaltung',
    [22020300, 22010300, 51010300, 81120300],
  ],
  [
    'settlement',
    'Kuppeln, Kryozucht und Forschung',
    [12020300, 12010300, 21120300, 72010300],
  ],
  ['energy', 'Erneuerbare Energie', [33010300, 33020300, 33030300, 33040300]],
  ['resources', 'Rohstoffgewinnung', [62010300, 61210300, 61040300, 61170300]],
  [
    'orbital',
    'Orbitale Energie und Werften',
    [31910300, 85010300, 85110300, 85120300],
  ],
  ['modules', 'Module und Torpedos', [81810300, 81820300, 81830300, 81990300]],
  [
    'transition',
    'Außenposten, Aurodium und Forschungsübergang',
    [81010300, 63170300, 73010300],
  ],
];
fs.mkdirSync(out, { recursive: true });
const issueDir = path.join(root, '.scratch/imperial-stage-i-map-assets/issues');
fs.mkdirSync(issueDir, { recursive: true });
const plan = {
  date: '2026-11-20',
  scope:
    'All Imperial building families through material/FP-I research plus research center II transition',
  faction: 'GALACTIC_EMPIRE',
  gameDataCommit: '8cda53525946df8fb8e998194acd1a06737630bc',
  mappingBaseline: cp
    .execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' })
    .trim(),
  families: 42,
  idCount: 94,
  batches: [],
};
for (const [index, [slug, title, ids]] of groups.entries()) {
  const dir = path.join(out, slug);
  fs.mkdirSync(dir, { recursive: true });
  const items = ids.map((id, cell) => {
    const b = bs.find((x) => x.id === id),
      r = rebels.find((i) => i.ids[0] + 200 === id),
      t = techs.find((x) => x.id === b.researchId);
    if (!b || !r || !t) throw Error('No canonical family ' + id);
    const nameSlug = b.name
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const finalSlug =
      id === 73010300
        ? 'forschungszentrum-ii'
        : id === 72010300
          ? 'forschungszentrum-i'
          : nameSlug;
    const placement =
      id === 82010300
        ? 'faction-start-building'
        : id === 81010300
          ? 'colonization'
          : id === 73010300
            ? 'upgrade'
            : 'normal';
    const permissionBuildingId = placement === 'upgrade' ? 72010300 : id,
      pb = bs.find((x) => x.id === permissionBuildingId);
    let previews =
      r.previews ??
      (
        r.previewTerrainCodes ?? [
          r.terrain === 'water' ? 'A410' : 'C119',
          'C640',
          'D819',
        ]
      ).map((code) => ({
        code,
        label:
          {
            C119: 'Bauland',
            C640: 'Fels',
            D819: 'Wüste',
            A410: 'Wasser',
            A430: 'Flaches Wasser',
            A530: 'Eis',
            OO10: 'Orbit',
          }[code] ?? String(code),
        file: 'generated/SWUfields/t' + code + '.png',
      }));
    const allowed = (p) =>
      placement === 'colonization' ||
      placement === 'faction-start-building' ||
      (typeof p.code === 'number'
        ? pb.allowedFieldTypes.includes(p.code)
        : cats
            .filter((c) => c.tiles.includes(p.code))
            .some((c) => pb.allowedFieldTypes.includes(c.id)));
    previews = previews.filter(
      (p) => fs.existsSync(path.join(root, 'assets', p.file)) && allowed(p),
    );
    if (!previews.length) throw Error('No permitted preview ' + id);
    const approved = sample.items.find((i) => i.ids[0] === id);
    return {
      ids: bs
        .filter((x) => x.name === b.name && x.researchId === b.researchId)
        .map((x) => x.id),
      label: b.name,
      slug: finalSlug,
      cell,
      researchId: b.researchId,
      requires: t.dependencies,
      effort: t.effort,
      researchCommodityId: t.commodityId,
      placement,
      permissionBuildingId,
      previews,
      file: approved?.file ?? id + '-imperial-' + finalSlug + '-map-v1.png',
      master: approved?.master ?? 'masters/' + id + '-' + finalSlug + '.png',
      production: b.production,
    };
  });
  const manifest = {
    version: 1,
    faction: 'GALACTIC_EMPIRE',
    batch: slug,
    title,
    gameDataCommit: plan.gameDataCommit,
    buildingSource: 'game-data/data/buildings/stu-buildings.yaml',
    researchSource: 'game-data/data/research/imperials.yaml',
    terrainSource: 'game-data/data/buildings/swu-field-build-categories.yaml',
    upgradeSource: 'game-data/data/buildings/stu-building-upgrades.yaml',
    sourceSheet: slug === 'approved' ? sample.sourceSheet : null,
    grid: ids.length === 4 ? { columns: 2, rows: 2 } : { columns: 3, rows: 1 },
    canvasSize: 256,
    masterCanvasSize: 512,
    subjectMaxSize: 244,
    trimAlphaThresholdPercent: 1,
    items,
  };
  fs.writeFileSync(
    path.join(dir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  );
  const ticket =
    '.scratch/imperial-stage-i-map-assets/issues/' +
    String(index + 1).padStart(2, '0') +
    '-' +
    slug +
    '.md';
  const b = {
    slug,
    title,
    ticket,
    manifest: base + '/' + slug + '/manifest.json',
    families: items.length,
    idCount: items.flatMap((i) => i.ids).length,
    status: 'pending',
  };
  plan.batches.push(b);
  fs.writeFileSync(
    path.join(root, ticket),
    '# ' +
      title +
      ': imperiale Gebäudeassets\n\nStatus: open\nLabel: ready-for-agent\nType: task\n\n## Auftrag\n\nNutzer hat den grauen, kantigen imperialen Stil freigegeben und die gesamte Stufe-I-Serie beauftragt. Spezifikation: ../spec.md. Manifest: ' +
      b.manifest +
      '.\n\n' +
      items
        .map((i) => '- ' + i.label + ': ' + i.ids.join(', ') + ' → ' + i.file)
        .join('\n') +
      '\n\n## Ownership\n\nParent besitzt Rastergrafiken, Export, Manifest, Dokumentation und scoped Commits. Code-Anbindung ausschließlich durch Integrationsticket 12. Änderungen anderer erhalten. Keine Änderungen an Gameplay, Forschung, Bebaubarkeit, FieldCell oder vorhandenen Rebellenbildern.\n\n## Akzeptanzkriterien\n\n- [ ] Transparente 256px-RGBA-PNGs, 512px-Master und Quelle/Prompt erhalten.\n- [ ] IDs, Namen, Forschung und Vorschaufelder gegen game-data geprüft.\n- [ ] Quelle und 40-/68px-Geländemontagen visuell geprüft.\n- [ ] Lokaler scoped Assetcommit und Format-/Whitespaceprüfung.\n- [ ] Gemeinsame Zuordnungs-/Resolver-/HTTP-/Browserprüfung und Abschluss dokumentiert.\n\n## Comments\n\n- Parent im verfügbaren Sitzungsmodell; Wechsel auf GPT-6.1 Sol nicht möglich. Begrenzte Code-Anbindung über ticket-coder GPT-6 Luna high, ein Coding Agent zur Zeit.\n',
  );
}
if (
  plan.batches.reduce((n, b) => n + b.families, 0) !== 42 ||
  plan.batches.reduce((n, b) => n + b.idCount, 0) !== 94
)
  throw Error('Wrong scope');
fs.writeFileSync(
  path.join(out, 'plan.json'),
  JSON.stringify(plan, null, 2) + '\n',
);
fs.writeFileSync(path.join(out, '.gitignore'), '**/review/\n');
for (const name of ['pipeline.py', 'set-source.cjs'])
  fs.copyFileSync(
    path.join(root, 'assets/generated/swu-rebel-stage-i-completion', name),
    path.join(out, name),
  );
for (const file of [sample.sourceSheet, 'prompt.txt', 'generation.json'])
  fs.copyFileSync(
    path.join(root, 'output/imagegen/swu-imperial-style-v1', file),
    path.join(out, 'approved', file),
  );
fs.writeFileSync(
  path.join(root, '.scratch/imperial-stage-i-map-assets/spec.md'),
  '# Imperiale Gebäudeassets bis FP Stufe I\n\nNutzerfreigabe: alle 42 imperialen Gebäudefamilien / 94 IDs bis materialfinanzierter bzw. FP-I-Forschung, inklusive Forschungszentrum II. Die drei Muster sind ausdrücklich freigegeben. Eigene imperiale Formen, kühles Grau, schwarze Technik und rote Akzente, gleiche hohe Draufsicht und breite Grundstücke wie die Rebellenserie. PNG 256x256 RGBA, Master 512px, Quellen/Prompts erhalten. Exakte Serien: assets/generated/swu-imperial-stage-i-v1/plan.json.\n\nSpielregeln unverändert; Bantha-/Nerf-Farmen entsprechend Datenfunktion, bestehende Wasser-/Kryo-Feldfreigaben respektieren. Kommandozentrale als Fraktionsstart, Außenposten als Kolonisierungsgebäude, Forschungszentrum II als Upgrade. Orbitassets ohne Gelände/Sternhintergrund oder feste Schiffe. Keine Altbilder überschreiben.\n\nParent erzeugt und prüft Assets, scoped Commits im Assetsubmodul. Integrationsticket 12 besitzt ausschließlich assets.ts; alle übrigen Zuordnungen einschließlich Rebellen erhalten. Ein Coding Agent zur Zeit, keine weitere Delegation. Gemeinsame finale Daten-/Raster-/Resolver-/HTTP-/Browserprüfung mit echter FieldCell. Keine breiten Tests/Builds für Raster und statische Tabelle. Tickets bleiben bis finaler Prüfung claimed.\n',
);
fs.writeFileSync(
  path.join(
    root,
    '.scratch/imperial-stage-i-map-assets/issues/12-runtime-integration.md',
  ),
  '# Imperiale Stufe-I-Assets anbinden\n\nStatus: open\nLabel: ready-for-agent\nType: task\n\n## Auftrag\n\nNach Export und Parent-Sichtprüfung aller 11 Manifeste aus assets/generated/swu-imperial-stage-i-v1/plan.json exakt deren 94 IDs in GENERATED_BUILDING_FILES auf die Manifest-Dateinamen umstellen. Bestehende Tabelle und buildingImage-Fallback erhalten. Spezifikation: ../spec.md.\n\n## Ownership\n\nCoding Agent besitzt ausschließlich apps/frontend/src/lib/assets.ts. Nicht allein im Codebestand: Änderungen anderer erhalten. Alle anderen IDs, insbesondere sämtliche Rebellen/shared Zuordnungen, erhalten. Keine Gameplay-, API-, FieldCell-, Ticket-, Asset- oder game-data-Edits. Keine Abstraktionen und kein Commit durch Coding Agent.\n\n## Akzeptanzkriterien\n\n- [ ] Exakt 94 Manifest-IDs angebunden und übrige Zuordnungen unverändert.\n- [ ] Gezielter Prettier-Check und git diff --check bestanden.\n- [ ] Parent prüft tatsächlichen Resolver und bytegleiche HTTP-Auslieferung aller 42 Bilder.\n- [ ] Gemeinsame Browserfixture mit FieldCell, numerischen Feldern, Orbit und Zuständen bestanden.\n- [ ] Scoped Corecommit, Dokumentation und Tickets geschlossen.\n\n## Comments\n\n- Parent plant/reviewt im verfügbaren Sitzungsmodell; aktive Umschaltung auf GPT-6.1 Sol nicht verfügbar. Integration delegiert an ticket-coder GPT-6 Luna high.\n',
);
console.log(
  'Prepared 42 families / 94 IDs in 11 batches; approved source preserved.',
);
