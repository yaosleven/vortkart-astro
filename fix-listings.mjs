import { readFileSync, writeFileSync } from 'fs';

const f = 'C:/Users/qq294/Desktop/AO/vortkart-astro/src/pages/listings.astro';
let txt = readFileSync(f, 'utf-8');
const orig = txt;

// Product slug map: href text near the link -> slug
const productMap = [
  ['ev-pro-48/1.jpg',     'ev-pro-48'],
  ['duratrak-270/1.jpg',  'duratrak-270'],
  ['juniorsprint-ev/1',   'juniorsprint-ev'],
  ['proframe-r32/1.jpg',  'proframe-r32'],
  ['ev-max-72/1.jpg',     'ev-max-72'],
  ['duratrak-160/1.jpg',  'duratrak-160'],
];

// Project slug map
const projectMap = [
  ['proframe-r32/4.jpg',  'speedzone-grand-prix'],
  ['duratrak-270/7.jpg',  'grand-marina-resort'],
  ['ev-pro-48/3.jpg',     'dubai-indoor-karting'],
  ['kids-racing/1.jpg',   'asiapac-family-karting'],
  ['duratrak-160/5.jpg',  'sunpark-gold-coast'],
  ['dual-rider/1.jpg',    'apex-corporate-london'],
];

// Split into product cards and process each
// Strategy: find each product-card block and replace its /product href with the correct slug
for (const [imgKey, slug] of productMap) {
  // Find the product card containing this image and replace href="${base}/product" with href="${base}/product/slug"
  const regex = new RegExp(
    `(${imgKey}[^]*?href=\\{\`\\$\\{base\\}/product\\}[^"]*?)(\`)`,
    'g'
  );
  txt = txt.replace(
    new RegExp(`(${imgKey.replace(/\//g, '\\/')}.{0,600}?href=\\\{[^}]*?\/product\\\})`, 'gs'),
    (match) => match.replace(/\/product(`|")/, `/product/${slug}$1`)
  );
}

// For portfolio cards: replace href="${base}/project" with correct project slug
// Each card has a unique image — use that as anchor
for (const [imgKey, slug] of projectMap) {
  txt = txt.replace(
    new RegExp(`(${imgKey.replace(/\//g, '\\/')}.{0,400}?href=\\\{[^}]*?\/project\\\})`, 'gs'),
    (match) => match.replace(/\/project(`|")/, `/project/${slug}$1`)
  );
}

if (txt !== orig) {
  writeFileSync(f, txt, 'utf-8');
  console.log('listings.astro updated');
} else {
  console.log('No changes made');
}
