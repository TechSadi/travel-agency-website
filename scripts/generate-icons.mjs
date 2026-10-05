// Generates the favicon and app icons in src/app from public/images/logo-mark.png.
// Run with `node scripts/generate-icons.mjs` after the logo changes.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = "public/images/logo-mark.png";
const white = { r: 255, g: 255, b: 255, alpha: 1 };
const clear = { r: 0, g: 0, b: 0, alpha: 0 };

/** The mark centred on a square canvas, with `inset` px of padding on each side. */
function square(size, { inset = 0, background = clear } = {}) {
  const inner = size - inset * 2;
  return sharp(source)
    .resize(inner, inner, { fit: "contain", background: clear })
    .extend({ top: inset, bottom: inset, left: inset, right: inset, background })
    .flatten(background.alpha === 1 ? { background } : false)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** An .ico file holding PNG images, which every current browser accepts. */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const faviconSizes = [16, 32, 48];
const favicon = ico(await Promise.all(faviconSizes.map(async (size) => ({ size, data: await square(size) }))));

await writeFile("src/app/favicon.ico", favicon);
await writeFile("src/app/icon.png", await square(192));
// iOS ignores transparency and adds no padding, so give the touch icon a white tile.
await writeFile("src/app/apple-icon.png", await square(180, { inset: 18, background: white }));
console.log("Wrote src/app/favicon.ico, icon.png and apple-icon.png");
