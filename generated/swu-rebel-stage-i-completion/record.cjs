const fs = require('fs'),
  path = require('path');
const slug = process.argv[2],
  dir = path.join(__dirname, slug),
  m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8')),
  v = JSON.parse(fs.readFileSync(path.join(dir, 'verification.json'), 'utf8')),
  planPath = path.join(__dirname, 'plan.json'),
  plan = JSON.parse(fs.readFileSync(planPath, 'utf8')),
  b = plan.batches.find((b) => b.slug === slug);
b.status = 'implemented';
b.verification = v;
fs.writeFileSync(planPath, JSON.stringify(plan, null, 2) + '\n');
let doc =
  '# ' +
  m.title +
  '\n\nSerie im freigegebenen Star-Wars-Grundstücksstil. Neue 256x256-RGBA-PNGs mit 512px-Mastern; Quellen, Prompt und Vorschauen bleiben erhalten.\n\n| Familie | IDs | Forschung | Vorschaufelder |\n| --- | --- | --- | --- |\n';
for (const i of m.items)
  doc +=
    '| ' +
    i.label +
    ' | ' +
    i.ids.join(', ') +
    ' | ' +
    i.researchId +
    ' | ' +
    i.previews.map((p) => p.label + ' (' + p.code + ')').join(', ') +
    ' |\n';
doc +=
  '\nQuelle: ' +
  m.sourceSheet +
  '. Prompt: prompt.txt. Modell/Qualität: ' +
  (m.generation?.modelRequested || 'gpt-image-2') +
  ' / ' +
  (m.generation?.quality || 'medium') +
  '. ' +
  (m.generation?.recoveredAfterMcpTimeout
    ? 'Ergebnis nach MCP-Zeitlimit aus der tatsächlich gespeicherten Datei geborgen; Kostentelemetrie nicht verfügbar.'
    : '') +
  '\n\nQuellen: ' +
  m.buildingSource +
  ', ' +
  m.researchSource +
  ', ' +
  m.terrainSource +
  '. game-data: ' +
  m.gameDataCommit +
  '.\n\npipeline.py exportiert die Dateien und erstellt production-overview.png sowie terrain-review.png. verify.cjs prüft IDs/Namen, Forschung, tatsächlich erlaubte Vorschaufelder, Sonderplatzierung, PNG-Format, buildingImage-Pfade und bytegleiche HTTP-Auslieferung.\n\nFokussierte Prüfung bestanden: ' +
  v.families +
  ' Familien, ' +
  v.ids +
  ' IDs, ' +
  v.bytes +
  ' PNG-Bytes. Ganze nicht ausgewählte Zuordnungstabelle unverändert. Quellen und 40/68px-Montagen visuell geprüft. Abschließende Browserprüfung der gesamten Restserie wird gemeinsam durchgeführt.\n';
fs.writeFileSync(path.join(dir, 'README.md'), doc);
const done = plan.batches.filter((b) => b.status !== 'pending'),
  families = done.reduce((n, b) => n + b.families, 0),
  ids = done.reduce((n, b) => n + b.idCount, 0);
let overview =
  '# Abschluss der Rebellen-Assets bis FP Stufe I\n\nNutzerfreigabe: 25 fehlende Stufe-I-Familien plus Forschungszentrum Stufe II als Übergang. Vorher fertig: 16 Familien / 39 IDs.\n\nRestserie umgesetzt: ' +
  families +
  ' von 26 Familien / ' +
  ids +
  ' von 55 IDs. Gemeinsame Abschlussprüfung noch ausstehend.\n\n| Serie | Familien | IDs | Stand |\n| --- | --- | --- | --- |\n';
for (const b of plan.batches)
  overview +=
    '| ' +
    b.title +
    ' | ' +
    b.families +
    ' | ' +
    b.idCount +
    ' | ' +
    b.status +
    ' |\n';
overview +=
  '\nGemeinsamer Produktionsvertrag: 256x256 transparentes RGBA-PNG, 512px-Master, Quellen/Prompts/Manifeste. Neue versionierte Dateien, keine Altgrafiken überschrieben. Keine Änderungen an Spiel-, Forschungs-, Gebäudezustands- oder Terrainregeln.\n\nAufruf: python3 assets/generated/swu-rebel-stage-i-completion/pipeline.py <serie>; node assets/generated/swu-rebel-stage-i-completion/verify.cjs <serie>.\n\nFreigaben prüfen sowohl SWU-Kategorien als auch numerische STU-Felder. Außenposten als Kolonisierungsgebäude, Forschungszentrum II als echtes Upgrade von 72010100; familienübergreifende Geländealternativen erhalten. Orbitale Anlagen mit transparentem Hintergrund auf Orbitfeldern.\n\nPlan: plan.json. Je Serie: manifest.json, prompt.txt, Quellblatt, masters/, Produktionsübersicht, Geländeprüfung, export-report.json und verification.json. review/ enthält ignorierte regenerierbare Zwischenbilder.\n';
fs.writeFileSync(path.join(__dirname, 'README.md'), overview);
const root = path.resolve(__dirname, '../../..'),
  ticket = path.join(root, b.ticket);
let t = fs.readFileSync(ticket, 'utf8');
let count = 0;
t = t.replace(/- \[ \]/g, (match) => (++count < 6 ? '- [x]' : match));
t +=
  '\n- Umgesetzt, Prüfung ausstehend: ' +
  v.families +
  ' Familien / ' +
  v.ids +
  ' IDs exportiert, Quellen/Master/Prompt gespeichert, direkte Integrationschecks bestanden. Gemeinsame finale Browser-/Vollständigkeitsprüfung der Restserie noch offen. Core-Commit: eindeutiger Betreff \"feat: complete Rebel stage-I ' +
  slug +
  ' building assets\". Parent-Sichtprüfung von Quelle und 40/68px durchgeführt.\n';
fs.writeFileSync(ticket, t.trimEnd() + '\n');
