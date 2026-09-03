const fs = require('fs');
const dmm = JSON.parse(fs.readFileSync('tools/doax/raw/ssr_data.json', 'utf8'));
const steam = JSON.parse(fs.readFileSync('tools/doax/raw/ssr_data_steam.json', 'utf8'));
const SSRG = { helena: 'elena', marie: 'marierose', meg: 'megu' };
const myId = (k) => SSRG[k] || k;
const num = (x) => +x || 0;
function norm(s) { return { id: s.id, girl: myId(s.girl), name: s.zhs_name || s.name, name_en: s.en_name || '', name_ja: s.name || '', name_tw: s.zht_name || '', type: (s.type || '').toLowerCase(), pow: num(s.pow), tec: num(s.tec), stm: num(s.stm), apl: num(s.apl), skills: [s.skill1, s.skill2, s.skill3].filter(Boolean), sell: s.sell || '', resell: s.resell || '', break: s.break || '' }; }
const suits = dmm.map(norm);
const steamByKey = {};
for (const s of steam.map(norm)) { if (!s.girl || !s.name_ja) continue; steamByKey[s.girl + '|' + s.name_ja] = s; }
let overlaid = 0;
for (const s of suits) { const st = steamByKey[s.girl + '|' + s.name_ja]; if (st) { s.steam = { pow: st.pow, tec: st.tec, stm: st.stm, apl: st.apl, sell: st.sell, resell: st.resell }; overlaid++; } }
fs.writeFileSync('src/data/doax-ssr.json', JSON.stringify(suits));
fs.copyFileSync('src/data/doax-ssr.json', 'public/data/doax-ssr.json');
console.log('suits=', suits.length, 'steam overlay=', overlaid);