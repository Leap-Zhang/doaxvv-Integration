const { chromium } = require('@playwright/test');
(async()=>{
  // 本地预览，不走代理
  const b=await chromium.launch({headless:true});
  const p=await b.newPage();
  const errs=[]; p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
  p.on('pageerror',e=>errs.push('PAGEERR: '+e.message));
  try{ await p.goto('http://localhost:4321/swimsuits/',{waitUntil:'domcontentloaded',timeout:20000}); }catch(e){ console.log('goto',e.message.split('\n')[0]); }
  await p.waitForTimeout(4000);
  const n=await p.evaluate(()=>document.querySelectorAll('#sList .glass-card').length);
  console.log('CARD COUNT= '+n);
  console.log('ERRORS ('+errs.length+'):'); errs.slice(0,10).forEach(e=>console.log('  - ',e.slice(0,200)));
  await b.close();
})().catch(e=>console.log('ERR',e.message));