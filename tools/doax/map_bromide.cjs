const fs = require("fs");
const path = require("path");
const ssr = JSON.parse(fs.readFileSync("src/data/doax-ssr.json", "utf8"));
const src = "bromide_dl/pic_star";
const dst = "public/img/bromide/girls";
const KEYMAP = { helena: "elena", marie: "marierose", meg: "megu" };
fs.mkdirSync(dst, { recursive: true });
const first = {};
for (const s of ssr) if (!(s.girl in first)) first[s.girl] = s.id;
const ok = [], miss = [];
for (const girl of Object.keys(first)) {
  const id = parseInt(first[girl]);
  // try exact file, then <id>_1.png etc.
  let found = null;
  for (const cand of [id + ".png", id + "_1.png"]) {
    if (fs.existsSync(path.join(src, cand))) { found = cand; break; }
  }
  if (found) {
    const myid = (KEYMAP[girl] || girl) === "all" || (KEYMAP[girl] || girl) === "All" ? "" : (KEYMAP[girl] || girl);
    if (myid) { fs.copyFileSync(path.join(src, found), path.join(dst, myid + ".png")); ok.push(myid); }
  } else miss.push(girl);
}
console.log("copied:", ok.length, "missing:", miss.join(","));
console.log("girls:", ok.join(","));
