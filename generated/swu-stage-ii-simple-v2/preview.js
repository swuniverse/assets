import React from 'react';
import { createRoot } from 'react-dom/client';
import { FieldCell } from '/src/pages/colonies/components/FieldCell.tsx';
import { buildingImage } from '/src/lib/assets.ts';
import '/src/styles.css';
const data = await fetch('./full-verification.json').then((r) => r.json());
const h = React.createElement;
const errors = [];
window.addEventListener('error', (e) => errors.push(e.message));
window.addEventListener('unhandledrejection', (e) =>
  errors.push(String(e.reason)),
);
const cell = (item, id, index, status = 'active') =>
  h(
    'div',
    {
      className: 'field',
      key: index,
      'data-building-id': id,
      'data-status': status,
    },
    h(FieldCell, {
      field: {
        id: index,
        colonyId: 0,
        fieldIndex: index,
        fieldType: typeof item.previewCode === 'number' ? item.previewCode : 0,
        terrainTileId: item.previewCode,
        layer: item.previewCode === 'OO10' ? 'ORBIT' : 'SURFACE',
        buildingId: id,
        isBuilding: status === 'building',
        buildProgressPercent: status === 'building' ? 50 : null,
        isActive: status !== 'inactive',
        integrity: status === 'damaged' ? 500 : 1000,
        maxIntegrity: 1000,
      },
      readOnly: true,
      buildingName: item.label,
      buildingId: id,
      isSelected: false,
      isHighlighted: false,
      isReplacement: false,
      isBuildMode: false,
      isFieldActive: status !== 'inactive',
      timeState: 'day',
      onClick: () => {},
    }),
  );
const variants = data.items.flatMap((item) =>
  item.ids.map((id) =>
    h(
      'div',
      { className: 'variant', key: id },
      cell(item, id, id),
      h('small', null, String(id)),
    ),
  ),
);
const orbital = data.items.filter((i) => i.previewCode === 'OO10');
const special = data.items.filter(
  (i) =>
    typeof i.previewCode === 'number' ||
    i.ids[0] === 74010300 ||
    i.ids[0] === 74010100,
);
const states = ['active', 'inactive', 'damaged', 'building'];
const statusRows = [
  ...new Map(
    [
      ...orbital,
      ...special,
      ...data.items.filter((i) => i.placement === 'unassigned-fields'),
    ].map((i) => [i.ids[0], i]),
  ).values(),
].flatMap((item, index) => [
  h('span', { className: 'label', key: 'l' + index }, item.label),
  ...states.map((s, j) => cell(item, item.ids[0], 200 + index * 10 + j, s)),
]);
createRoot(document.getElementById('app')).render(
  h(
    React.Fragment,
    null,
    h('h2', null, 'Alle 138 Varianten · echte FieldCell-Komponente'),
    h('div', { className: 'variant-grid', id: 'variants' }, variants),
    h('h2', null, 'Orbit, numerische Felder und letzte Gebäude'),
    h(
      'div',
      { className: 'states', id: 'states' },
      h('strong', null, 'Gebäude'),
      ...['Aktiv', 'Inaktiv', 'Beschädigt', 'Im Bau'].map((s) =>
        h('strong', { key: s }, s),
      ),
      ...statusRows,
    ),
    h('h2', null, 'Alle 76 Menübilder · 40 px'),
    h(
      'div',
      { className: 'menu-grid' },
      data.items.map((i) =>
        h(
          'div',
          { key: i.ids[0] },
          h('img', {
            src: buildingImage(i.ids[0]),
            className: 'menu',
            alt: i.label,
          }),
          h('small', null, i.label),
        ),
      ),
    ),
  ),
);
async function check() {
  const report = document.getElementById('report');
  const end = Date.now() + 25000;
  let imgs = [];
  do {
    imgs = [...document.querySelectorAll('#app img')];
    imgs.forEach((i) => (i.loading = 'eager'));
    if (imgs.length && imgs.every((i) => i.complete && i.naturalWidth > 0))
      break;
    await new Promise((r) => setTimeout(r, 100));
  } while (Date.now() < end);
  const fails = [];
  if (!imgs.length || imgs.some((i) => !i.complete || !i.naturalWidth))
    fails.push('Bild lädt nicht');
  const fields = [...document.querySelectorAll('#variants .field')];
  if (fields.length !== 138) fails.push('Variantenanzahl');
  for (const f of fields) {
    const id = Number(f.dataset.buildingId),
      b = f.querySelector('button'),
      img = b.querySelector('img.absolute');
    const ir = img?.getBoundingClientRect(),
      br = b.getBoundingClientRect();
    if (
      !img ||
      img.naturalWidth !== 256 ||
      new URL(img.src).pathname !== buildingImage(id)
    )
      fails.push('Gebäudepfad ' + id);
    if (
      ir &&
      (ir.left < br.left ||
        ir.top < br.top ||
        ir.right > br.right + 0.5 ||
        ir.bottom > br.bottom + 0.5)
    )
      fails.push('Überlauf ' + id);
  }
  for (const f of document.querySelectorAll('#states .field')) {
    const b = f.querySelector('button'),
      s = f.dataset.status;
    if (
      s === 'inactive' &&
      (!b.classList.contains('border-red-600') ||
        !b.getAttribute('aria-label').includes('deaktiviert'))
    )
      fails.push('Inaktiv');
    if (
      s === 'damaged' &&
      (!b.classList.contains('border-orange-500') ||
        !b.getAttribute('aria-label').includes('beschädigt'))
    )
      fails.push('Beschädigt');
    if (
      s === 'building' &&
      b.querySelector('[data-testid="build-progress-overlay"]')?.style
        .height !== '50%'
    )
      fails.push('Baufortschritt');
  }
  for (const i of document.querySelectorAll('.menu'))
    if (
      i.naturalWidth !== 256 ||
      Math.abs(i.getBoundingClientRect().width - 40) > 0.5
    )
      fails.push('Menügröße');
  fails.push(...errors);
  window.assetVerification = {
    families: 76,
    ids: 138,
    fieldCells: fields.length,
    imageElements: imgs.length,
    imageLoading: !fails.length,
    statusCases: document.querySelectorAll('#states .field').length,
    noOverflow: !fails.length,
    errors: fails,
  };
  report.textContent = fails.length
    ? 'FEHLER: ' + fails.join(', ')
    : 'BESTANDEN: 76 Familien · 138 Varianten · ' +
      imgs.length +
      ' Bilder geladen · Orbit, numerische Felder und Gebäudezustände geprüft';
  report.dataset.result = fails.length ? 'failed' : 'passed';
}
setTimeout(check, 200);
