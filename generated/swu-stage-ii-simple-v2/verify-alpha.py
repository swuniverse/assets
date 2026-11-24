"""Independently inspect final PNG geometry, openings and retained source cores."""
from datetime import date
import json
from pathlib import Path
import subprocess

HERE = Path(__file__).resolve().parent
ASSETS = HERE.parents[1]


def pixels(path):
    width, height = map(int, subprocess.check_output(
        ['magick', str(path), '-format', '%w %h', 'info:']).split())
    data = subprocess.check_output(['magick', str(path), '-depth', '8', 'rgba:-'])
    assert len(data) == width * height * 4
    return width, height, data


report = {'date': str(date.today()), 'files': [], 'protectedCores': [], 'openings': []}
for manifest in sorted(HERE.glob('*/manifest.json')):
    if manifest.parent.name == 'style':
        continue
    m = json.loads(manifest.read_text())
    for item in m['items']:
        file = ASSETS / 'buildings/generated' / item['file']
        assert file.read_bytes()[:8] == b'\x89PNG\r\n\x1a\n', file
        w, h, data = pixels(file)
        assert (w, h) == (256, 256), file
        alpha = data[3::4]
        assert all(alpha[y*w+x] == 0 for x, y in [(0, 0), (255, 0), (0, 255), (255, 255)]), file
        # Check the solid footprint; Lanczos antialiasing can extend one faint
        # pixel beyond the nominal 244px resize on either side.
        visible = [i for i, a in enumerate(alpha) if a >= 128]
        xs, ys = [i % w for i in visible], [i // w for i in visible]
        bounds = [min(xs), min(ys), max(xs)+1, max(ys)+1]
        assert bounds[2]-bounds[0] <= 244 and bounds[3]-bounds[1] <= 244, (file, bounds)
        assert min(bounds[:2]) >= 1 and max(bounds[2:]) < 256, (file, bounds)
        report['files'].append({'file': item['file'], 'alphaBounds': bounds})

    regions = m.get('protectedAlphaRegions', [])
    if regions:
        w, h, original = pixels(manifest.parent / m['originalSource'])
        kw, kh, keyed = pixels(manifest.parent / m['sourceSheet'])
        assert (w, h) == (kw, kh)
        for region in regions:
            cx, cy, rx, ry = region['ellipse']
            checked = 0
            for y in range(int(cy-ry), int(cy+ry)+1):
                for x in range(int(cx-rx), int(cx+rx)+1):
                    if ((x-cx)/rx)**2 + ((y-cy)/ry)**2 <= 1:
                        k = (y*w+x)*4
                        assert keyed[k:k+4] == original[k:k+4], (manifest, x, y)
                        checked += 1
            report['protectedCores'].append({'batch': m['batch'], 'ellipse': region['ellipse'], 'sourcePixelsUnchanged': checked})

# Points were selected visually in the original sheets, independently of keying.
probes = [
    ('rebels-orbital', 85130100, [(700, 740)]),
    ('imperials-orbital', 85130300, [(760, 770)]),
    ('imperials-logistics', 81130300, [(660, 270), (860, 270)]),
]
for batch, building_id, points in probes:
    m = json.loads((HERE / batch / 'manifest.json').read_text())
    item = next(i for i in m['items'] if i['ids'][0] == building_id)
    w, h, source = pixels(HERE / batch / m['sourceSheet'])
    rw, rh, runtime = pixels(ASSETS / 'buildings/generated' / item['file'])
    x0, y0, cw, ch = item['cropBox']
    scale = 244 / max(cw, ch)
    for x, y in points:
        assert source[(y*w+x)*4+3] == 0, (batch, x, y)
        rx = round((rw-cw*scale)/2 + (x-x0)*scale)
        ry = round((rh-ch*scale)/2 + (y-y0)*scale)
        assert runtime[(ry*rw+rx)*4+3] == 0, (batch, rx, ry)
        report['openings'].append({'id': building_id, 'sourcePoint': [x, y], 'runtimePoint': [rx, ry], 'alpha': 0})

assert len(report['files']) == 76
report['result'] = 'passed'
(HERE / 'alpha-verification.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps({'result': 'passed', 'files': len(report['files']), 'protectedCores': len(report['protectedCores']), 'openingProbes': len(report['openings'])}))
