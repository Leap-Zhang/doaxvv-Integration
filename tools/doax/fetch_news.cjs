const fs = require("fs"); const path = require("path");
const sharp = require("C:/Users/Leap_/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const PROJ = path.resolve(__dirname, "..", "..");
const SITE = "https://game.doaxvv.com";
const NEWS = SITE + "/cn/list/top_news.html";
const MNT = SITE + "/cn/list/top_maintenance.html";
const PREFIX = SITE + "/production/html/information/";
const CATS = [[/维护/, "maintenance"], [/版本|Ver\s*\.|更新内容/, "version"], [/扭蛋|ガチャ|套装|水着/, "gacha"], [/泳装|水着|V宝石|礼包|套组|纪念|礼物|特惠/, "swimsuit"], [/活动|赌场|攀岩|温泉|竞技场|大跳|祭|期间/, "event"]];
const cat = (t) => (CATS.find(([re]) => re.test(t)) || [null, "other"])[1];
async function getText(u, tries = 3) { for (let i = 0; i < tries; i++) { try { const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } }); if (!r.ok) throw new Error(r.status); return await r.text(); } catch (e) {} } return ""; }
function bodyOf(html) { const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i); let b = (m ? m[1] : html); b = b.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); return b; }
function imgsOf(html, base) { const out = []; const re = /<img[^>]+(?:src|data-src)="([^"]+)"/gi; let m; while ((m = re.exec(html))) { try { const u = new URL(m[1].trim(), base).href; if (!/logo|Wallpaper|background|spacer/i.test(u) && /\.(png|jpe?g|webp)/i.test(u)) out.push(u); } catch (e) {} } return [...new Set(out)].slice(0, 6); }
async function dl(u) { try { const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0", "Referer": SITE + "/" } }); if (!r.ok) return null; return Buffer.from(await r.arrayBuffer()); } catch (e) { return null; } }
async function saveWebp(buf, out) { try { await sharp(buf).webp({ quality: 75 }).toFile(out); return true; } catch (e) { return false; } }
function parseList(h, pre) { const parts = h.split('<a href="' + pre); const out = []; const seen = new Set(); for (let i = 1; i < parts.length; i++) { const chunk = parts[i]; const url = pre + chunk.split('"')[0]; const dm = chunk.match(/<p class\s*=\s*"date">([^<]+)<\/p>/); const tm = chunk.match(/<p class\s*=\s*"text">([\s\S]*?)<\/p>/); if (!dm || !tm) continue; const date = dm[1].trim(), title = tm[1].replace(/<[^>]+>/g, "").trim(); if (seen.has(url)) continue; seen.add(url); out.push({ date, title, url, category: cat(title) }); } return out; }
(async () => {
  const items = [];
  const h = await getText(NEWS); items.push(...parseList(h, PREFIX));
  const m = await getText(MNT); if (m) { const body = bodyOf(m); items.push({ date: "", title: "系统维护公告", url: SITE + "/cn/", category: "maintenance", body: body.slice(0, 1200) }); }
  const out = [];
  for (const it of items) {
    const html = it.url.includes("information/") ? await getText(it.url) : "";
    const body = bodyOf(html) || (it.body || "");
    const imgs = html ? imgsOf(html, it.url) : [];
    const slug = (it.url.replace(PREFIX, "").split("?")[0].replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "news-" + out.length).slice(0, 60);
    const imgDir = path.join(PROJ, "public/img/news", slug);
    const localImgs = [];
    if (imgs.length) { fs.mkdirSync(imgDir, { recursive: true }); let i = 0; for (const u of imgs) { const buf = await dl(u); if (!buf) continue; const f = path.join(imgDir, i + ".webp"); if (await saveWebp(buf, f)) { localImgs.push("img/news/" + slug + "/" + i + ".webp"); i++; } } }
    out.push({ ...it, body, images: localImgs });
  }
  const byCat = {}; out.forEach((o) => ((byCat[o.category] = byCat[o.category] || []).push(o)));
  const keep = [], archive = [];
  Object.keys(byCat).forEach((k) => { const arr = byCat[k].sort((a, b) => (b.date || "").localeCompare(a.date || "")); arr.forEach((o, i) => (i < 6 ? keep : archive).push(o)); });
  fs.writeFileSync(path.join(PROJ, "src/data/official-news.json"), JSON.stringify(keep));
  fs.writeFileSync(path.join(PROJ, "public/data/official-news.json"), JSON.stringify(keep));
  fs.writeFileSync(path.join(PROJ, "src/data/news-archive.json"), JSON.stringify(archive));
  const cats = {}; keep.forEach((o) => cats[o.category] = (cats[o.category] || 0) + 1);
  const withImg = keep.filter((o) => o.images && o.images.length).length;
  console.log("kept:", keep.length, "archive:", archive.length, "cats:", JSON.stringify(cats), "withImg:", withImg);
})();