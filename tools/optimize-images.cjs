const fs=require('fs'); const path=require('path');
const ROOT='public/img';
const ALLOW={ 'bromide/girls':33, 'bromide/star':60 };  // 目录数量上限（防误拷整包）
const SIZE_MB=25;                                        // 图库总上限
const sharpPath='C:/Users/Leap_/Documents/ChatGPT/排球/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp';
const mode=process.argv[2]||'check';
(async()=>{
  const files=[];
  (function walk(d){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(e.isDirectory())walk(p); else files.push(p); } })(ROOT);
  let nonWebp=0, total=0; const byDir={};
  for(const f of files){ const rel=path.relative(ROOT,f); const dir=path.dirname(rel); byDir[dir]=(byDir[dir]||0)+1; total+=fs.statSync(f).size; if(!f.endsWith('.webp')){ nonWebp++; if(mode==='convert'){ const out=f.replace(/\.(png|jpg|jpeg)$/,'.webp'); await require(sharpPath)(f).webp({quality:78}).toFile(out); fs.rmSync(f); } else { console.log('非webp:',rel); } } }
  console.log('文件类型: 全部webp='+(nonWebp===0),' 总文件='+files.length,' 总体积='+Math.round(total/1e6,2)+'MB');
  let warn=0;
  for(const [k,c] of Object.entries(ALLOW)){ const n=byDir[k]||0; const rel=path.join('bromide',k.split('/')[1]); if(n>c){ console.log('[WARN] 目录 '+k+' 文件 '+n+' 超过上限 '+c); warn++; } }
  if(total/1e6>SIZE_MB){ console.log('[WARN] 图库体积超过 '+SIZE_MB+'MB'); warn++; }
  console.log(warn?('发现 '+warn+' 处异常，可 --prune 清理或用 convert 转 webp'):'图像合规 ✔');
})();