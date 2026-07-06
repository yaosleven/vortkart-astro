import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const pagesDir = 'C:/Users/qq294/Desktop/AO/vortkart-astro/src/pages';
const BASE_CONST = `\nconst base = import.meta.env.BASE_URL.replace(/\\/$/, '');\n`;

for (const fname of readdirSync(pagesDir)) {
  if (!fname.endsWith('.astro')) continue;
  const fpath = join(pagesDir, fname);
  let txt = readFileSync(fpath, 'utf-8');
  const orig = txt;

  // 1. Inject base const into frontmatter if not present
  if (!txt.includes('const base =')) {
    // split on first and second ---
    const idx1 = txt.indexOf('---');
    const idx2 = txt.indexOf('---', idx1 + 3);
    if (idx1 !== -1 && idx2 !== -1) {
      txt = txt.slice(0, idx2) + BASE_CONST + txt.slice(idx2);
    }
  }

  // 2. src="/images/..." -> src={`${base}/images/...`}
  txt = txt.replace(/src="(\/images\/[^"]+)"/g, 'src={`${base}$1`}');

  // 3. href="/about|services|listings|contact|product|project|privacy|terms|..."
  txt = txt.replace(/href="\/(about|services|listings|contact|product|project|privacy|terms)([^"]*)"/g,
    'href={`${base}/$1$2`}');

  // 4. href="/" -> href={`${base}/`}
  txt = txt.replace(/href="\/"/g, 'href={`${base}/`}');

  // 5. style background-image url('/images/...
  txt = txt.replace(/url\('(\/images\/[^']+)'\)/g, "url('${base}$1')");

  if (txt !== orig) {
    writeFileSync(fpath, txt, 'utf-8');
    console.log('Updated:', fname);
  } else {
    console.log('No change:', fname);
  }
}
console.log('Done.');
