// Rename image files/dirs: spaces -> dashes, and update all references in src/.
// Run: node ad-assets/fix-spaces.cjs
const fs = require('fs');
const path = require('path');

const IMG = 'public/images';
const renames = []; // { from: '/images/..old..', to: '/images/..new..' }

// 1. Rename files inside dirs first (bottom-up), then dirs.
function collectFiles(dir) {
  let files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(collectFiles(p));
    else files.push(p);
  }
  return files;
}

// Rename files (keep dir for now)
for (const f of collectFiles(IMG)) {
  const base = path.basename(f);
  if (base.includes(' ')) {
    const newBase = base.replace(/ /g, '-');
    const dir = path.dirname(f);
    const np = path.join(dir, newBase);
    fs.renameSync(f, np);
  }
}

// Rename dirs with spaces (top-level under images)
for (const e of fs.readdirSync(IMG, { withFileTypes: true })) {
  if (e.isDirectory() && e.name.includes(' ')) {
    const from = path.join(IMG, e.name);
    const to = path.join(IMG, e.name.replace(/ /g, '-'));
    fs.renameSync(from, to);
    renames.push({ oldDir: e.name, newDir: e.name.replace(/ /g, '-') });
  }
}

// 2. Update references in src/ : any /images/....with spaces....(ext) -> dashes
function walkSrc(dir) {
  let files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walkSrc(p));
    else if (/\.(astro|md|mdx|ts|js|json)$/.test(e.name)) files.push(p);
  }
  return files;
}

// Replace spaces with dashes ONLY inside /images/... image paths.
const rx = /\/images\/[^"'`)\s][^"'`)]*?\.(webp|png|jpg|jpeg)/gi;
let changed = 0;
for (const f of walkSrc('src')) {
  let txt = fs.readFileSync(f, 'utf8');
  const out = txt.replace(rx, m => m.replace(/ /g, '-'));
  if (out !== txt) { fs.writeFileSync(f, out); changed++; }
}
console.log('Renamed dirs:', JSON.stringify(renames));
console.log('Updated src files:', changed);
