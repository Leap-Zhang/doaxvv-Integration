// 抽取 doax.cc 渲染后的正文（card/accessory/room 数据嵌在混淆 JS，无 /api）
const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");
const PROXY = "http://127.0.0.1:7892";
const routes = process.argv[2] ? process.argv[2].split(",") : ["card", "accessory", "room"];
const raw = path.join(__dirname, "raw");

(async () => {
  const browser = await chromium.launch({ headless: true, proxy: { server: PROXY } });
  fs.mkdirSync(raw, { recursive: true });
  for (const route of routes) {
    let ok = false;
    for (let a = 1; a <= 4 && !ok; a++) {
      const p = await browser.newPage();
      const jsons = [];
      p.on("response", async (r) => { const ct = r.headers()["content-type"] || ""; if (ct.includes("json")) { try { jsons.push({ url: r.url(), body: await r.text() }); } catch {} } });
      try {
        await p.goto("https://doax.cc/data/" + route, { waitUntil: "domcontentloaded", timeout: 30000 });
        await p.waitForTimeout(6000);
        const txt = await p.evaluate(() => document.body.innerText);
        const heads = await p.evaluate(() => Array.from(document.querySelectorAll("h1,h2,h3,h4,b")).map(h => h.innerText.trim()).filter(Boolean));
        if (txt.length > 250) {
          fs.writeFileSync(path.join(raw, route + "_dom.txt"), txt);
          const jf = path.join(raw, route + "_json.json");
          fs.writeFileSync(jf, JSON.stringify(jsons));
          console.log("### " + route + " OK domLen=" + txt.length + " json=" + jsons.length + " heads=" + heads.slice(0,6).join(" | "));
          ok = true;
        } else { console.log("  [" + route + "] try" + a + " small dom (" + txt.length + ")"); }
      } catch (e) { console.log("  [" + route + "] try" + a + " err " + e.message.split("\n")[0]); }
      await p.close().catch(()=>{});
    }
    if (!ok) console.log("  [" + route + "] FAILED after retries");
  }
  await browser.close();
})();