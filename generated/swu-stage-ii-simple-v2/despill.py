"""Remove magenta spill connected to already transparent backing, not inside parts."""
from collections import deque
from pathlib import Path
import json, subprocess, sys
p=Path(sys.argv[1])
w,h=map(int,subprocess.check_output(['magick',str(p),'-format','%w %h','info:']).split())
rgba=bytearray(subprocess.check_output(['magick',str(p),'-depth','8','rgba:-']))
n=w*h; q=deque(); removed=0
protected=bytearray(n)
restored=0
# Reviewed emissive violet cores can share the backing colour. Restore their
# source alpha and exclude these interior regions from the backing flood-fill.
# They lie wholly inside the equipment, not in orbital gaps or between sprites.
regions=[]
if len(sys.argv)>3:
    manifest=json.loads(Path(sys.argv[3]).read_text())
    regions=manifest.get('protectedAlphaRegions',[])
    if regions:
        original=subprocess.check_output(['magick',sys.argv[2],'-depth','8','rgba:-'])
        assert len(original)==len(rgba), 'Source/protection dimensions mismatch'
        for region in regions:
            cx,cy,rx,ry=region['ellipse']
            for y in range(max(0,int(cy-ry)),min(h,int(cy+ry)+1)):
                for x in range(max(0,int(cx-rx)),min(w,int(cx+rx)+1)):
                    if ((x-cx)/rx)**2+((y-cy)/ry)**2<=1:
                        i=y*w+x; protected[i]=1
                        if rgba[i*4+3]!=original[i*4+3]: restored+=1
                        rgba[i*4+3]=original[i*4+3]
def purple(i):
    a=i*4
    return not protected[i] and rgba[a]-rgba[a+1]>12 and rgba[a+2]-rgba[a+1]>12 and abs(rgba[a]-rgba[a+2])<85
def neighbours(i):
    if i%w: yield i-1
    if i%w<w-1: yield i+1
    if i>=w: yield i-w
    if i<n-w: yield i+w
for i in range(n):
    if rgba[i*4+3] and purple(i) and any(rgba[j*4+3]==0 for j in neighbours(i)):
        rgba[i*4+3]=0; q.append(i); removed+=1
while q:
    for j in neighbours(q.popleft()):
        if rgba[j*4+3] and purple(j):
            rgba[j*4+3]=0; q.append(j); removed+=1
subprocess.run(['magick','-size',f'{w}x{h}','-depth','8','rgba:-','-define','png:color-type=6',str(p)],input=rgba,check=True,capture_output=True)
(p.parent/'despill-report.json').write_text(json.dumps({'method':'Only purple colour spill connected to transparent backing; reviewed emissive cores protected with original source alpha','pixelsRemoved':removed,'pixelsAlphaRestored':restored,'protectedRegions':regions},indent=2)+'\n')
