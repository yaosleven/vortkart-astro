// Create a slimmed copy of dist/ for Cloudflare Direct Upload (<25MB).
// Recompresses images IN PLACE (keeps filenames/extensions so HTML links stay valid).
// Run: node ad-assets/slim-build.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SRC = 'dist';
const DST = 'dist-slim';

// 1. Fresh copy
fs.rmSync(DST, { recursive: true, force: true });
execSync(`cp -r "${SRC}" "${DST}"`);
console.log('Copied dist -> dist-slim');

// 2. Recompress all images under dist-slim/images
const IMG_DIR = path.join(DST, 'images');
function walk(dir) {
  let files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(p));
    else files.push(p);
  }
  return files;
}

async function run() {
  const files = walk(IMG_DIR);
  let before = 0, after = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) continue;
    const orig = fs.statSync(f).size;
    before += orig;
    try {
      // Read into buffer first (avoids same-path read/write lock on spaced filenames).
      const input = fs.readFileSync(f);
      let img = sharp(input).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true });
      let buf;
      if (ext === '.png') buf = await img.png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer();
      else if (ext === '.webp') buf = await img.webp({ quality: 72 }).toBuffer();
      else buf = await img.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
      // Only overwrite if smaller
      if (buf.length < orig) fs.writeFileSync(f, buf);
      after += Math.min(buf.length, orig);
    } catch (e) { after += orig; console.warn('skip', f, e.message); }
  }
  console.log(`Images: ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(1)}MB`);
}
run().catch(e => { console.error(e); process.exit(1); });
