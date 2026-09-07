const fs=require('fs');const c=fs.readFileSync('src/pages/swimsuits/index.astro','utf8');
// cdnStar / suitThumb defs
for(const k of ['const cdnStar =','const suitThumb =']){let i=c.indexOf(k);console.log('### '+k);console.log(c.slice(i,i+240).replace(/\n/g,' '));}
// sImg button full
let i=c.indexOf('id="sImg"');console.log('### sImg btn');console.log(c.slice(i,i+120).replace(/\n/g,' '));
// fav-a button full (start to >)
i=c.indexOf('class="fav-a');console.log('### fav-a btn');console.log(c.slice(i-10,i+90).replace(/\n/g,' '));