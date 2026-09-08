const fs = require("fs"); const path = require("path");
const PROJ = path.resolve(__dirname, "..", "..");
const news = JSON.parse(fs.readFileSync(path.join(PROJ, "src/data/official-news.json"), "utf8"));
const ssr = JSON.parse(fs.readFileSync(path.join(PROJ, "src/data/doax-ssr.json"), "utf8"));
const names = new Set();
ssr.forEach((s) => { ["name", "name_tw", "name_en", "name_ja"].forEach((k) => { if (s[k]) names.add(s[k]); }); });
const slugify = (t) => t.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 40);
const norm = (t) => t.replace(/[\s·・]/g, "").toLowerCase();
const splitNameGirl = (full) => { const m = full.match(/^(.*?)[（(]([^）)]*)[)）]$/); return m ? { name: m[1].trim(), girl: m[2].trim() } : { name: full.trim(), girl: "" }; };
const junk = (t) => /(?:式|套装(?:扭蛋)?|详情|图鉴|效果|属性|获取|技能|写真|皮肤|特殊|期间|限定|之外|出现|登场|再次|抽取|敬请|今后|有可能|道具有可能|为)|.{15,}/.test(t);
const found = []; const key = new Set();
for (const n of news) {
  const b = n.body || "";
  const re = /(?:SSR)?泳装[“\u300C"']([^”\u300D"']{1,40}?)(?:[”\u300D"']|$)/g; let m;
  while ((m = re.exec(b))) {
    const full = m[1].trim();
    if (full.length < 2 || full.length > 14 || junk(full)) continue;
    const { name, girl } = splitNameGirl(full);
    if (name.length < 2) continue;
    if (names.has(full) || names.has(name)) continue;
    const k = norm(name) + "|" + norm(girl);
    if (key.has(k)) continue; key.add(k);
    found.push({ id: slugify(name) || ("trend-" + found.length), name, girl, jp: name, image: (n.images && n.images[0]) || "", source: { title: n.title, url: n.url }, date: n.date, details: {} });
  }
}
fs.mkdirSync(path.join(PROJ, "admin"), { recursive: true });
fs.writeFileSync(path.join(PROJ, "admin/pending.json"), JSON.stringify(found));
console.log("candidate trend suites:", found.length);
found.forEach((f) => console.log("  -", f.name, "|", f.girl || "共享", "|", (f.source.title || "").slice(0, 20)));