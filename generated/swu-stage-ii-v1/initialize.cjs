const fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  cp = require('child_process');
const root = path.resolve(__dirname, '../../..'),
  base = 'assets/generated/swu-stage-ii-v1';
if (fs.existsSync(path.join(__dirname, 'plan.json')))
  throw Error('Already initialized');
const load = (p) => yaml.load(fs.readFileSync(path.join(root, p), 'utf8'));
const bs = load('game-data/data/buildings/stu-buildings.yaml').buildings;
const cats = load(
  'game-data/data/buildings/swu-field-build-categories.yaml',
).fieldBuildCategories;
const groups = [
  [
    'civic',
    'Siedlung und Klimaversorgung',
    [13010100, 23030100, 23010100, 23020100],
  ],
  [
    'energy',
    'Fortgeschrittene Energie',
    [32010100, 63010100, 36010100, 36020100],
  ],
  [
    'logistics',
    'Logistik, Produktion und Forschung',
    [85900100, 81130100, 84800100, 74010100],
  ],
  [
    'orbital',
    'Orbitale Infrastruktur',
    [71910100, 21910100, 11910100, 85130100],
  ],
  ['modules', 'Modulfabriken', [82810100, 82820100, 82830100]],
  [
    'holo',
    'Ausbildung, Holografie und Plasma',
    [41010100, 42010100, 42020100, 86000100],
  ],
  [
    'mines',
    'Spezialisierte Erzminen',
    [16010100, 16020100, 16030100, 16040100, 16050100],
  ],
  [
    'refineries',
    'Spezialisierte Raffinerien',
    [26010100, 26020100, 26030100, 26040100, 26050100],
  ],
  [
    'components',
    'Spezialkomponenten',
    [37010100, 37020100, 37030100, 37040100, 37050100],
  ],
];
const plan = {
  date: '2026-11-23',
  scope:
    'All building families whose research costs FP II (commodity 1702), including research center III transition',
  gameDataCommit: cp
    .execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: path.join(root, 'game-data'),
      encoding: 'utf8',
    })
    .trim(),
  mappingBaseline: cp
    .execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' })
    .trim(),
  families: 76,
  idCount: 138,
  batches: [],
};
const fmt = (x) => JSON.stringify(x, null, 2) + '\n';
for (const faction of ['rebels', 'imperials']) {
  const ts = load('game-data/data/research/' + faction + '.yaml').technologies;
  for (const [group, title, rids] of groups) {
    const slug = faction + '-' + group,
      dir = path.join(__dirname, slug);
    fs.mkdirSync(dir, { recursive: true });
    const items = rids.map((rid, cell) => {
      const id =
        faction === 'rebels'
          ? rid
          : rid < 40000000 &&
              (String(rid).startsWith('16') ||
                String(rid).startsWith('26') ||
                String(rid).startsWith('37'))
            ? rid + 3
            : rid + 200;
      const b = bs.find((b) => b.id === id),
        t = ts.find((t) => t.id === b?.researchId);
      if (!b || !t || t.commodityId !== 1702) throw Error('Wrong tier ' + id);
      const key = b.name + '|' + b.researchId;
      const ids = bs
        .filter((x) => x.name + '|' + x.researchId === key)
        .map((x) => x.id);
      let permissionBuildingId = id,
        placement = 'normal';
      if (rid === 74010100) {
        permissionBuildingId = 72010100 + (faction === 'imperials' ? 200 : 0);
        placement = 'upgrade-chain';
      }
      const pb = bs.find((x) => x.id === permissionBuildingId);
      if (!pb.allowedFieldTypes.length) placement = 'unassigned-fields';
      const choices = [
        { code: 'OO10', label: 'Orbit' },
        { code: 'C119', label: 'Bauland' },
        { code: 'C640', label: 'Fels' },
        { code: 'D819', label: 'Wüste' },
        ...pb.allowedFieldTypes
          .filter((x) => typeof x === 'number')
          .map((code) => ({ code, label: String(code) })),
      ];
      const previews = choices
        .filter((p) =>
          typeof p.code === 'number'
            ? pb.allowedFieldTypes.includes(p.code)
            : cats.some(
                (c) =>
                  c.tiles.includes(p.code) &&
                  pb.allowedFieldTypes.includes(c.id),
              ),
        )
        .map((p) => ({
          ...p,
          file:
            typeof p.code === 'number'
              ? 'generated/fields/' + p.code + '.png'
              : 'generated/SWUfields/t' + p.code + '.png',
        }))
        .filter((p) => fs.existsSync(path.join(root, 'assets', p.file)))
        .slice(0, 3);
      if (!previews.length && placement === 'unassigned-fields')
        previews.push({
          code: 'C119',
          label: 'Kompositionsvorschau (keine Feldfreigabe)',
          file: 'generated/SWUfields/tC119.png',
        });
      if (!previews.length) throw Error('No terrain ' + id);
      const nameSlug = b.name
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return {
        ids,
        label: b.name,
        displayName:
          group === 'mines' || group === 'refineries' ? t.name.trim() : b.name,
        slug: nameSlug,
        cell,
        researchId: b.researchId,
        requires: t.dependencies,
        effort: t.effort,
        researchCommodityId: t.commodityId,
        placement,
        permissionBuildingId,
        previews,
        file: id + '-' + faction + '-' + nameSlug + '-map-v1.png',
        master: 'masters/' + id + '-' + nameSlug + '.png',
        production: b.production,
      };
    });
    const ticket =
      '.scratch/stage-ii-map-assets/issues/' +
      String(plan.batches.length + 1).padStart(2, '0') +
      '-' +
      slug +
      '.md';
    const m = {
      version: 1,
      faction: faction === 'rebels' ? 'REBEL_ALLIANCE' : 'GALACTIC_EMPIRE',
      batch: slug,
      title:
        (faction === 'rebels' ? 'Rebellenallianz' : 'Galaktisches Imperium') +
        ' · ' +
        title,
      gameDataCommit: plan.gameDataCommit,
      buildingSource: 'game-data/data/buildings/stu-buildings.yaml',
      researchSource: 'game-data/data/research/' + faction + '.yaml',
      terrainSource: 'game-data/data/buildings/swu-field-build-categories.yaml',
      upgradeSource: 'game-data/data/buildings/stu-building-upgrades.yaml',
      sourceSheet: null,
      grid:
        items.length === 3
          ? { columns: 3, rows: 1 }
          : items.length === 5
            ? { columns: 3, rows: 2 }
            : { columns: 2, rows: 2 },
      canvasSize: 256,
      masterCanvasSize: 512,
      subjectMaxSize: 244,
      trimAlphaThresholdPercent: 1,
      items,
    };
    fs.writeFileSync(path.join(dir, 'manifest.json'), fmt(m));
    plan.batches.push({
      slug,
      title: m.title,
      ticket,
      manifest: base + '/' + slug + '/manifest.json',
      families: items.length,
      idCount: items.flatMap((i) => i.ids).length,
      status: 'pending',
    });
    fs.writeFileSync(
      path.join(root, ticket),
      '# ' +
        m.title +
        '\n\nStatus: claimed\nLabel: ready-for-agent\nType: task\n\n## Auftrag\n\nSiehe ../spec.md und ' +
        base +
        '/' +
        slug +
        '/manifest.json.\n\n## Akzeptanzkriterien\n\n- [ ] Neue transparente 256px-RGBA-PNGs, 512px-Master, Quelle, exakter Prompt und Metadaten erhalten.\n- [ ] Gebäude, Varianten, FP-II-Forschung und Vorschaufelder unabhängig geprüft; fehlende Feldfreigaben ausdrücklich dokumentiert.\n- [ ] Quelle sowie 40/68px-Geländemontagen visuell geprüft.\n- [ ] Scoped lokaler Assetcommit und Diffprüfung.\n- [ ] Separate gemeinsame Resolver-/HTTP-/dev-browser-Prüfung abgeschlossen.\n\n## Comments\n\n- Parent produziert und reviewt im verfügbaren Sitzungsmodell; aktiver Wechsel auf GPT-6.1 Sol nicht verfügbar. Integration später begrenzt an ticket-coder GPT-6 Luna high.\n',
    );
  }
}
if (
  plan.batches.reduce((n, b) => n + b.families, 0) !== 76 ||
  plan.batches.reduce((n, b) => n + b.idCount, 0) !== 138
)
  throw Error('Incomplete scope');
