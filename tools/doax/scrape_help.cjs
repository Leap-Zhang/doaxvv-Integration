const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true, proxy:{server:'http://127.0.0.1:7892'}});
  const p=await b.newPage({viewport:{width:1280,height:900}});
  try{ await p.goto('https://game.doaxvv.com/production/html/information/help_cn.html',{waitUntil:'domcontentloaded',timeout:45000}); console.log('loaded'); }catch(e){ console.log('goto',e.message.split('\n')[0]); await b.close(); return; }
  await p.waitForTimeout(3000);
  const navs = await p.evaluate(()=>Array.from(document.querySelectorAll('[id^="nav_li_"]')).map(e=>({id:e.id,txt:(e.innerText||e.getAttribute('title')||'').trim()})));
  console.log('nav items:', navs.length);
  const out=[];
  for(const n of navs.slice(0,22)){
    // 点击/设为当前
    try{ await p.evaluate((id)=>{ const el=document.getElementById(id); if(el) el.click(); }, n.id); }catch(e){}
    await p.waitForTimeout(1200);
    let txt='';
    try{ const fr=p.frameLocator('#content_iFrame').locator('body'); txt=(await fr.innerText({timeout:6000}).catch(()=>''))||''; }catch(e){}
    if(!txt){ try{ txt=(await p.evaluate(()=>document.getElementById('content_iFrame')?.contentDocument?.body?.innerText||''))||''; }catch(e){} }
    out.push({ id:n.id, topic:n.txt, content: txt.replace(/\s+/g,' ').trim() });
    console.log((n.txt||n.id).slice(0,20), '->', txt.length);
  }
  const fs=require('fs');
  fs.writeFileSync('C:/Users/Leap_/Documents/ChatGPT/排球/tools/doax/help_raw.json', JSON.stringify(out,null,2));
  console.log('saved help_raw.json, topics:', out.length);
  await b.close();
})().catch(e=>console.log('ERR',e.message));