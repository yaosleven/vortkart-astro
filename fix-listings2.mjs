import { readFileSync, writeFileSync } from 'fs';

const f = 'C:/Users/qq294/Desktop/AO/vortkart-astro/src/pages/listings.astro';
let txt = readFileSync(f, 'utf-8');

// Split the file into product-card sections by finding each card block
// Then replace the /product href in each block based on which image it contains

const productSlugs = [
  ['ev-pro-48/1.jpg',    'ev-pro-48'],
  ['duratrak-270/1.jpg', 'duratrak-270'],
  ['juniorsprint-ev/1',  'juniorsprint-ev'],
  ['proframe-r32/1.jpg', 'proframe-r32'],
  ['ev-max-72/1.jpg',    'ev-max-72'],
  ['duratrak-160/1.jpg', 'duratrak-160'],
];

const projectSlugs = [
  ['proframe-r32/4.jpg',  'speedzone-grand-prix'],
  ['duratrak-270/7.jpg',  'grand-marina-resort'],
  ['ev-pro-48/3.jpg',     'dubai-indoor-karting'],
  ['kids-racing/1.jpg',   'asiapac-family-karting'],
  ['duratrak-160/5.jpg',  'sunpark-gold-coast'],
  ['dual-rider/1.jpg',    'apex-corporate-london'],
];

// Process product cards
for (const [imgKey, slug] of productSlugs) {
  const imgIdx = txt.indexOf(imgKey);
  if (imgIdx === -1) { console.log('NOT FOUND:', imgKey); continue; }
  
  // Find the next occurrence of /product` after this image
  const searchStr = '${base}/product`}';
  const productIdx = txt.indexOf(searchStr, imgIdx);
  if (productIdx === -1) { console.log('No /product link after:', imgKey); continue; }
  
  // Replace only this occurrence
  txt = txt.slice(0, productIdx) + `\${base}/product/${slug}\`` + '}' + txt.slice(productIdx + searchStr.length);
  console.log(`✅ product/${slug}`);
}

// Process project cards (portfolio)
for (const [imgKey, slug] of projectSlugs) {
  const imgIdx = txt.indexOf(imgKey);
  if (imgIdx === -1) { console.log('NOT FOUND:', imgKey); continue; }
  
  const searchStr = '${base}/project`}';
  const projectIdx = txt.indexOf(searchStr, imgIdx);
  if (projectIdx === -1) { console.log('No /project link after:', imgKey); continue; }
  
  txt = txt.slice(0, projectIdx) + `\${base}/project/${slug}\`` + '}' + txt.slice(projectIdx + searchStr.length);
  console.log(`✅ project/${slug}`);
}

writeFileSync(f, txt, 'utf-8');
console.log('\nDone!');
