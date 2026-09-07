const fs = require("fs"); const path = require("path");
const PROJ = path.resolve(__dirname, "..", "..");
const NEWS = "https://game.doaxvv.com/cn/list/top_news.html";
const MNT = "https://game.doaxvv.com/cn/list/top_maintenance.html";
const PREFIX = "https://game.doaxvv.com/production/html/information/";
const CATS = [[/维护/, "maintenance"], [/版本|Ver\s*\.|更新内容/, "version"], [/扭蛋|ガチャ|套装|水着/, "gacha"], [/泳装|水着|V宝石|礼包|套组|纪念|礼物|特惠/, "swimsuit"], [/活动|赌场|攀岩|温泉|竞技场|大跳|祭|期间/, "event"]];
const cat = (t) => (CATS.find(([re]) => re.test(t)) || [null, "other"])[1];
async function getText(u, tries = 3) { for (let i = 0; i < tries; i++) { try { const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } }); if (!r.ok) throw new Error(r.status); return await r.text(); } catch (e) {} } return ""; }
function bodyOf(html) { const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i); let b = (m ? m[1] : html); b = b.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); return b; }
function parseList(h, pre) { const parts = h.split('<a href="' + pre); const out = []; const seen = new Set(); for (let i = 1; i < parts.length; i++) { const chunk = parts[i]; const url = pre + chunk.split('"')[0]; const dm = chunk.match(/<p class\s*=\s*"date">([^<]+)<\/p>/); const tm = chunk.match(/<p class\s*=\s*"text">([\s\S]*?)<\/p>/); if (!dm || !tm) continue; const date = dm[1].trim(), title = tm[1].replace(/<[^>]+>/g, "").trim(); if (seen.has(url)) continue; seen.add(url); out.push({ date, title, url, category: cat(title) }); } return out; }
(async () => {
  const items = [];
  const h = await getText(NEWS); items.push(...parseList(h, PREFIX));
  // 维护公告
  const m = await getText(MNT); if (m) { const body = bodyOf(m); const title = (body.split(" ")[0] || "系统维护公告"); items.push({ date: "", title: "系统维护公告", url: "https://game.doaxvv.com/cn/", category: "maintenance", body: body.slice(0, 1200) }); }
  // 每条抓详情正文
  const out = []; for (const it of items) { const body = it.url.includes("information/") ? bodyOf(await getText(it.url)) : (it.body || ""); out.push({ ...it, body }); }
  fs.writeFileSync(path.join(PROJ, "src/data/official-news.json"), JSON.stringify(out));
  fs.writeFileSync(path.join(PROJ, "public/data/official-news.json"), JSON.stringify(out));
  const cats = {}; out.forEach((o) => cats[o.category] = (cats[o.category] || 0) + 1);
  console.log("news:", out.length, "cats:", JSON.stringify(cats));
})();