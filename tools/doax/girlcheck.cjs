const { chromium } = require('@playwright/test');
(async()=>{
  const b=await chromium.launch({headless:true}); const p=await b.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  await p.goto('http://localhost:4321/girls/',{waitUntil:'domcontentloaded',timeout:20000});
  await p.waitForTimeout(3000);
  const n=await p.evaluate(()=>document.querySelectorAll('#grid a').length);
  console.log('GIRL CARDS= '+n, 'ERRORS='+errs.length); errs.slice(0,6).forEach(e=>console.log('  -',e.slice(0,160)));
  await b.close();
})().catch(e=>console.log('ERR',e.message));