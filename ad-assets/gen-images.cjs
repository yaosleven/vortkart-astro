// Google Ads image asset generator — crops real site photos to ad specs.
// Run: node ad-assets/gen-images.js
const sharp = require('sharp');
const path = require('path');

const SRC = 'public/images';
const OUT = 'ad-assets/images';

// Source photos chosen for each theme (real factory & product shots)
const sources = {
  commercial:  `${SRC}/fl-270/Recreational go-karting1.webp`,
  commercial2: `${SRC}/fl-270/Recreational go-karting3.webp`,
  gas:         `${SRC}/fr-200x/${require('fs').readdirSync(SRC+'/fr-200x')[0]}`,
  electric:    `${SRC}/el-2500/${require('fs').readdirSync(SRC+'/el-2500')[0]}`,
  racing:      `${SRC}/kz-class-chassis/${require('fs').readdirSync(SRC+'/kz-class-chassis')[0]}`,
  junior:      `${SRC}/junior gasoline/${require('fs').readdirSync(SRC+'/junior gasoline')[0]}`,
  factory:     `${SRC}/history/2024-campus.png`,
  workshop:    `${SRC}/history/2009-workshop.png`,
};

// Ad format specs
const formats = [
  { name: 'landscape', w: 1200, h: 628 },  // 1.91:1
  { name: 'square',    w: 1200, h: 1200 }, // 1:1
  { name: 'portrait',  w: 960,  h: 1200 }, // 4:5
];

async function run() {
  let count = 0;
  for (const [theme, src] of Object.entries(sources)) {
    for (const f of formats) {
      const outFile = path.join(OUT, `${theme}-${f.name}-${f.w}x${f.h}.jpg`);
      await sharp(src)
        .resize(f.w, f.h, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(outFile);
      count++;
      console.log('✓', outFile);
    }
  }
  console.log(`\nGenerated ${count} ad images.`);
}
run().catch(e => { console.error(e); process.exit(1); });
