// 30s brand-story ad video with captions (ffmpeg).
// Run: node ad-assets/gen-video-30s.cjs
const { execFileSync } = require('child_process');
const path = require('path');

const IMG = 'ad-assets/images';
const OUT = 'ad-assets/video/vortkart-30s.mp4';
const FONT = 'C\\:/Windows/Fonts/arialbd.ttf';

// [image, caption] per scene — mirrors VIDEO-SCRIPTS.md 30s story
const scenes = [
  ['workshop-landscape-1200x628.jpg',    'It starts with raw steel'],
  ['workshop-square-1200x1200.jpg',      'Welded by 120+ skilled staff'],
  ['gas-landscape-1200x628.jpg',         '4130 Cr-Mo chassis  \u00b7  Honda GX'],
  ['racing-landscape-1200x628.jpg',      '100-point pre-shipment check'],
  ['commercial-landscape-1200x628.jpg',  'Electric & gas commercial karts'],
  ['commercial2-landscape-1200x628.jpg', 'From single karts to full tracks'],
  ['factory-landscape-1200x628.jpg',     'Trusted in 60+ countries'],
  ['electric-landscape-1200x628.jpg',    'Get a quote in 48 hours  \u2192  vortkart.com'],
];

const W = 1280, H = 720, DUR = 3.75;

const inputs = [];
scenes.forEach(([img]) => { inputs.push('-loop', '1', '-t', String(DUR), '-i', path.join(IMG, img)); });

function esc(t) { return t.replace(/'/g, "\\'").replace(/:/g, '\\:'); }

const parts = scenes.map(([, cap], i) => {
  const box = 'box=1:boxcolor=black@0.55:boxborderw=18';
  const draw = `drawtext=fontfile='${FONT}':text='${esc(cap)}':fontcolor=white:fontsize=42:${box}:x=(w-text_w)/2:y=h-120`;
  const brand = `drawtext=fontfile='${FONT}':text='VortKart\u00ae':fontcolor=#f97316:fontsize=30:x=40:y=40`;
  // gentle fade in/out per scene
  const fade = `fade=t=in:st=0:d=0.4,fade=t=out:st=${DUR-0.4}:d=0.4`;
  return `[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,${draw},${brand},${fade}[v${i}]`;
});

const concat = scenes.map((_, i) => `[v${i}]`).join('') + `concat=n=${scenes.length}:v=1:a=0,format=yuv420p[out]`;
const filter = parts.join(';') + ';' + concat;

const args = ['-y', '-loglevel', 'error', ...inputs,
  '-filter_complex', filter, '-map', '[out]',
  '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', OUT];

console.log('Rendering', OUT, '...');
execFileSync('ffmpeg', args, { stdio: 'inherit' });
console.log('\u2713 Done:', OUT);
