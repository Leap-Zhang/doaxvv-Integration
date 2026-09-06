const fs = require('fs');
const path = require('path');
const suits = JSON.parse(fs.readFileSync('src/data/doax-ssr.json','utf8'));
const girlNames = JSON.parse(fs.readFileSync('src/data/girl-names.json','utf8'));
const outDir = 'public/data/suits';
fs.mkdirSync(outDir, { recursive: true });
const counts = {};
const ids = Object.keys(girlNames);
ids.forEach((gid) => {
  const slice = suits.filter((s) => s.girl === gid);
  fs.writeFileSync(path.join(outDir, gid + '.json'), JSON.stringify(slice));
  counts[gid] = slice.length;
});
const total = Object.values(counts).reduce((a,b)=>a+b,0);
fs.writeFileSync(path.join(outDir,'_manifest.json'), JSON.stringify({ total, counts }, null, 2));
console.log('girls:', ids.length, '| suit entries in slices:', total, '| of total', suits.length);
console.log('elena/marierose/megu:', counts.elena, counts.marierose, counts.megu);