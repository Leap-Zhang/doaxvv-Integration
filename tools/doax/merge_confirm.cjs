const fs = require("fs"); const path = require("path");
const PROJ = path.resolve(__dirname, "..", "..");
const src = process.argv[2] || path.join(PROJ, "admin", "confirmed.json");
const target = path.join(PROJ, "src/data/trend-suits.json");
const confirmed = fs.existsSync(src) ? JSON.parse(fs.readFileSync(src, "utf8")) : [];
const list = Array.isArray(confirmed) ? confirmed : (confirmed.suits || []);
let existing = fs.existsSync(target) ? JSON.parse(fs.readFileSync(target, "utf8")) : [];
if (!Array.isArray(existing)) existing = [];
const seen = new Set(existing.map((e) => e.id));
let added = 0;
for (const c of list) { if (!c || seen.has(c.id)) continue; existing.push(c); seen.add(c.id); added++; }
fs.writeFileSync(target, JSON.stringify(existing));
console.log("merged into trend-suits.json:", added, "新增,", existing.length, "总计");