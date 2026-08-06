"""
Genereert content/blog-illustrations.ts met de echte pixelafmetingen van elke
blog-illustratie in public/illustrations/blog/. De blog-detailpagina gebruikt deze
map om de container-verhouding op het beeld af te stemmen, zodat geen enkel beeld
out-of-proportion (uitgerekt of piepklein in een te grote box) rendert.

Draai opnieuw na elke (her)generatie of vervanging van de illustraties:
    python scripts/gen-blog-illo-dims.py
"""
import glob
import os

from PIL import Image

entries = []
for f in sorted(glob.glob("public/illustrations/blog/*.png")):
    base = os.path.basename(f)
    if base.startswith("_"):
        continue
    slug = base[:-4]
    w, h = Image.open(f).size
    entries.append((slug, w, h))

with open("content/blog-illustrations.ts", "w", encoding="utf-8") as out:
    out.write("// AUTO-GEGENEREERD door scripts/gen-blog-illo-dims.py (PIL). Niet handmatig aanpassen.\n")
    out.write("// Echte pixelafmetingen per blog-illustratie, zodat de rendering de\n")
    out.write("// container-verhouding op het beeld afstemt (geen out-of-proportion beelden).\n\n")
    out.write("export const blogIllustrationDims: Record<string, { w: number; h: number }> = {\n")
    for slug, w, h in entries:
        out.write(f'  "{slug}": {{ w: {w}, h: {h} }},\n')
    out.write("};\n")

print(f"geschreven: {len(entries)} entries")
