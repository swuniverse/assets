const fs = require('fs'),
  path = require('path');
const plan = JSON.parse(fs.readFileSync(path.join(__dirname, 'plan.json')));
const subjects = {
  civic: [
    'Advanced residential settlement: six broad low interconnected dwellings around a small functional courtyard; richer, denser upgrade of the existing housing, no skyline.',
    'Climate control center: broad squat weather-regulation hub with a large flat segmented sensor array, three short air-processing towers and large ducts. No landscape or weather effects.',
    'Climate-controlled food farm: three enclosed rectangular productive bays with broad glazed roofs, visible cultivated green beds, ventilation machinery and climate-control ducts.',
    'Climate-controlled breeding facility: four enclosed low agricultural tanks or pens around a compact processing hall with prominent controlled-environment ducts. Food production, not habitation.',
  ],
  energy: [
    'Fusion reactor: a broad low circular containment ring with a luminous restrained cyan core and two large heat-exchanger blocks; heavy coolant conduits. Compact industrial energy plant, no tall chimney.',
    'Plasma converter: wide industrial compound with two horizontal pressure vessels, a central orange plasma-processing chamber and thick insulated conduits. No flame or smoke.',
    'Thermal extractor: free-floating orbital mining installation with two broad heat-collector jaws and a compact cylindrical storage core, copper-orange thermal coils. No asteroid, planet, lava, ground or stars.',
    'Thermal power plant: broad compact heat-exchanger facility with twin ribbed horizontal radiators and a low round thermal turbine. Works on special numeric terrain; no lava background.',
  ],
  logistics: [
    'Cargo container depot: broad low logistics yard, six large modular freight containers in clear rows with a short gantry crane and squat transfer office. No shipping vehicles or scenery.',
    'Spaceport: advanced broad low terminal complex with two large EMPTY circular landing pads, connected cargo concourse and compact control center; denser upgrade of the earlier starport. No ships.',
    'Production hall: wide low factory with three clear segmented roof bays, attached assembly annex and broad cargo doors; visible compact machinery, no cargo vehicles.',
    'Research center III: advanced low campus with three broad blue-glass laboratories around a squat central scientific reactor or sensor core; visibly developed from research center II, no monumental tower.',
  ],
  orbital: [
    'Orbital research laboratory: free-floating compact multi-lobed scientific facility with three blue-glass lab modules, central instrument core and short radial connectors. Entire background genuine transparent alpha.',
    'Orbital food drop station: free-floating agricultural supply platform with broad enclosed green cultivation bays, central cargo-transfer hub and small closed supply capsules. No ships or landscape.',
    'Orbital habitat: free-floating habitation complex of four broad pressurized modules around a central life-support hub; compact solar wings and blue window strips. No ground, planet or stars.',
    'Corvette shipyard: large EMPTY open docking frame, two parallel service rails joined on one side to broad repair workshops. Interior dock must be TRUE EMPTY TRANSPARENT ALPHA, no floor plate, shadow plane, spacecraft, scaffolding filling the hole or star background.',
  ],
  modules: [
    'Advanced weapons module factory: broad two-bay industrial hall with attached assembly racks containing recognizable short laser-barrel components and heavy power-unit housings. Factory, not deployed artillery.',
    'Advanced shield module factory: broad low industrial compound with two segmented round shield-emitter test housings, flat power banks, insulated cables and a rectangular assembly hall. No full force-field bubble.',
    'Advanced propulsion module factory: low long assembly hall with three prominent horizontal engine cylinders in service cradles and compact coolant machinery. No spacecraft.',
  ],
  holo: [
    'Rebel Alliance school: low practical education campus with three connected classrooms, small blue teaching display canopy and courtyard. Star Wars frontier infrastructure, no lettering, actors or emblem.',
    'Holo simulator: broad enclosed training hall with a restrained cyan holographic grid visible inside a recessed roof well, control annex and projector banks. No simulated people or ships.',
    'Holo generator: compact power and projection plant with a large low circular segmented projector, four cyan emitter lenses and industrial coolant conduits. No tall beam or holographic characters.',
    'Plasma extractor: free-floating orbital extraction unit with four large dark magnetic collector arms around an orange-violet plasma containment vessel and broad horizontal radiators. No nebula, plasma cloud, ship, rock or stars.',
  ],
  mines: [
    'Cortosis ore mine: broad compact open extraction pit with stepped metal rim, short drilling gantry, enclosed service block and two visible gray-bronze ore bins. Tiny mineral deposits only within equipment, no full rock terrain.',
    'Laminanium ore mine: two short drill heads beside a small polygonal extraction shaft, pale silver ore bins and a rectangular sorting hall; different layout from Cortosis.',
    'Quadranium ore mine: wide low excavation ring with a heavy short conveyor crossing one edge, dull blue-gray mineral bins and a compact compression head.',
    'Neuranium ore mine: small deep dark excavation opening, squat reinforced drill hub and two dense graphite-black ore bins with a wide service hall.',
    'Bronzium ore mine: two small stepped excavation pits linked to a low sorting hall, orange-bronze ore bins and a short horizontal conveyor. Readable distinct paired-pit silhouette.',
  ],
  refineries: [
    'Cortosis refinery: wide low industrial hall with two bronze-gray ore hoppers, squat circular induction furnace and flat casting line. Processing compound, no excavation pit.',
    'Laminanium refinery: low rectangular processing hall with two horizontal silver separation drums and a broad laminated-metal press; restrained pale metallic accent.',
    'Quadranium refinery: broad twin angular smelter housings, blue-gray metal ingot racks, thick pipe loops and compact cooling fin bank; distinct L-shaped plan.',
    'Neuranium refinery: broad heavily reinforced black graphite processing tanks within a low service compound, dense dark metal ingot racks and circular pressure chamber.',
    'Bronzium refinery: broad low furnace hall with two orange-bronze casting vats, short casting conveyor and compact exhaust machinery. No flames, smoke or chimney monument.',
  ],
  components: [
    'Hyperspace coil factory: broad low precision assembly hall with two very visible horizontal ringed hyperdrive coils in cradles and a small test chamber, blue power details.',
    'Laminanium circuit factory: wide low clean assembly hall with a large exposed flat silver circuit-testing table and two rectangular blue-green electronic processing banks.',
    'Phase converter factory: broad angular assembly hall around two squat circular segmented phase-conversion units, restrained violet cores and cooling banks.',
    'Memory chip factory: broad clean precision fabrication hall with three rectangular wafers or chip-test beds, compact server banks and dark-blue technical surfaces. No lettering.',
    'Microdyne factory: compact broad precision engineering plant with three small horizontal cylindrical assemblies held in machine racks, bronze-metal parts and an enclosed calibration hall.',
  ],
};
for (const batch of plan.batches) {
  const faction = batch.slug.startsWith('rebels-') ? 'rebels' : 'imperials',
    group = batch.slug.replace(faction + '-', '');
  const m = JSON.parse(
    fs.readFileSync(path.join(__dirname, batch.slug, 'manifest.json')),
  );
  const desc = [...subjects[group]];
  if (faction === 'imperials' && group === 'civic') {
    desc[2] =
      'Climate-controlled Bantha farm: broad enclosed livestock barn with three covered pens and heavy climate-control ducts, food-production processing hall. NO visible animals, green crop beds or residential rooms.';
    desc[3] =
      'Climate-controlled Nerf breeding facility: broad rectangular livestock sheds with four covered breeding pens around food-processing machinery, roof ventilators and heavy climate-regulation ducts. NO visible animals or crop beds.';
  }
  if (faction === 'imperials' && group === 'holo')
    desc[0] =
      'Imperial combat training camp: broad low angular barracks enclosing a compact empty drill courtyard and two enclosed weapon-training halls; disciplined symmetric layout, no people, logos or text.';
  if (faction === 'imperials' && group === 'orbital')
    desc[1] =
      'Anti-gravity training center: free-floating orbital complex with a broad enclosed central training chamber, four squat pressurized support pods and a compact cargo-supply annex. Food supplies and life support integrated, no farms, people, vehicles or ground.';
  const count = m.items.length,
    layout =
      count === 4
        ? 'EXACTLY FOUR separate compounds, 2x2 grid on 1024x1024, one per 512px quadrant. Order top-left, top-right, bottom-left, bottom-right.'
        : count === 3
          ? 'EXACTLY THREE separate compounds, one row of three on 1536x1024. Each in its own 512px-wide column, centered vertically, no overlapping. Order left, center, right.'
          : 'EXACTLY FIVE separate compounds, 3x2 grid on 1536x1024. Each in its own 512x512 cell. Order top-left, top-center, top-right, bottom-left, bottom-center. Bottom-right cell completely empty transparent alpha.';
  const style =
    faction === 'rebels'
      ? 'weathered cream duracrete, slate metal and restrained rust-orange plumbing, practical improvised frontier forms'
      : 'cool light-medium gray armored duracrete and steel, graphite-black technical machinery, angular disciplined symmetry, sparse red lights; no cream sandstone or rust-orange rebel architecture';
  const prompt =
    'Use case: stylized-concept / style-transfer. Asset type: transparent ' +
    (faction === 'rebels' ? 'Rebel Alliance' : 'Galactic Empire') +
    ' colony-map sprites for a Star Wars browser strategy game.\nStyle continuity: match the established stage-I series with the specified near-overhead camera, materials, low broad footprint and scale. Create NEW function-specific stage-II buildings.\nStyle: ' +
    style +
    '. Crisp readable industrial detail and broad low footprints.\nCamera: high near-overhead ORTHOGRAPHIC; roofs dominate, very shallow front walls, same orientation as references. No collectible miniature, low isometric view, skyline, tall monument or scenic perspective. Uniform soft upper-left lighting, tight contact shadows.\nBackground: genuine TRANSPARENT ALPHA around EACH isolated structure. No ground rectangle, terrain, landscape, sky, stars, fog, vignette, fake checkerboard or shadow backdrop. Compact functional foundation permitted for surface buildings only; orbital structures have no ground or solid support plate.\nNo text, label, lettering, logo, watermark, border, people, animals, vehicles or spacecraft. Readable at 40/68px. ' +
    layout +
    ' Each compound approximately 430px across with ample transparent clearance to all cell edges. Never cross a cell boundary.\n' +
    desc.map((s, i) => i + 1 + '. ' + s).join('\n') +
    '\nPreserve all EMPTY DOCK openings as real alpha, not dark painted areas. No shared base between buildings.\n';
  fs.writeFileSync(path.join(__dirname, batch.slug, 'prompt.txt'), prompt);
}
console.log('Prepared 18 exact production prompts');
