import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename, extname } from "path";

const brandDir = join(process.cwd(), "public", "brand");
const svgFiles = readdirSync(brandDir).filter((f) => f.endsWith(".svg"));

for (const file of svgFiles) {
  const svgPath = join(brandDir, file);
  const svg = readFileSync(svgPath, "utf-8");

  // Use 2x scale for crisp output
  const resvg = new Resvg(svg, {
    fitTo: { mode: "zoom", value: 2 },
    font: {
      loadSystemFonts: true,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const pngName = basename(file, extname(file)) + ".png";
  const pngPath = join(brandDir, pngName);
  writeFileSync(pngPath, pngBuffer);

  console.log(`${file} -> ${pngName} (${pngData.width}x${pngData.height})`);
}
