import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dirs = [
  'C:/Users/qq294/Desktop/AO/vortkart-astro/src/content/products',
  'C:/Users/qq294/Desktop/AO/vortkart-astro/src/content/projects',
];

for (const dir of dirs) {
  for (const fname of readdirSync(dir)) {
    if (!fname.endsWith('.md')) continue;
    const fp = join(dir, fname);
    let txt = readFileSync(fp, 'utf-8');
    // Remove slug: "..." line from frontmatter
    txt = txt.replace(/^slug:.*\n/m, '');
    writeFileSync(fp, txt, 'utf-8');
    console.log('Fixed:', fname);
  }
}
console.log('Done.');
