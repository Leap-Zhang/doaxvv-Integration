// 深抓：滚动加载 room 完整等级表 + card 完整文本
const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");
const PROXY = "http://127.0.0.1:7892";
const raw = path.join(__dirname, "raw");
const routes = (process.argv[2] || "room,card").split(",");

async function scrollAll(page, route) {
  // 找最大可滚动容器
  const hasScroll = await page.evaluate(() => {
    let best = null, bh = 0;
    document.querySelectorAll("div,main,section").forEach((e) => { if (e.scrollHeight > e.clientHeight && e.scrollHeight > bh) { best = e; bh = e.scrollHeight; } });
    return !!best;
  });
  if (hasScroll) {
    for (let i = 0; i < 60; i++) {
      const before = await page.evaluate(() => document.body.innerText.length);
      await page.evaluate(() => { const e = Array.from(document.querySelectorAll("div,main,section")).sort((a,b)=>b.scrollHeight-a.scrollHeight).find(x=>x.scrollHeight>x.clientHeight); if (e) e.scrollTop = e.scrollHeight; });
      await page.mouse.wheel(0, 2500);
      await page.waitForTimeout(260);
      const after = await page.evaluate(() => document.body.innerText.length);
      if (after === before && i > 6) break;
    }
  } else {
    await page.mouse.wheel(0, 5000).catch(()=>{});
    await page.waitForTimeout(400);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true, proxy: { server: PROXY } });
  fs.mkdirSync(raw, { recursive: true });
  for (const route of routes) {
    let ok = false;
    for (let a = 1; a <= 5 && !ok; a++) {
      const p = await browser.newPage();
      try {
        await p.goto("https://doax.cc/data/" + route, { waitUntil: "domcontentloaded", timeout: 30000 });
        await p.waitForTimeout(5000);
        await scrollAll(p, route);
        await p.waitForTimeout(800);
        let txt = await p.evaluate(() => document.body.innerText);
        // 去掉导航/语言等干扰
        const skip = ["首页","泳装","数据","角色","技能","工具","语言/Lang/言語","选择你的语言","简体中文","繁體中文","English","日本語","한국어"];
        const keep = txt.split("\n").map(s=>s.trim()).filter(s=>s && !skip.includes(s)).join("\n");
        const lvs = (keep.match(/LV\.\s*\d+/g) || []).length;
        if (keep.length > 200 && (route !== "room" || lvs > 20)) {
          fs.writeFileSync(path.join(raw, route + "_dom_full.txt"), keep);
          console.log("### " + route + " OK len=" + keep.length + " LV=" + lvs);
          ok = true;
        } else console.log("  [" + route + "] try" + a + " keepLen=" + keep.length + " LV=" + lvs);
      } catch (e) { console.log("  [" + route + "] try" + a + " err " + e.message.split("\n")[0]); }
      await p.close().catch(()=>{});
    }
    if (!ok) console.log("  [" + route + "] FAILED");
  }
  await browser.close();
})();