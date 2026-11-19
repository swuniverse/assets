#!/usr/bin/env python3
"""Export the eight selected Rebel building families and render size/terrain reviews."""
from pathlib import Path
import json, subprocess
OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[2]
PRODUCTION = ROOT / "assets/buildings/generated"
MANIFEST = json.loads((OUT / "manifest.json").read_text())
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
TERRAINS = [("Wald", "C230"), ("Bauland", "C119"), ("Fels", "C640"), ("Wüste", "D819"), ("Wasser", "A410")]

def magick(*args):
    return subprocess.run(["magick", *map(str,args)], check=True, capture_output=True, text=True).stdout

def text(args, x, y, value, size=16, color="#bcc6d8", bold=False):
    args += ["-font", BOLD if bold else FONT, "-pointsize", str(size), "-fill",color,
             "-gravity","northwest","-annotate", f"+{x}+{y}",value]

def place(args, image,x,y):
    args += [str(image),"-gravity","northwest","-geometry",f"+{x}+{y}","-composite"]

PRODUCTION.mkdir(parents=True,exist_ok=True)
(OUT / "masters").mkdir(exist_ok=True)
(OUT / "review").mkdir(exist_ok=True)
for item in MANIFEST["items"]:
    row,col = divmod(item["cell"],2)
    master = OUT / item["master"]
    magick(OUT/item["sheet"], "-crop", f"512x512+{col*512}+{row*512}", "+repage",
           "-trim", "+repage", "-resize","488x488","-gravity","center","-background","none",
           "-extent","512x512","-depth","8","-strip",master)
    runtime = PRODUCTION/item["file"]
    magick(master,"-resize","256x256","-depth","8","-strip",
           "-define","png:color-type=6","-define","png:compression-level=9",runtime)
    facts=magick(runtime,"-format","%w %h %[opaque] %[channels]","info:").strip()
    assert facts.startswith("256 256 False"), (item["file"],facts)
    magick(runtime,"-resize","40x40",OUT/"review"/f'{item["ids"][0]}-40.png')
    magick(runtime,"-resize","61x61","-gravity","center","-background","none","-extent","68x68",
           OUT/"review"/f'{item["ids"][0]}-68.png')

# Overview with actual menu and field sizes.
overview=["-size","1100x770","xc:#0d1021"]
text(overview,24,18,"Erste Rebellen-Gebäudeserie",30,"#edf0fa",True)
text(overview,24,62,"Aus game-data gewählt · sechs Startgebäude und zwei frühe Forschungsfreischaltungen",15)
for i,item in enumerate(MANIFEST["items"]):
    row,col=divmod(i,4)
    x,y=18+col*271,103+row*320
    overview += ["-fill","#191d30","-draw",f"roundrectangle {x},{y} {x+255},{y+300} 8,8"]
    text(overview,x+12,y+13,item["label"],17,"#e9bb7b",True)
    text(overview,x+12,y+42,str(item["ids"][0]),13,"#8e9bb0")
    large=OUT/"review"/f'{item["ids"][0]}-large.png'
    magick(PRODUCTION/item["file"],"-resize","156x156",large)
    place(overview,large,x+47,y+65)
    code="A410" if item["terrain"]=="water" else "C119"
    tile=OUT/"review"/f'{item["ids"][0]}-field.png'
    magick(ROOT/f"assets/generated/SWUfields/t{code}.png","-resize","68x68!",
           OUT/"review"/f'{item["ids"][0]}-68.png',"-gravity","center","-composite",tile)
    place(overview,tile,x+40,y+225)
    place(overview,OUT/"review"/f'{item["ids"][0]}-40.png',x+153,y+239)
    text(overview,x+39,y+286,"68 px",11,"#8e9bb0")
    text(overview,x+150,y+286,"40 px",11,"#8e9bb0")
text(overview,24,751,"Einheitliche transparente Einzelassets; Gelände bleibt sichtbar.",13,"#8e9bb0")
magick(*overview,OUT/"production-overview.png")

matrix=["-size","1020x1160","xc:#0d1021"]
text(matrix,24,18,"Feldgrößen und Gelände",28,"#edf0fa",True)
text(matrix,24,62,"68 px · Wasseranlage nur auf Wasser · Wald als rein visueller Kontrasttest",14)
for col,(label,_) in enumerate(TERRAINS):
    text(matrix,420+col*112,99,label,15,"#dce1ef",True)
for row,item in enumerate(MANIFEST["items"]):
    y=133+row*122
    text(matrix,24,y+15,item["label"],17,"#e9bb7b",True)
    summary = "Startgebäude der Rebellen" if item["ids"][0] == 82010100 else "Grundlagenforschung der Allianz" if item["researchId"] == 1001 else "Aqua-Zuchtfarm · Aufwand 5" if item["researchId"] == 220101 else "Chemische Fabrik · Aufwand 10"
    text(matrix,24,y+43,summary,11)
    large=OUT/"review"/f'{item["ids"][0]}-matrix.png'
    magick(PRODUCTION/item["file"],"-resize","104x104",large)
    place(matrix,large,291,y)
    for col,(label,code) in enumerate(TERRAINS):
        if (item["terrain"]=="water") != (code=="A410"):
            text(matrix,444+col*112,y+24,"—",20,"#58647b")
            continue
        tile=OUT/"review"/f'{item["ids"][0]}-{code}.png'
        magick(ROOT/f"assets/generated/SWUfields/t{code}.png","-resize","68x68!",
               OUT/"review"/f'{item["ids"][0]}-68.png',"-gravity","center","-composite",tile)
        place(matrix,tile,417+col*112,y+14)
text(matrix,24,1134,"Dies prüft die Darstellung; Bebaubarkeit und Forschungsregeln bleiben durch game-data bestimmt.",12,"#8e9bb0")
magick(*matrix,OUT/"terrain-review.png")
print("Exported 8 transparent 256x256 PNGs, normalized masters, overview and terrain review.")
