const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true, proxy:{server:'http://127.0.0.1:7892'}});
  for(let attempt=1; attempt<=4; attempt++){
    const p=await b.newPage({viewport:{width:1440,height:900}});
    console.log('attempt',attempt);
    try{ await p.goto('https://doax.cc/ssr',{waitUntil:'domcontentloaded',timeout:30000}); }catch(e){ console.log('  goto',e.message.split('\n')[0]); await p.close(); continue; }
    try{ await p.waitForFunction(()=>document.querySelectorAll('img').length>4,{timeout:15000}); }catch(e){ console.log('  wait img timeout'); }
    await p.waitForTimeout(2000);
    const d=await p.evaluate(()=>{
      const els=[...document.querySelectorAll('li,a,div')].filter(el=>{ const r=el.getBoundingClientRect(); return r.width>150&&r.width<380&&r.height>110&&r.height<560&&el.querySelector('img'); }).slice(0,2);
      return { count: els.length, card: els[0]? { cls:els[0].className.slice(0,90), box:`${Math.round(els[0].getBoundingClientRect().width)}x${Math.round(els[0].getBoundingClientRect().height)}`, html:els[0].outerHTML.slice(0,1200), text:els[0].innerText.slice(0,260) } : null };
    });
    if(d.count>0 && d.card){ console.log('FOUND card=',d.card.box); console.log(d.card.html); console.log('text:',d.card.text); await b.close(); return; }
    else console.log('  no card yet (img='+d.count+')');
    await p.close();
  }
  await b.close(); console.log('still no card after retries');
})().catch(e=>console.log('ERR',e.message));