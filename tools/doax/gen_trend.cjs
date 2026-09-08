const fs = require("fs"); const path = require("path");
const PROJ = path.resolve(__dirname, "..", "..");
const news = JSON.parse(fs.readFileSync(path.join(PROJ, "src/data/official-news.json"), "utf8"));
const ssr = JSON.parse(fs.readFileSync(path.join(PROJ, "src/data/doax-ssr.json"), "utf8"));
const names = new Set();
ssr.forEach((s) => { names.add(s.name); if (s.name_tw) names.add(s.name_tw); if (s.name_en) names.add(s.name_en); if (s.name_ja) names.add(s.name_ja); });
function slugify(t) { return t.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 40); }
const found = [];
for (const n of news) {
  const b = n.body || "";
  const re = /泳装["\u201C\u201C\u300C\u2018]([^"\u201D\u201D\u300D\u2018]{1,40})/g; let m;
  while ((m = re.exec(b))) {
    const full = m[1].replace(/[\u201D\u300D\u2019"']/g, "").trim();
    const nm = full.replace(/[（(].*?[)）]/g, "").trim();
    if (nm.length < 2) continue;
    if (names.has(full) || names.has(nm)) continue;
    if (found.some((f) => f.name === full)) continue;
    found.push({ id: slugify(full) || "trend-" + found.length, name: full, jp: full, image: (n.images && n.images[0]) || "", source: { title: n.title, url: n.url }, date: n.date, details: {} });
  }
}
const pendingDir = path.join(PROJ, "admin"); fs.mkdirSync(pendingDir, { recursive: true });
fs.writeFileSync(path.join(pendingDir, "pending.json"), JSON.stringify(found));
fs.writeFileSync(path.join(PROJ, "src/data/trend-suits.json"), JSON.stringify([]));
console.log("candidate trend suites:", found.length);
found.slice(0, 8).forEach((f) => console.log("  -", f.name, "| 来源:", f.source.title, "| img:", f.image ? "有" : "无"));