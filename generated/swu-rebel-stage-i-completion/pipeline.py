#!/usr/bin/env python3
"""Export one thematic asset batch and its size/terrain review artifacts."""
from pathlib import Path
import json, subprocess, sys
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
plan = json.loads((HERE / "plan.json").read_text())
slug = sys.argv[1]
assert slug in {b["slug"] for b in plan["batches"]}
OUT = HERE / slug
m = json.loads((OUT / "manifest.json").read_text())
assert m["sourceSheet"], "Generate the source sheet first"
PRODUCTION = ROOT / "assets/buildings/generated"
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
def magick(*args):
    return subprocess.run(["magick", *map(str, args)], check=True, capture_output=True, text=True).stdout
def label(a,x,y,s,size=14,color="#bbc7d8",bold=False):
    a.extend(["-font",BOLD if bold else FONT,"-pointsize",str(size),"-fill",color,
              "-gravity","northwest","-annotate",f"+{x}+{y}",s])
def place(a,p,x,y):
    a.extend([str(p),"-gravity","northwest","-geometry",f"+{x}+{y}","-composite"])
(OUT/"masters").mkdir(exist_ok=True)
(OUT/"review").mkdir(exist_ok=True)
dims=magick(OUT/m["sourceSheet"],"-format","%w %h","info:").split()
width,height=map(int,dims)
cols,rows=m["grid"]["columns"],m["grid"]["rows"]
report=[]
for item in m["items"]:
    row,col=divmod(item["cell"],cols)
    x0,x1=round(col*width/cols),round((col+1)*width/cols)
    y0,y1=round(row*height/rows),round((row+1)*height/rows)
    master=OUT/item["master"]
    magick(OUT/m["sourceSheet"],"-crop",f"{x1-x0}x{y1-y0}+{x0}+{y0}","+repage",
           "-trim","+repage","-resize","488x488","-gravity","center","-background","none",
           "-extent","512x512","-depth","8","-strip",master)
    png=PRODUCTION/item["file"]
    magick(master,"-resize","256x256","-depth","8","-strip",
           "-define","png:color-type=6","-define","png:compression-level=9",png)
    facts=magick(png,"-format","%w %h %[opaque] %[channels]","info:").strip()
    assert facts.startswith("256 256 False"), (item["file"],facts)
    magick(png,"-resize","40x40",OUT/"review"/f'{item["ids"][0]}-40.png')
    magick(png,"-resize","61x61","-background","none","-gravity","center","-extent","68x68",
           OUT/"review"/f'{item["ids"][0]}-68.png')
    report.append({"file":item["file"],"facts":facts,"bytes":png.stat().st_size})
n=len(m["items"])
overview=["-size",f"{max(n*271+16,558)}x450","xc:#0d1021"]
label(overview,24,18,m["title"],25,"#edf0fa",True)
label(overview,24,60,"Star-Wars-Grundstücke · transparente Einzelassets · 40/68px",14)
for i,item in enumerate(m["items"]):
    x,y=18+i*271,103
    overview.extend(["-fill","#191d30","-draw",f"roundrectangle {x},{y} {x+255},{y+300} 8,8"])
    label(overview,x+12,y+13,item["label"],14,"#e9bc7f",True)
    label(overview,x+12,y+42,str(item["ids"][0]),12,"#8c9bad")
    large=OUT/"review"/f'{item["ids"][0]}-large.png'
    magick(PRODUCTION/item["file"],"-resize","156x156",large)
    place(overview,large,x+47,y+64)
    p=item["previews"][0]
    tile=OUT/"review"/f'{item["ids"][0]}-field.png'
    magick(ROOT/"assets"/p["file"],"-resize","68x68!",OUT/"review"/f'{item["ids"][0]}-68.png',
           "-gravity","center","-composite",tile)
    place(overview,tile,x+40,y+225)
    place(overview,OUT/"review"/f'{item["ids"][0]}-40.png',x+153,y+239)
    label(overview,x+37,y+286,"68 px",11,"#8c9bad")
    label(overview,x+148,y+286,"40 px",11,"#8c9bad")
label(overview,24,431,"Gebäudefunktion, Kamera und Maßstab auf Feldgröße abgestimmt.",12,"#8c9bad")
magick(*overview,OUT/"production-overview.png")
matrix=["-size",f"920x{n*132+120}","xc:#0d1021"]
label(matrix,24,18,"Feldgrößen und passende Gelände",25,"#edf0fa",True)
label(matrix,24,62,"Geprüfte Freigaben · Sonderplatzierungen und Upgrades separat berücksichtigt",13)
for row,item in enumerate(m["items"]):
    y=95+row*132
    label(matrix,24,y+15,item["label"],16,"#e9bc7f",True)
    label(matrix,24,y+44,f"Forschung {item['researchId']} · Aufwand {item['effort']}",11)
    large=OUT/"review"/f'{item["ids"][0]}-matrix.png'
    magick(PRODUCTION/item["file"],"-resize","104x104",large)
    place(matrix,large,316,y)
    for j,p in enumerate(item["previews"]):
        tile=OUT/"review"/f'{item["ids"][0]}-{p["code"]}.png'
        magick(ROOT/"assets"/p["file"],"-resize","68x68!",OUT/"review"/f'{item["ids"][0]}-68.png',
               "-gravity","center","-composite",tile)
        place(matrix,tile,476+j*125,y+5)
        label(matrix,468+j*125,y+85,p["label"],11,"#8c9bad")
label(matrix,24,n*132+100,"Bebaubarkeit, Forschung, Gebäudezustände und Terrain wurden nicht geändert.",12,"#8c9bad")
magick(*matrix,OUT/"terrain-review.png")
(OUT/"export-report.json").write_text(json.dumps(report,indent=2)+"\n")
print(f"Exported {n} families / {sum(len(i['ids']) for i in m['items'])} IDs: {slug}")
