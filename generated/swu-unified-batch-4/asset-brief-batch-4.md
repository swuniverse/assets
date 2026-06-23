# SWU Building Icons Batch A — Open Design Prompt

Create a 4x4 batch of game building icons for a Star-Wars-inspired space colony strategy game. Use **SWU prompt names** as source of truth; STU/raw names are only references.

## Output requirements

- Generate **16 individual building icon PNGs**, one per item below.
- Each icon: **256x256 px**, transparent background, centered object, no text, no UI frame.
- Also generate one **4x4 contact sheet preview** with small labels below each cell for review.
- Style: cohesive set, same lighting, same camera angle, same scale language.
- Visual language: compact isometric / 3-quarter colony building miniatures, readable at 64px, premium sci-fi game asset, grounded industrial detail, subtle colored emissive accents, no photorealistic humans.
- Avoid copyrighted logos, characters, exact franchise ships, or text marks. Use generic space-opera motifs.
- Use SWU prompt names in filenames where possible; preserve IDs in filenames for game mapping.

## Cohesive style spec

- Camera: 3/4 isometric from above, slightly front-facing.
- Materials: weathered durasteel, transparisteel glass, ceramic panels, antennae, pipes, vents, landing pads, shielded domes.
- Palette: dark graphite metal, warm sand panels, muted brass, cyan/amber/red emissive accents depending on function.
- Lighting: soft top-left key, subtle rim light, ambient occlusion, transparent cutout shadow only if alpha-safe.
- Shape grammar: chunky silhouettes, strong readable silhouette, minimal busy noise, iconic main feature per building.

## Icons to generate

1. `81010100-aussenposten.png` — **Außenposten** (STU/raw: Basislager)  
   Small frontier command outpost, modular prefab habitat, antenna mast, supply crates, compact landing beacon, neutral faction.

2. `21020300-nerf-zucht.png` — **Nerf-Zucht** (STU/raw: Gaghfarm)  
   Rugged livestock/agri dome for alien herd breeding, feed silos, fenced paddock hints, warm biological lighting; no visible animals required, but silhouette suggests ranch.

3. `31020100-gezeitenkraftwerk.png` — **Gezeitenkraftwerk**  
   Coastal/water energy plant, turbine housings, wave-channel structures, blue water-energy glow, sturdy anchored platforms.

4. `61030100-tibanna-extraktor.png` — **Tibanna-Extraktor** (STU/raw: Chemiefabrik)  
   Compact atmospheric gas extraction facility, pressurized tanks, siphon tower, condenser pipes, cyan tibanna glow, Bespin-inspired industrial sci-fi silhouette.

5. `61110100-phrik-mine.png` — **Phrik-Mine** (STU/raw: Iridium-Mine)  
   Mining extractor over metallic ore deposit, drill tower, conveyor, rocky base, cool silver/blue highlights suggesting rare metal.

6. `81110100-landeplattform.png` — **Landeplattform** (STU/raw: Flugfeld)  
   Compact landing pad with beacon towers, hangar module, guidance lights, circular pad markings without readable text.

7. `63100100-phrik-raffinerie.png` — **Phrik-Raffinerie** (STU/raw: Iridium-Raffinerie)  
   Refinery with smelter stacks, molten silver-blue channels, shielded processing vats, heavier than mine.

8. `63110100-durastahl-schmiede.png` — **Durastahl-Schmiede** (STU/raw: Duraniumanlage)  
   Heavy forge/foundry, glowing orange furnaces, plate press, sparks implied, brutal industrial silhouette.

9. `71010100-forschungslabor.png` — **Forschungslabor**  
   Compact science lab, domed observatory section, sensor dishes, blue holographic glow, sterile high-tech panels.

10. `72010100-forschungszentrum-stufe-i.png` — **Forschungszentrum Stufe I** (STU/raw: Forschungszentrum Level 1)  
    Larger research campus than lab, central data spire, linked modules, more advanced blue/cyan light, still early-tier.

11. `22020100-blaue-milch-brauerei.png` — **Blaue-Milch-Brauerei** (STU/raw: Root Bier Brauerei)  
    Food/beverage production building, rounded tanks, blue liquid vats, pipes, friendly civilian-industrial mood.

12. `22010100-cantina-allianz.png` — **Cantina** (STU/raw: Wirtshaus)  
    Civilian social building, warm amber windows, awning/canopy, small rooftop vents, welcoming rebel/frontier atmosphere.

13. `22010300-cantina-imperium.png` — **Cantina** (STU/raw: Kneipe)  
    Similar function but harsher imperial/warrior tone, darker metal, red/amber lighting, angular roof, no symbols/logos.

14. `33010100-solarspiegel.png` — **Solarspiegel**  
    Field of mirrored panels around central collector, bright reflected highlights, clean renewable energy silhouette.

15. `33020100-solarfokus.png` — **Solarfokus**  
    Central solar concentrator tower or dish focusing beams, more advanced than Solarspiegel, golden-white energy glow.

16. `33030100-stromungsanker.png` — **Strömungsanker**  
    Water/current anchor energy device, heavy anchor pylons, submerged turbine hints, blue-green current glow, robust ocean-platform feel.

## Composition

- Make every icon visually distinct by silhouette.
- Keep scale comparable; no huge empty margins.
- No text inside icons.
- Contact sheet can have labels outside icons only.
- Final result should be ready for crop/export into `assets/buildings/generated/`.
