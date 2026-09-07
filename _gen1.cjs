const fs=require('fs'),https=require('https');
const firstSuit=JSON.parse(fs.readFileSync('data/girl-first-suit.json','utf8'));
const wsrv=(id,w,f)=>'https://wsrv.nl/?url='+encodeURIComponent('https://cdn.jsdelivr.net/gh/doaxcc/doaxvv_bromide@main/pic_star/'+id+'.png')+'&w='+w+(f?'&h='+w+'&fit=cover':'')+'&q=85&output=webp';
function get(url){return new Promise((res,rej)=>{https.get(url,r=>{if(r.statusCode!==200){r.resume();return rej(new Error('HTTP '+r.statusCode));}const a=[];r.on('data',c=>a.push(c));r.on('end',()=>res(Buffer.concat(a)));}).on('error',rej);});}
(async()=>{const girls=Object.keys(firstSuit);let ok=0;
for(const g of girls){ try{const b=await get(wsrv(firstSuit[g],600,true));fs.writeFileSync('public/img/bromide/girls/'+g+'.webp',b);ok++;}catch(e){console.log('  fail girl',g,e.message);} }
console.log('girl portraits generated=',ok,'/',girls.length);
})().catch(e=>{console.error(e);process.exit(1)});