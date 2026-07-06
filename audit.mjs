// Audit built dist/ HTML for broken paths
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distDir = 'C:/Users/qq294/Desktop/AO/vortkart-astro/dist';
const BASE = '/vortkart-astro';
const issues = [];

function checkFile(fpath, pageName) {
  const html = readFileSync(fpath, 'utf-8');

  // 1. href pointing to internal pages WITHOUT base prefix
  const badHrefs = [...html.matchAll(/href="(\/(about|services|listings|contact|product|project|privacy|terms|sitemap)[^"]*)"/g)];
  for (const m of badHrefs) {
    if (!m[1].startsWith(BASE)) {
      issues.push({ page: pageName, type: 'BAD HREF', value: m[1] });
    }
  }

  // 2. href="/" root link without base
  const rootHrefs = [...html.matchAll(/href="\/"/g)];
  for (const m of rootHrefs) {
    issues.push({ page: pageName, type: 'BAD ROOT HREF', value: '/' });
  }

  // 3. src="/images/..." without base
  const badSrcs = [...html.matchAll(/src="(\/images\/[^"]+)"/g)];
  for (const m of badSrcs) {
    issues.push({ page: pageName, type: 'BAD IMG SRC', value: m[1] });
  }

  // 4. background-image url without base
  const badBgs = [...html.matchAll(/url\('(\/images\/[^']+)'\)/g)];
  for (const m of badBgs) {
    issues.push({ page: pageName, type: 'BAD BG URL', value: m[1] });
  }

  // 5. src="/main.js" without base
  const badScripts = [...html.matchAll(/src="(\/main\.js)"/g)];
  for (const m of badScripts) {
    issues.push({ page: pageName, type: 'BAD SCRIPT SRC', value: m[1] });
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry === 'index.html') {
      const pageName = full.replace(distDir, '').replace(/\\/g, '/').replace('/index.html', '') || '/';
      checkFile(full, pageName);
    }
  }
}

walk(distDir);

if (issues.length === 0) {
  console.log('✅ No broken paths found!');
} else {
  console.log(`❌ Found ${issues.length} issues:\n`);
  for (const i of issues) {
    console.log(`  [${i.page}] ${i.type}: ${i.value}`);
  }
}
