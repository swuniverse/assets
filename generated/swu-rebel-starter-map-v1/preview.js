import React from 'react';
import { createRoot } from 'react-dom/client';
import { FieldCell } from '/src/pages/colonies/components/FieldCell.tsx';
import { buildingImage } from '/src/lib/assets.ts';
import '/src/styles.css';
const manifest = {
  version: 1,
  faction: 'REBEL_ALLIANCE',
  style:
    'Hohe Draufsicht; bebaute Grundstücke; gebrauchte Star-Wars-Frontier-Architektur',
  gameDataCommit: '41d8af731510457b260dc5c6f3b672a28dc9dfb3',
  buildingSource: 'game-data/data/buildings/stu-buildings.yaml',
  researchSource: 'game-data/data/research/rebels.yaml',
  canvasSize: 256,
  subjectMaxSize: 244,
  masterCanvasSize: 512,
  items: [
    {
      ids: [82010100, 82010199],
      label: 'Kommandozentrale',
      slug: 'kommandozentrale',
      sheet: 'edit-20261119-140656-f6f659-source-new-four.png',
      cell: 0,
      researchId: 1001,
      priority:
        'Tatsächliches Fraktions-Startgebäude (FactionService.startBuildingId)',
      terrain: 'surface',
      file: '82010100-rebel-kommandozentrale-map-v1.png',
      master: 'masters/82010100-kommandozentrale.png',
    },
    {
      ids: [11010100, 11010103, 11010199],
      label: 'Wohnkomplex',
      slug: 'wohnkomplex',
      sheet: 'source-approved-four.png',
      cell: 0,
      researchId: 1001,
      priority: 'Grundgebäude ab Grundlagenforschung',
      terrain: 'surface',
      file: '11010100-rebel-wohnkomplex-map-v1.png',
      master: 'masters/11010100-wohnkomplex.png',
    },
    {
      ids: [21010100, 21010101, 21010199],
      label: 'Hydrokultur-Gewächshaus',
      slug: 'hydrokultur',
      sheet: 'edit-20261119-140656-f6f659-source-new-four.png',
      cell: 1,
      researchId: 1001,
      priority: 'Grundgebäude ab Grundlagenforschung',
      terrain: 'surface',
      file: '21010100-rebel-hydrokultur-map-v1.png',
      master: 'masters/21010100-hydrokultur.png',
    },
    {
      ids: [31010100, 31010131, 31010199],
      label: 'Ionensegel-Kollektor',
      slug: 'ionensegel',
      sheet: 'source-approved-four.png',
      cell: 1,
      researchId: 1001,
      priority: 'Grundgebäude ab Grundlagenforschung',
      terrain: 'surface',
      file: '31010100-rebel-ionensegel-map-v1.png',
      master: 'masters/31010100-ionensegel.png',
    },
    {
      ids: [61010100, 61010199],
      label: 'Doonium-Schmelze',
      slug: 'doonium-schmelze',
      sheet: 'source-approved-four.png',
      cell: 2,
      researchId: 1001,
      priority: 'Grundgebäude ab Grundlagenforschung',
      terrain: 'surface',
      file: '61010100-rebel-doonium-schmelze-map-v1.png',
      master: 'masters/61010100-doonium-schmelze.png',
    },
    {
      ids: [81210100, 81210199],
      label: 'Versorgungslager',
      slug: 'versorgungslager',
      sheet: 'source-approved-four.png',
      cell: 3,
      researchId: 1001,
      priority: 'Grundgebäude ab Grundlagenforschung',
      terrain: 'surface',
      file: '81210100-rebel-versorgungslager-map-v1.png',
      master: 'masters/81210100-versorgungslager.png',
    },
    {
      ids: [21020100, 21020102, 21020199],
      label: 'Aqua-Zuchtanlage',
      slug: 'aqua-zuchtanlage',
      sheet: 'edit-20261119-140656-f6f659-source-new-four.png',
      cell: 2,
      researchId: 220101,
      priority: 'Aqua-Zuchtfarm: Aufwand 5, direkt nach 1001',
      terrain: 'water',
      file: '21020100-rebel-aqua-zuchtanlage-map-v1.png',
      master: 'masters/21020100-aqua-zuchtanlage.png',
    },
    {
      ids: [61030100, 61030199],
      label: 'Tibanna-Extraktor',
      slug: 'tibanna-extraktor',
      sheet: 'edit-20261119-140656-f6f659-source-new-four.png',
      cell: 3,
      researchId: 254001,
      priority: 'Chemische Fabrik: Aufwand 10, direkt nach 1001',
      terrain: 'surface',
      file: '61030100-rebel-tibanna-extraktor-map-v1.png',
      master: 'masters/61030100-tibanna-extraktor.png',
    },
  ],
  starterBuildingSource: 'apps/backend/src/modules/faction/faction.service.ts',
};
const h = React.createElement;
const items = manifest.items;
function cell(item, code = 'C119', size = 68, status = 'active', index = 0) {
  const field = {
    id: index,
    colonyId: 0,
    fieldIndex: index,
    fieldType: 0,
    terrainTileId: code,
    layer: 'SURFACE',
    buildingId: item?.ids[0] ?? null,
    isBuilding: status === 'building',
    buildProgressPercent: status === 'building' ? 50 : null,
    isActive: status !== 'inactive',
    integrity: status === 'damaged' ? 500 : 1000,
    maxIntegrity: 1000,
  };
  return h(
    'div',
    { className: 'field' + size, key: index },
    h(FieldCell, {
      field,
      readOnly: true,
      buildingName: item?.label,
      buildingId: item?.ids[0],
      isSelected: false,
      isHighlighted: false,
      isReplacement: false,
      isBuildMode: false,
      isFieldActive: status !== 'inactive',
      timeState: 'day',
      onClick: () => {},
    }),
  );
}
const headers = [
  'Gebäude',
  'Menü 40px',
  'Feld 68px',
  'Feld 96px',
  'Inaktiv',
  'Beschädigt',
  'Im Bau',
];
const table = headers.map((s, i) => h('strong', { key: 'head' + i }, s));
items.forEach((item, i) => {
  const code = item.terrain === 'water' ? 'A410' : 'C119';
  table.push(
    h(
      'div',
      { className: 'label', key: 'label' + i },
      h('strong', null, item.label),
      h('div', { className: 'note' }, item.ids.join(' / ')),
    ),
  );
  table.push(
    h('img', {
      className: 'menu',
      src: buildingImage(item.ids[0]),
      alt: item.label,
      key: 'menu' + i,
    }),
  );
  table.push(
    cell(item, code, 68, 'active', i * 10 + 1),
    cell(item, code, 96, 'active', i * 10 + 2),
    cell(item, code, 68, 'inactive', i * 10 + 3),
    cell(item, code, 68, 'damaged', i * 10 + 4),
    cell(item, code, 68, 'building', i * 10 + 5),
  );
});
const positions = new Map([
  [43, items[3]],
  [45, items[1]],
  [47, items[4]],
  [49, items[2]],
  [50, items[3]],
  [51, items[4]],
  [52, items[1]],
  [53, items[5]],
  [55, items[6]],
  [58, items[7]],
  [59, items[0]],
]);
const scene = Array.from({ length: 60 }, (_, i) => {
  const item = positions.get(i);
  const code =
    i === 55 || [54, 56, 57].includes(i) ? 'A410' : i >= 40 ? 'C119' : 'C230';
  return cell(item, code, 68, 'active', i + 100);
});
const variants = items.flatMap((item) =>
  item.ids.map((id, i) =>
    cell(
      { ...item, ids: [id] },
      item.terrain === 'water' ? 'A410' : 'C119',
      68,
      'active',
      id,
    ),
  ),
);
createRoot(document.getElementById('app')).render(
  h(
    React.Fragment,
    null,
    h(
      'section',
      null,
      h('h2', null, 'Kolonieansicht'),
      h('div', { className: 'scene' }, scene),
    ),
    h(
      'section',
      null,
      h('h2', null, 'Gebäude und Zustände'),
      h('div', { className: 'table' }, table),
    ),
    h(
      'section',
      null,
      h('h2', null, 'Alle 20 Geländevarianten'),
      h('div', { className: 'variant-grid' }, variants),
    ),
  ),
);
window.addEventListener('error', (e) => {
  document.getElementById('error').textContent = 'Vorschaufehler: ' + e.message;
});
