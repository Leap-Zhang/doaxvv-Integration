const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true, proxy:{server:'http://127.0.0.1:7892'}});
  const p=await b.newPage({viewport:{width:1280,height:900}});
  try{ await p.goto('https://game.doaxvv.com/production/html/information/help_cn.html',{waitUntil:'load',timeout:45000}); }catch(e){ console.log('goto',e.message.split('\n')[0]); }
  await p.waitForTimeout(4000);
  const info=await p.evaluate(()=>{
    const ifr=document.getElementById('content_iFrame');
    const first=document.getElementById('nav_li_fes')||document.getElementById('nav_li_festival');
    const srcs=[...document.querySelectorAll('iframe')].map(i=>i.getAttribute('src')||i.src).filter(Boolean);
    return { iframeSrc: ifr? ifr.getAttribute('src')||ifr.src:null, firstNav: first? first.outerHTML.slice(0,300):null, frameSrcs: srcs };
  });
  console.log('iframeSrc:', info.iframeSrc);
  console.log('frameSrcs:', JSON.stringify(info.frameSrcs));
  console.log('firstNav:', info.firstNav);
  await b.close();
})().catch(e=>console.log('ERR',e.message));