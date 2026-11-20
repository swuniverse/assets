const fs = require('fs'),
  path = require('path');
const root = path.resolve(__dirname, '../../..'),
  plan = JSON.parse(fs.readFileSync(path.join(__dirname, 'plan.json'), 'utf8'));
const folders = [
  'swu-rebel-starter-map-v1',
  'swu-rebel-production-chain-map-v1',
  'swu-rebel-expansion-map-v1',
];
let done = folders.flatMap(
  (d) =>
    JSON.parse(
      fs.readFileSync(
        path.join(root, 'assets/generated', d, 'manifest.json'),
        'utf8',
      ),
    ).items,
);
for (const b of plan.batches.filter((b) => b.status !== 'pending'))
  done.push(
    ...JSON.parse(fs.readFileSync(path.join(root, b.manifest), 'utf8')).items,
  );
const completed = new Set(done.map((i) => i.ids[0])),
  remaining = plan.batches
    .flatMap(
      (b) =>
        JSON.parse(fs.readFileSync(path.join(root, b.manifest), 'utf8')).items,
    )
    .filter((i) => !completed.has(i.ids[0]));
const open = remaining.filter((i) => i.ids[0] !== 73010100),
  transition = remaining.filter((i) => i.ids[0] === 73010100);
let text =
  '# Rebellen-Gebäudeassets bis Forschungsstufe I\n\nStand 2026-11-20. Umfang: Grundgebäude, materialfinanzierte Frühforschung und FP-Stufe-I-Gebäude; Forschungszentrum II als Übergang eingeschlossen. Geländevarianten zusammengefasst.\n\n**' +
  done.length +
  ' Familien erstellt und angebunden (' +
  done.flatMap((i) => i.ids).length +
  ' IDs); ' +
  open.length +
  ' Stufe-I-Familien offen, ' +
  transition.length +
  ' Übergang offen.**\n\n' +
  (plan.batches.every((b) => b.status === 'complete')
    ? 'Abschlussprüfung vollständig bestanden.'
    : 'Die sieben Restserien werden einzeln direkt geprüft und committet; gemeinsame abschließende Browser-/Vollständigkeitsprüfung noch ausstehend.') +
  '\n\n## Erstellt und angebunden\n\n| Gebäude | Haupt-ID | Varianten |\n| --- | --- | --- |\n';
for (const i of done)
  text += '| ' + i.label + ' | ' + i.ids[0] + ' | ' + i.ids.join(', ') + ' |\n';
text +=
  '\n## Noch offen\n\n| Gebäude | Haupt-ID | Forschung |\n| --- | --- | --- |\n';
for (const i of remaining)
  text += '| ' + i.label + ' | ' + i.ids[0] + ' | ' + i.researchId + ' |\n';
if (!remaining.length) text += '| Keine | — | — |\n';
text +=
  '\nQuellen und Serien: assets/generated/swu-rebel-stage-i-completion/plan.json; die drei vorherigen Manifestdateien; game-data Gebäude/Forschung. Alle verbleibenden Serien sind vom Nutzer zur autonomen Bearbeitung freigegeben.\n';
fs.writeFileSync(
  path.join(root, '.scratch/rebel-starter-map-assets/status-stufe-i.md'),
  text,
);
console.log(done.length + ' built; ' + remaining.length + ' remaining');
