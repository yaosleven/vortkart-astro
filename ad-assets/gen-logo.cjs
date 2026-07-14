// Logo asset generator for Google Ads (square 1:1 + landscape 4:1, white bg).
const sharp = require('sharp');
const SRC = 'public/images/logo.png';
const OUT = 'ad-assets/logo';

async function make(w, h, name) {
  // Fit logo inside with padding on white background
  const padX = Math.round(w * 0.12);
  const padY = Math.round(h * 0.18);
  const logo = await sharp(SRC)
    .resize(w - padX * 2, h - padY * 2, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  await sharp({ create: { width: w, height: h, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(`${OUT}/${name}`);
  console.log('✓', `${OUT}/${name}`, `${w}x${h}`);
}

(async () => {
  await make(1200, 1200, 'logo-square-1200x1200.png');   // 1:1
  await make(1200, 300,  'logo-landscape-1200x300.png'); // 4:1
  await make(512, 512,   'logo-square-512.png');          // small 1:1
  console.log('\nLogo assets done.');
})().catch(e => { console.error(e); process.exit(1); });
