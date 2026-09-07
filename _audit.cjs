const fs=require('fs'),path=require('path');const root='src';const files=[];(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const fp=path.join(d,e.name);if(e.isDirectory())w(fp);else if(/\.(astro|js)$/.test(e.name))files.push(fp)}})(root);
for(const f of files){const c=fs.readFileSync(f,'utf8');
  const imgrefs=(c.match(/(?:\.img|img:\s*|suitThumb|portraitThumb|suitImage|'img\/|\/img\/bromide|wsrv\.nl|icon_head|IMG[^:]*:)/g)||[]);
  if(!imgrefs.length)continue;
  // show non-img.js-ish refs (local img paths / icon_head / old)
  const unifi=(c.match(/'\/img\//g)||[]).length; const brom=(c.match(/img\/bromide/g)||[]).length; const iconH=(c.match(/icon_head/g)||[]).length; const wsrv=(c.match(/wsrv/g)||[]).length;
  if(unifi||brom||iconH||wsrv){ console.log(f,'localImg='+unifi,'bromide='+brom,'icon_head='+iconH,'wsrv='+wsrv); }
}