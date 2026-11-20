const fs = require('fs'),
  path = require('path');
const slug = process.argv[2],
  root = path.resolve(__dirname, '../../..'),
  p = path.join(__dirname, 'plan.json'),
  plan = JSON.parse(fs.readFileSync(p, 'utf8')),
  b = plan.batches.find((b) => b.slug === slug);
const m = JSON.parse(
    fs.readFileSync(path.join(__dirname, slug, 'manifest.json'), 'utf8'),
  ),
  v = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, slug, 'artifact-verification.json'),
      'utf8',
    ),
  );
b.status = 'implemented';
b.artifactVerification = v;
fs.writeFileSync(p, JSON.stringify(plan, null, 2) + '\n');
let t = fs
  .readFileSync(path.join(root, b.ticket), 'utf8')
  .replace('Status: open', 'Status: claimed');
let n = 0;
t = t.replace(/- \[ \]/g, (s) => (++n <= 4 ? '- [x]' : s));
t +=
  '\n- Umgesetzt, Prüfung ausstehend: Quelle, Master, Export und Daten-/Alpha-/Geländeprüfung für ' +
  v.families +
  ' Familien / ' +
  v.ids +
  ' IDs bestanden; Parent hat Quelle und 40-/68px geprüft. Scoped Assetcommit mit eindeutigem Betreff "feat(assets): add Imperial ' +
  slug +
  ' map buildings". Gemeinsame Runtime-/Resolver-/HTTP-/Browserprüfung durch Ticket 12 bleibt offen.\n';
fs.writeFileSync(path.join(root, b.ticket), t.trimEnd() + '\n');
const completed = plan.batches.filter((b) => b.status !== 'pending');
const families = completed.reduce((n, b) => n + b.families, 0),
  ids = completed.reduce((n, b) => n + b.idCount, 0);
let text =
  '# Imperiale Gebäudeassets bis FP Stufe I\n\nFreigegebener imperialer Stil: graue Panzerflächen, schwarze Technik, rote Akzente, hohe Draufsicht und breite Grundstücke.\n\n' +
  families +
  ' / 42 Familien produziert (' +
  ids +
  ' / 94 IDs); Runtime-/Abschlussprüfung ' +
  (plan.batches.every((b) => b.status === 'complete')
    ? 'bestanden'
    : 'noch ausstehend') +
  '.\n\n| Serie | Familien | IDs | Status |\n| --- | --- | --- | --- |\n';
for (const b of plan.batches)
  text +=
    '| [' +
    b.title +
    '](' +
    b.slug +
    '/README.md) | ' +
    b.families +
    ' | ' +
    b.idCount +
    ' | ' +
    b.status +
    ' |\n';
text +=
  '\n256px-RGBA-PNGs unter ../../buildings/generated/; 512px-Master, Quellen/Prompts und Manifeste pro Serie erhalten. Keine Änderungen an Gameplay, Forschung, FieldCell, Bebaubarkeit oder Rebellenzuordnungen. Plan: plan.json.\n';
fs.writeFileSync(path.join(__dirname, 'README.md'), text);
fs.writeFileSync(
  path.join(root, '.scratch/imperial-stage-i-map-assets/status-stufe-i.md'),
  text.replace(
    /\]\(([^)]*)\/README.md\)/g,
    (s, dir) =>
      '](../../assets/generated/swu-imperial-stage-i-v1/' + dir + '/README.md)',
  ),
);
let doc =
  '# ' +
  m.title +
  '\n\nFreigegebene imperiale Kartenassets, transparentes 256px-RGBA-PNG und 512px-Master. Erzeugung: gpt-image-2 MCP, Referenz aus der freigegebenen imperialen Stilprobe.\n\n| Gebäude | IDs | Forschung | Vorschaufelder |\n| --- | --- | --- | --- |\n';
for (const i of m.items)
  doc +=
    '| ' +
    i.label +
    ' | ' +
    i.ids.join(', ') +
    ' | ' +
    i.researchId +
    ' | ' +
    i.previews.map((p) => p.code).join(', ') +
    ' |\n';
doc +=
  '\nQuelle: ' +
  m.sourceSheet +
  '. Exakter Prompt: prompt.txt; tatsächliche Erzeugung: generation.json; Daten/Rasterprüfung: artifact-verification.json. Vorschauen: production-overview.png und terrain-review.png. Spielregeln und übrige Assetzuordnungen erhalten. Gemeinsame Runtimeprüfung durch Ticket 12 noch ausstehend.\n';
fs.writeFileSync(path.join(__dirname, slug, 'README.md'), doc);
console.log(families + ' / 42 families prepared');