fs.writeFileSync(path.join(__dirname, 'plan.json'), fmt(plan));
fs.writeFileSync(path.join(__dirname, '.gitignore'), '**/review/\n');
for (const name of ['pipeline.py', 'set-source.cjs'])
  fs.copyFileSync(
    path.join(root, 'assets/generated/swu-imperial-stage-i-v1', name),
    path.join(__dirname, name),
  );
fs.writeFileSync(
  path.join(root, '.scratch/stage-ii-map-assets/spec.md'),
  '# Gebäudeassets Forschungsstufe II\n\nNutzerauftrag: fehlende Bilder für Rebellenallianz und Galaktisches Imperium fortsetzen. Vollständiger Umfang nach research commodityId 1702: 38 Familien / 69 IDs je Fraktion, 76 Bilder / 138 IDs insgesamt, inklusive Forschungszentrum III als Übergang. Forschungszentrum II bereits vorhanden. Sämtliche Spezialisierungszweige eingeschlossen, obwohl EXCLUDE-Forschungen nicht gleichzeitig verfügbar sind.\n\nStil aus freigegebener Stufe I: hohe orthografische Draufsicht, breite niedrige Gebäude; Rebellen verwittertes cremefarbenes Duracrete, Schiefermetall und Rost; Imperium kantiges graues Panzerstahl, schwarze Technik, wenig Rot. 256px-RGBA-PNG, 512px-Master. GPT-image-2-MCP mit bestehenden Bildern als Stilreferenz, Quellen/Prompts/Metadaten bewahren. Orbit ohne Gelände, Sterne oder Schiffe; Werftdocks innen transparent. Spezialminen/Raffinerien visuell nach aktueller Forschung/Materialfunktion gestalten; importierte Gebäudenamen unverändert lassen.\n\nKeine Änderungen an Forschung, Gameplay, Bebaubarkeit oder FieldCell. Bei leeren allowedFieldTypes sind Geländemontagen ausdrücklich nur Kompositionsvorschauen, keine Behauptung einer erlaubten Platzierung. Forschung III berücksichtigt dokumentierte Upgrade-Kette von Forschung I über II.\n\nParent besitzt Assets, Hilfsskripte, Tickets und Dokumentation. Ein Coding Agent ausschließlich für assets.ts; Änderungen anderer erhalten. Scoped Assetcommit vor Corecommit. Separate abschließende Daten-, Alpha-, Resolver-, HTTP- und dev-browser-Prüfung mit echter FieldCell bei 40/68px, Varianten und Bau-/Schadens-/Inaktivzuständen.\n',
);
fs.writeFileSync(
  path.join(
    root,
    '.scratch/stage-ii-map-assets/issues/19-runtime-integration.md',
  ),
  '# Forschungsstufe-II-Assets anbinden\n\nStatus: open\nLabel: ready-for-agent\nType: task\n\n## Auftrag\n\nNach vollständiger Produktion genau 138 IDs aus assets/generated/swu-stage-ii-v1/plan.json auf die Dateinamen ihrer Manifeste in GENERATED_BUILDING_FILES setzen. Siehe ../spec.md.\n\n## Ownership\n\nCoding Agent besitzt ausschließlich apps/frontend/src/lib/assets.ts. Nicht allein im Codebestand; Änderungen anderer erhalten. Alle anderen IDs und Resolvercode unverändert. Keine Tickets, Assets, game-data, Gameplay oder FieldCell ändern, kein Commit.\n\n## Akzeptanzkriterien\n\n- [ ] Genau 138 IDs nach Manifest angebunden, alle übrigen Zuordnungen und Resolver unverändert.\n- [ ] Prettier und git diff --check bestanden.\n- [ ] Parent hat separate Daten-/Resolver-/HTTP-/dev-browser-Prüfung durchgeführt.\n- [ ] Scoped Corecommit und Abschluss dokumentiert.\n\n## Comments\n',
);
console.log('Initialized 76 families / 138 IDs in 18 batches');
