// 15s slideshow ad video with on-screen captions (ffmpeg).
// Run: node ad-assets/gen-video.cjs
const { execFileSync } = require('child_process');
const path = require('path');

const IMG = 'ad-assets/images';
const OUT = 'ad-assets/video/vortkart-15s.mp4';
const FONT = 'C\\:/Windows/Fonts/arialbd.ttf'; // escaped colon for ffmpeg filter

// [image, caption] per 2.5s scene
const scenes = [
  ['factory-landscape-1200x628.jpg',    'Commercial Go Kart Manufacturer'],
  ['workshop-landscape-1200x628.jpg',   'Factory-Direct  \u00b7  OEM & ODM'],
  ['commercial-landscape-1200x628.jpg', 'Electric & Gas  \u00b7  5-Unit MOQ'],
  ['electric-landscape-1200x628.jpg',   'Ships to 60+ Countries'],
  ['racing-landscape-1200x628.jpg',     'ISO  \u00b7  CE  \u00b7  SGS Certified'],
  ['commercial2-landscape-1200x628.jpg','Get a Factory Quote  \u2192  vortkart.com'],
];

const W = 1280, H = 720, DUR = 2.5;

const inputs = [];
scenes.forEach(([img]) => {
  inputs.push('-loop', '1', '-t', String(DUR), '-i', path.join(IMG, img));
});

function esc(t) { return t.replace(/'/g, "\\'").replace(/:/g, '\\:'); }

const parts = scenes.map(([, cap], i) => {
  const box = 'box=1:boxcolor=black@0.55:boxborderw=18';
  const draw = `drawtext=fontfile='${FONT}':text='${esc(cap)}':fontcolor=white:fontsize=44:${box}:x=(w-text_w)/2:y=h-120`;
  const brand = `drawtext=fontfile='${FONT}':text='VortKart\u00ae':fontcolor=#f97316:fontsize=30:x=40:y=40`;
  return `[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,${draw},${brand}[v${i}]`;
});

const concat = scenes.map((_, i) => `[v${i}]`).join('') + `concat=n=${scenes.length}:v=1:a=0,format=yuv420p[out]`;
const filter = parts.join(';') + ';' + concat;

const args = ['-y', '-loglevel', 'error', ...inputs,
  '-filter_complex', filter, '-map', '[out]',
  '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', OUT];

console.log('Rendering', OUT, '...');
execFileSync('ffmpeg', args, { stdio: 'inherit' });
console.log('\u2713 Done:', OUT);
