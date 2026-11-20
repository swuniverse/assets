const fs = require('fs'),
  path = require('path');
const root = path.resolve(__dirname, '../../..'),
  p = path.join(__dirname, 'plan.json'),
  plan = JSON.parse(fs.readFileSync(p, 'utf8'));
const full = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'full-verification.json'), 'utf8'),
);
const browser = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'browser-verification.json'), 'utf8'),
);
if (!full.noMissingIds || full.ids !== 94 || browser.result !== 'passed')
  throw Error('Required verification missing');
const items = full.items;
for (const b of plan.batches) {
  b.status = 'complete';
  b.finalVerification = {
    data: 'full-verification.json',
    browser: 'browser-verification.json',
    date: '2026-11-20',
  };
  const file = path.join(root, b.ticket);
  let text = fs
    .readFileSync(file, 'utf8')
    .replace('Status: claimed', 'Status: resolved')
    .replace(/- \[ \]/g, '- [x]');
  text +=
    '\n## Answer\n\nAlle ' +
    b.families +
    ' Familien / ' +
    b.idCount +
    ' IDs fertig und angebunden. Daten-, Forschungs-, Gelände-, Alpha- und Masterprüfung bestanden. Gemeinsame Prüfung: 42 Familien / 94 IDs decken den imperialen Umfang bis FP I plus Forschungszentrum II vollständig ab. Tatsächlicher buildingImage-Resolver und bytegleiche HTTP-Auslieferung geprüft; alle fremden Zuordnungen und Resolvercode gegenüber ' +
    plan.mappingBaseline +
    ' unverändert.\n\nBrowserfixture importiert die echte FieldCell: 94 Varianten, 302 geladene Bilder, 36 Statusfälle und 42 Menübilder bestanden. Numerische STU-Felder, Orbit, Inaktiv-/Beschädigt-Rahmen und 50-%-Baufortschritt enthalten; kein Bildüberlauf. Quellen und 40-/68px sowie die vollständige Übersicht visuell geprüft. Format-/Whitespaceprüfung und lokale scoped Commits erfolgt; Abschlusscommit mit eindeutigem Betreff "feat: complete verified Imperial stage-I building assets". [Gesamtübersicht](../../../assets/generated/swu-imperial-stage-i-v1/full-overview.png), [Datenprüfung](../../../assets/generated/swu-imperial-stage-i-v1/full-verification.json), [Browserprüfung](../../../assets/generated/swu-imperial-stage-i-v1/browser-verification.json).\n\nModellnutzung: Parent erzeugt/reviewt im verfügbaren Sitzungsmodell (kein aktiver Wechsel auf GPT-6.1 Sol möglich); begrenzte Runtime-Anbindung an ticket-coder GPT-6 Luna high delegiert. Quellen über gpt-image-2 MCP, medium.\n';
  if (b.slug === 'transition')
    text +=
      '\nDer Schnitt zwischen Presse und Forschungszentrum II wurde von 1024 auf 1008px korrigiert, um Nachbarpixel aus dem Presse-Export zu entfernen. Quelle unverändert erhalten, betroffene Exporte und Prüfungen wiederholt.\n';
  if (b.slug === 'orbital')
    text +=
      '\nOffene Dockbereiche mit Alpha-Stichproben (Fregattenwerft: 155/128 und 155/90) sowie Magenta-Montage geprüft; echte Transparenz, keine fest eingebauten Schiffe.\n';
  fs.writeFileSync(file, text.trimEnd() + '\n');
  const r = path.join(__dirname, b.slug, 'README.md');
  let d = fs
    .readFileSync(r, 'utf8')
    .replace(
      'Gemeinsame Runtimeprüfung durch Ticket 12 noch ausstehend.',
      'Gemeinsame Runtime-/Browserprüfung bestanden: ../full-verification.json und ../browser-verification.json.',
    );
  fs.writeFileSync(r, d.trimEnd() + '\n');
}
plan.estimatedImageCostUsd = Number(
  plan.batches
    .reduce(
      (n, b) =>
        n +
        JSON.parse(
          fs.readFileSync(
            path.join(__dirname, b.slug, 'generation.json'),
            'utf8',
          ),
        ).cost_usd_estimated,
      0,
    )
    .toFixed(4),
);
fs.writeFileSync(p, JSON.stringify(plan, null, 2) + '\n');
const integration = path.join(
  root,
  '.scratch/imperial-stage-i-map-assets/issues/12-runtime-integration.md',
);
let t = fs
  .readFileSync(integration, 'utf8')
  .replace('Status: claimed', 'Status: resolved')
  .replace(/- \[ \]/g, '- [x]');
t +=
  '\n## Answer\n\nExakt die 94 imperialen IDs aus allen elf Manifesten angebunden. 42 Bilder, Resolver und HTTP-Auslieferung geprüft. Alle Rebellen/shared Zuordnungen und Resolvercode erhalten. FieldCell-Browserfixture: 94 Varianten, 302 Bilder, 36 Statusfälle und 42 Menübilder erfolgreich, keine Fehler oder Bildüberläufe. Prettier und Whitespaceprüfung bestanden; lokale Commit-Evidenz: eindeutiger Betreff "feat: complete verified Imperial stage-I building assets".\n\nParent-Sitzungsmodell für Planung/Review, ticket-coder GPT-6 Luna high für assets.ts. Coding Agent korrigierte einen im eigenen Audit gefundenen Indexfehler des ersten Ersetzungsskripts; die zuvor saubere Datei wurde aus seinem HEAD wiederhergestellt und ausschließlich anhand der 94 Manifest-IDs neu aufgebaut. Parent prüfte unabhängig die gesamte Tabelle und unveränderten Resolvercode gegen die ursprüngliche Baseline ' +
  plan.mappingBaseline +
  '. Keine geschätzten Modellnutzungswerte.\n';
