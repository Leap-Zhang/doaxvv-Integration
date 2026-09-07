const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true, proxy:{server:'http://127.0.0.1:7892'}});
  const p=await b.newPage({viewport:{width:1440,height:900}});
  try{ await p.goto('https://doax.cc/ssr',{waitUntil:'domcontentloaded',timeout:60000}); console.log('TITLE=',await p.title()); }catch(e){ console.log('GOTO',e.message.split('\n')[0]); }
  // 等任一卡片出现
  try{ await p.waitForFunction(()=>document.querySelectorAll('img').length>5 || document.body.innerText.length>800, {timeout:30000}); console.log('content ready'); }catch(e){ console.log('waitwarn',e.message.split('\n')[0]); }
  await p.waitForTimeout(4000);
  const data=await p.evaluate(()=>{
    const els=[...document.querySelectorAll('div,li,a')].filter(el=>{ const r=el.getBoundingClientRect(); return (r.width>200&&r.width<360&&r.height>120&&r.height<520) && el.querySelector('img'); }).slice(0,4);
    return { count: els.length,
      cards: els.map(e=>({ cls:e.className.slice(0,80), box:`${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`, html:e.outerHTML.slice(0,1400), text:e.innerText.slice(0,300) })) };
  });
  console.log('CARD-COUNT=',data.count);
  data.cards.forEach((c,i)=>{ console.log(`\n===== CARD ${i} [${c.cls}] ${c.box} =====`); console.log(c.html); console.log('--- text ---', c.text); });
  await p.screenshot({path:'C:/Users/Leap_/Documents/ChatGPT/排球/tools/doax_ref_ssr.png', fullPage:false});
  await b.close();
})().catch(e=>console.log('ERR',e.message));