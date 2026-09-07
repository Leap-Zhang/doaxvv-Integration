const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true, proxy:{server:'http://127.0.0.1:7892'}});
  for(const route of ['skill','girl']){
    const p=await b.newPage({viewport:{width:1440,height:900}});
    try{ await p.goto('https://doax.cc/'+route,{waitUntil:'domcontentloaded',timeout:45000}); }catch(e){ console.log('['+route+'] GOTO',e.message.split('\n')[0]); }
    try{ await p.waitForFunction(()=>document.body.innerText.length>400 || document.querySelectorAll('img').length>3,{timeout:20000}); }catch(e){}
    await p.waitForTimeout(2500);
    const d=await p.evaluate(()=>{
      const els=[...document.querySelectorAll('li,a,div')].filter(el=>{ const r=el.getBoundingClientRect(); return r.width>150&&r.height>60&&r.width<520&&el.querySelector('img'); }).slice(0,2);
      return { count: els.length, cards: els.map(e=>{ const r=e.getBoundingClientRect(); return { cls:e.className.slice(0,90), box:`${Math.round(r.width)}x${Math.round(r.height)}`, html:e.outerHTML.slice(0,1200), text:e.innerText.slice(0,260) }; }) };
    });
    console.log('\n######## /'+route+' cards='+d.count);
    d.cards.forEach((c,i)=>{ console.log(`--- CARD ${i} [${c.cls}] ${c.box}`); console.log(c.html); console.log('text:', c.text); });
    await p.close();
  }
  await b.close();
})().catch(e=>console.log('ERR',e.message));