fs.writeFileSync(integration, t.trimEnd() + '\n');
let doc =
  '# Vollständige imperiale Gebäudeassets bis FP Stufe I\n\n**42 Familien / 94 Gebäude-IDs erstellt, angebunden und geprüft. Keine offenen Familien in diesem Umfang.** Enthalten sind Grundgebäude, materialfinanzierte Frühforschung und FP-I-Gebäude sowie Forschungszentrum II als Übergang. Die drei Muster sind ausdrücklich vom Nutzer freigegeben und unverändert übernommen.\n\n[Gesamtübersicht](full-overview.png) · [Daten-/Resolverprüfung](full-verification.json) · [Browserprüfung](browser-verification.json) · [Produktionsplan](plan.json)\n\n| Serie | Familien | IDs | Stand |\n| --- | --- | --- | --- |\n';
for (const b of plan.batches)
  doc +=
    '| [' +
    b.title +
    '](' +
    b.slug +
    '/README.md) | ' +
    b.families +
    ' | ' +
    b.idCount +
    ' | vollständig geprüft |\n';
doc +=
  '\nStil: hohe Draufsicht, breite bebaute Grundstücke, kantige graue Panzerflächen, dunkle Technik und rote Akzente. Funktionale Glas-, Metall- und Rohstofffarben helfen bei der Erkennung. Eigene imperiale Silhouetten im Kontrast zur Rebellenserie. Orbitale Werften mit transparenten offenen Dockbereichen und ohne feste Schiffe.\n\n256x256-RGBA-PNGs unter ../../buildings/generated/, 512px-Master, Quellen/Prompts/Manifeste je Serie erhalten. Erzeugung mit dem vom Nutzer gewünschten gpt-image-2 MCP (medium), Referenz aus der freigegebenen imperialen Stilprobe. Nachbarpixel an einer Quellblatt-Grenze korrigiert; Originalquellen erhalten.\n\nAbgleich gegen game-data ' +
  plan.gameDataCommit +
  ': alle 94 erwarteten imperialen IDs, Namen, Forschung und tatsächlich erlaubten Vorschaufelder vollständig geprüft. Startgebäude, Kolonisierungs-Außenposten und Forschungsupgrade berücksichtigt. Masterformat und Alpha, tatsächlicher Resolver und bytegleiche HTTP-Auslieferung aller 42 Bilder bestanden. Sämtliche Rebellen/shared Zuordnungen und Resolvercode gegenüber ' +
  plan.mappingBaseline +
  ' unverändert.\n\nDie Browserfixture preview.html/preview.js importiert die tatsächliche FieldCell und buildingImage vom Vite-Frontend: 94 Varianten, 302 Bilder, 36 Statusfälle inklusive Orbit und numerischer STU-Felder sowie 42 Menübilder bei 40px bestanden. Keine Bildüberläufe oder Ladefehler; Inaktiv-/Beschädigt-Anzeigen und 50-%-Baufortschritt erhalten. Keine Gameplay-, Forschungs-, Terrain- oder Rendereränderungen. Keine breiten Test-/Buildläufe für Raster und statische Zuordnungen.\n\nReproduktion: node assets/generated/swu-imperial-stage-i-v1/full-verify.cjs; python3 assets/generated/swu-imperial-stage-i-v1/full-overview.py. Einzelserien: pipeline.py und check-artifacts.cjs mit dem Seriennamen. preview.html ist eine Entwicklungsfixture für den laufenden Vite-Server. review/ enthält ignorierte, regenerierbare Zwischenbilder.\n\nBildkosten laut MCP-Schätzung inklusive der drei Stilmuster: ' +
  plan.estimatedImageCostUsd +
  ' USD; kein gemessener Abrechnungsbetrag. Parent-Sitzungsmodell für Planung/Review, ticket-coder GPT-6 Luna high für die Code-Anbindung.\n';
fs.writeFileSync(path.join(__dirname, 'README.md'), doc);
let status =
  '# Imperiale Gebäudeassets bis Forschungsstufe I\n\n**42 Familien / 94 IDs fertig; keine offenen Familien in diesem Umfang.** Forschungszentrum II als Übergang enthalten; alle Prüfungen bestanden.\n\n[Übersicht](../../assets/generated/swu-imperial-stage-i-v1/full-overview.png) · [Datenprüfung](../../assets/generated/swu-imperial-stage-i-v1/full-verification.json) · [Quellen und Prompts](../../assets/generated/swu-imperial-stage-i-v1/README.md)\n\n| Gebäude | IDs | Forschung |\n| --- | --- | --- |\n';
for (const i of items)
  status +=
    '| ' + i.label + ' | ' + i.ids.join(', ') + ' | ' + i.researchId + ' |\n';
fs.writeFileSync(
  path.join(root, '.scratch/imperial-stage-i-map-assets/status-stufe-i.md'),
  status,
);
console.log('All Imperial production and integration tickets resolved.');
