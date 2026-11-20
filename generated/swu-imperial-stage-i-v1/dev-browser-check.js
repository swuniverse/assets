const page = await browser.getPage('imperial-assets');
const url =
  'http://localhost:5173/@fs/Users/TMUNDIN/git/github.com/swuniverse/core/assets/generated/swu-imperial-stage-i-v1/preview.html';
if (page.url() !== url) await page.goto(url, { timeout: 10000 });
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
  result.ids !== 94 ||
  result.families !== 42 ||
  result.fieldCells !== 94 ||
  result.imageElements !== 302 ||
  result.statusCases !== 36 ||
  result.menuImages !== 42 ||
  result.fieldPixels !== 68 ||
  result.menuPixels !== 40 ||
  result.errors.length ||
  !result.noOverflow
)
  throw new Error(JSON.stringify(result));
await page.evaluate(() => window.scrollTo(0, 0));
const variantsShot = await page.shot({
  name: 'imperial-variants.png',
  type: 'png',
  maxEdge: 1568,
});
const states = await page.$('#states');
await states.evaluate((el) =>
  window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 72),
);
const statesShot = await page.shot({
  name: 'imperial-states.png',
  type: 'png',
  maxEdge: 1568,
});
const evidence = {
  date: '2026-11-20',
  tool: 'dev-browser 1.0.0',
  method:
    'Headless Chrome; fixture imports the real FieldCell and buildingImage from the Vite frontend',
  url: page.url(),
  result: 'passed',
  ...result,
  screenshots: { variants: variantsShot.path, states: statesShot.path },
};
const reportFile = saveFile(
  'imperial-browser-verification.json',
  JSON.stringify(evidence, null, 2),
);
({ reportFile, evidence });
