const fs = require('fs'),
  path = require('path');
const slug = process.argv[2],
  dir = path.join(__dirname, slug),
  plan = JSON.parse(fs.readFileSync(path.join(__dirname, 'plan.json'), 'utf8'));
if (!plan.batches.some((b) => b.slug === slug)) throw Error('Unknown batch');
const result = JSON.parse(
    fs.readFileSync(path.join(dir, 'generation.json'), 'utf8'),
  ),
  p = path.join(dir, 'manifest.json'),
  m = JSON.parse(fs.readFileSync(p, 'utf8'));
const file = path.basename(result.images[0].file_path);
if (!fs.existsSync(path.join(dir, file))) throw Error('Missing generated file');
m.sourceSheet = file;
m.generation = {
  tool: 'edit_image',
  modelRequested: result.model,
  quality: result.requested?.quality ?? 'medium',
  costEstimateUsd: result.cost_usd_estimated ?? null,
};
fs.writeFileSync(p, JSON.stringify(m, null, 2) + '\n');
