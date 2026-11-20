#!/usr/bin/env python3
"""Render the consolidated 42-family catalogue from the verified manifest."""
from pathlib import Path
import json, subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
DATA=json.loads((HERE/"full-verification.json").read_text())
ITEMS=DATA["items"]
FONT="/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD="/System/Library/Fonts/Supplemental/Arial Bold.ttf"
def magick(*args):
    subprocess.run(["magick",*map(str,args)],check=True,capture_output=True)
def label(a,x,y,text,size=14,color="#bac8db",bold=False):
    a.extend(["-font",BOLD if bold else FONT,"-pointsize",str(size),"-fill",color,
              "-gravity","northwest","-annotate",f"+{x}+{y}",text])
def place(a,p,x,y):
    a.extend([str(p),"-gravity","northwest","-geometry",f"+{x}+{y}","-composite"])
review=HERE/"review"/"full"
review.mkdir(parents=True,exist_ok=True)
cols=6
rows=(len(ITEMS)+cols-1)//cols
args=["-size",f"{cols*230+24}x{rows*288+138}","xc:#0d1021"]
label(args,24,18,"Rebellen-Gebäude · vollständige Stufe-I-Serie",28,"#edf0fa",True)
label(args,24,61,"42 Familien · 94 IDs · inklusive Forschungszentrum II · Star-Wars-Grundstücke",16)
for index,item in enumerate(ITEMS):
    row,col=divmod(index,cols)
    x,y=18+col*230,104+row*288
    args.extend(["-fill","#191d30","-draw",f"roundrectangle {x},{y} {x+217},{y+271} 8,8"])
    # Two lines for long compound names, without changing the data label.
    title=item["label"]
    if len(title)>24:
        if " " in title:
            words=title.split(); split=len(words)//2
            title=" ".join(words[:split])+"\n"+" ".join(words[split:])
        else:
            title=title.replace("-","-\n",1)
    label(args,x+10,y+10,title,13,"#e9bc7f",True)
    label(args,x+10,y+45,str(item["ids"][0]),10,"#899ab2")
    source=ROOT/"assets/buildings/generated"/item["file"]
    large=review/f"{index}-large.png"
    magick(source,"-resize","124x124",large)
    place(args,large,x+47,y+65)
    menu=review/f"{index}-menu.png"
    magick(source,"-resize","40x40",menu)
    place(args,menu,x+159,y+220)
    code=item["previewCode"]
    if item.get("previews"):
        terrain=ROOT/"assets"/item["previews"][0]["file"]
    else:
        terrain=ROOT/"assets/generated/SWUfields"/f"t{code}.png"
    field=review/f"{index}-field.png"
    building=review/f"{index}-68.png"
    magick(source,"-resize","61x61","-background","none","-gravity","center","-extent","68x68",building)
    magick(terrain,"-resize","68x68!",building,"-gravity","center","-composite",field)
    place(args,field,x+14,y+196)
    label(args,x+88,y+240,"68 / 40 px",10,"#899ab2")
label(args,24,rows*288+115,"PNG 256px transparent · Master 512px · Quellen und Prompts erhalten · vollständig angebunden und geprüft",12)
magick(*args,HERE/"full-overview.png")
print("Rendered 42-family overview")
