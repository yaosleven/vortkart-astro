import { readFileSync, writeFileSync } from 'fs';

const f = 'C:/Users/qq294/Desktop/AO/vortkart-astro/src/pages/listings.astro';
let txt = readFileSync(f, 'utf-8');

// ── 1. Remove the 5 remaining hardcoded product cards (REMOVE marker → closing </section>)
// They start at the REMOVE marker and end just before the projects <section>
const removeStart = txt.indexOf('      {/* remaining hardcoded cards removed');
const projectSectionStart = txt.indexOf('<section class="section" style="background:var(--dark)">');
if (removeStart === -1 || projectSectionStart === -1) {
  console.error('Markers not found!');
  process.exit(1);
}
// Cut from REMOVE marker to just before the projects section
// But we need to close the </div></div></section> that wraps the products grid
// Find the closing tags for: </div> (grid-3), </div> (container), </section>
const oldProductsTail = txt.slice(removeStart, projectSectionStart);
txt = txt.slice(0, removeStart) + '    </div>\n  </div>\n</section>\n' + txt.slice(projectSectionStart);

// ── 2. Replace the entire hardcoded portfolio grid with a dynamic loop
const portfolioGridStart = txt.indexOf('  <div class="portfolio-grid">');
const portfolioGridEnd   = txt.indexOf('  </div>\n</div></section>', portfolioGridStart) + '  </div>\n</div></section>'.length;
if (portfolioGridStart === -1 || portfolioGridEnd === -1) {
  console.error('portfolio-grid markers not found');
  process.exit(1);
}

const dynamicGrid = `  <div class="portfolio-grid">
    {projects.map((proj, i) => {
      const isFeatured = proj.data.featured === true && i === 0;
      const delay = ['','delay-1','delay-2','delay-3'][i % 4];
      const stats = proj.data.stats ?? {};
      const statEntries = Object.entries({
        ...(stats.trackLength ? { Track: stats.trackLength } : {}),
        ...(stats.kartCount   ? { Karts: stats.kartCount }   : {}),
        ...(stats.duration    ? { Timeline: stats.duration } : {}),
        ...(stats.investment  ? { Value: stats.investment }  : {}),
      }).slice(0, 3);
      return (
        <div class={\`portfolio-card \${isFeatured ? 'featured' : ''} fade-in \${delay}\`} data-category={proj.data.category}>
          <div class="portfolio-img">
            <img src={\`\${base}\${proj.data.image}\`} alt={proj.data.title} loading="lazy" />
            <div class="portfolio-overlay"></div>
            <a href={\`\${base}/project/\${proj.slug}\`} class="portfolio-view-btn">View Project</a>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-meta">
              <span class="portfolio-category">{proj.data.category.charAt(0).toUpperCase() + proj.data.category.slice(1)}</span>
              <span class="portfolio-country">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {proj.data.country ?? proj.data.location}
              </span>
            </div>
            <h4>{proj.data.title}</h4>
            <div class="portfolio-stats">
              {statEntries.map(([label, value]) => (
                <div class="portfolio-stat-item">
                  <div class="num">{String(value).replace(/[^0-9.$£€kmMK+]+.*$/, '') || value}</div>
                  <div class="lbl">{label}</div>
                </div>
              ))}
            </div>
            {(proj.data.tags ?? []).length > 0 && (
              <div class="portfolio-tags">
                {(proj.data.tags ?? []).map(t => <span class="portfolio-tag">{t}</span>)}
              </div>
            )}
          </div>
        </div>
      );
    })}
    {/* ↑ Add a new .md file to src/content/projects/ — it auto-appears here */}
  </div>
</div></section>`;

txt = txt.slice(0, portfolioGridStart) + dynamicGrid + txt.slice(portfolioGridEnd);

writeFileSync(f, txt, 'utf-8');
console.log('Done! listings.astro is now fully dynamic.');
