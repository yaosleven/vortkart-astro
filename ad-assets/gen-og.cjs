// Generate a proper 1200x630 branded OG image (JPG) for social sharing.
const sharp = require('sharp');
const SRC = 'public/images/fl-270/Recreational go-karting1.webp';
const OUT = 'public/images/og-default.jpg';
const W = 1200, H = 630;

async function run() {
  // Base: product photo cropped to 1200x630
  const base = await sharp(SRC)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .toBuffer();

  // Dark gradient overlay (bottom) for text legibility
  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="45%" stop-color="rgba(6,8,13,0)"/>
          <stop offset="100%" stop-color="rgba(6,8,13,0.88)"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="60" y="540" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">VortKart&#174;</text>
      <text x="60" y="590" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="#f97316">Commercial Go Kart Manufacturer &#183; Factory-Direct</text>
    </svg>`
  );

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(OUT);
  console.log('\u2713 OG image:', OUT, `${W}x${H}`);
}
run().catch(e => { console.error(e); process.exit(1); });
