const fs=require('fs');const c=fs.readFileSync('src/pages/swimsuits/index.astro','utf8');
// filter bar buttons (sImg area)
let i=c.indexOf('id="sImg"');console.log('sImg ctx:', c.slice(i-120,i+80).replace(/\n/g,' '));
console.log('---');
// card fav-a button area
i=c.indexOf('class="fav-a');console.log('fav-a ctx:', c.slice(i-40,i+20).replace(/\n/g,' '));
console.log('--- card img line');
const m=c.match(/[^\n]*suitThumb\(s\.id\)[^\n]*/);console.log(m&&m[0].trim().slice(0,120));
console.log('--- modal img line');
const mm=c.match(/img: suitImg\(s\)/);console.log(mm&&mm[0]);
console.log('--- client state init area (after let ... )');
i=c.indexOf('let onlyImg');console.log(c.slice(i-10,i+20).replace(/\n/g,' '));