const page = await browser.getPage('stage-ii-assets');
const url =
  'http://localhost:5173/@fs/Users/TMUNDIN/git/github.com/swuniverse/core/assets/generated/swu-stage-ii-v1/preview.html';
await page.goto(url, { timeout: 10000 });
await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
await page.waitForFunction(() => !!window.assetVerification, {
  timeout: 10000,
});
const result = await page.evaluate(() => ({
  ...window.assetVerification,
  report: document.getElementById('report').textContent,
  domResult: document.getElementById('report').dataset.result,
  menuImages: document.querySelectorAll('.menu').length,
  fieldPixels: document
    .querySelector('#variants .field')
    .getBoundingClientRect().width,
  menuPixels: document.querySelector('.menu').getBoundingClientRect().width,
}));
if (
  result.domResult !== 'passed' ||
  result.ids !== 138 ||
  result.families !== 76 ||
  result.fieldCells !== 138 ||
  result.menuImages !== 76 ||
  result.fieldPixels !== 68 ||
  result.menuPixels !== 40 ||
  result.errors.length ||
  !result.noOverflow ||
  result.imageElements !== (138 + result.statusCases) * 2 + 76 ||
  result.statusCases < 40
)
  throw new Error(JSON.stringify(result));
await page.evaluate(() => window.scrollTo(0, 0));
const variantsShot = await page.shot({
  name: 'stage-ii-variants.png',
  type: 'png',
  maxEdge: 1568,
});
await page.$eval('#states', (el) =>
  window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 72),
);
const statesShot = await page.shot({
  name: 'stage-ii-states.png',
  type: 'png',
  maxEdge: 1568,
});
const evidence = {
  date: '2026-11-23',
  tool: 'dev-browser 1.0.0',
  method:
    'Headless Chrome; fixture imports real FieldCell and buildingImage from running Vite frontend',
  url: page.url(),
  result: 'passed',
  ...result,
  screenshots: { variants: variantsShot.path, states: statesShot.path },
};
const reportFile = saveFile(
  'stage-ii-browser-verification.json',
  JSON.stringify(evidence, null, 2),
);
({ reportFile, evidence });
