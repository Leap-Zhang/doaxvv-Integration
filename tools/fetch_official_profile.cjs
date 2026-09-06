const https = require('https');
const fs = require('fs');

const MAP = {
  misaki:'c00', marierose:'c01', honoka:'c02', kasumi:'c03', ayane:'c04', kokoro:'c05',
  nyotengu:'c06', hitomi:'c07', momiji:'c08', elena:'c09', luna:'c10', tamaki:'c11',
  leifang:'c12', fiona:'c13', nagisa:'c14', kanna:'c15', monica:'c16', sayuri:'c17',
  patty:'c18', tsukushi:'c19', lobelia:'c20', nanami:'c21', elise:'c22', koharu:'c23',
  tina:'c24', amy:'c25', shandy:'c26', yukino:'c2701801', shizuku:'c2843417', reika:'c2983795',
  megu:'c3024051', azusa:'c3154457'
};

function get(url){
  return new Promise((resolve,reject)=>{
    https.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},res=>{
      if(res.statusCode>=300 && res.statusCode<400 && res.headers.location){ resolve({url,redirect:true,location:res.headers.location}); return; }
      let d=''; res.on('data',c=>d+=c); res.on('end',()=>resolve({url,body:d,status:res.statusCode}));
    }).on('error',reject);
  });
}

function parseCaption(html){
  const m = html.match(/<span class\s*=\s*"inner">([\s\S]*?)<\/span>/);
  if(!m) return null;
  const text = m[1].replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'').trim();
  const out = {};
  for(const line of text.split('\n')){
    const idx = line.indexOf(':');
    if(idx>0){ const k=line.slice(0,idx).trim(); const v=line.slice(idx+1).trim(); out[k]=v; }
  }
  return out;
}

(async()=>{
  const result = {};
  const errors = [];
  for(const [gid,cid] of Object.entries(MAP)){
    try{
      const r = await get('https://game-test.doaxvv.com/cn/'+cid+'.html');
      if(r.redirect){ result[gid]={redirect:true,to:r.location}; continue; }
      const cap = parseCaption(r.body||'');
      if(!cap){ result[gid]={error:'no caption',len:(r.body||'').length}; continue; }
      result[gid]=cap;
      await new Promise(r2=>setTimeout(r2,120));
    }catch(e){ errors.push(gid+':'+e.message); result[gid]={error:e.message}; }
  }
  fs.writeFileSync('tools/official-profiles-raw.json', JSON.stringify(result,null,2));
  console.log('fetched:', Object.keys(result).length, 'errors:', errors.length, errors.join(','));
  const sample = result.misaki || result.kokoro || result; 
  console.log('SAMPLE:', JSON.stringify(sample));
})();