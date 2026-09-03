const fs = require("fs");
const raw = JSON.parse(fs.readFileSync(__dirname + "/girls_raw.json", "utf8"));
const byIndex = [
  "kokoro","marierose","kasumi","honoka","nyotengu","hitomi","elena","ayane","momiji","luna",
  "tamaki","leifang","fiona","nagisa","kanna","monica","sayuri","patty","tsukushi","lobelia",
  "nanami","elise","koharu","tina","amy","shandy","yukino","shizuku","reika","megu","azusa","nozomi"
];
const p = (s) => { const [a, b] = String(s).trim().split("|"); return { lv1: parseInt(a), lv100: parseInt(b) }; };
const out = []
  .concat(byIndex.map((id, i) => {
    const r = raw[i];
    return {
      id,
      name: r[0].split("/").pop().trim(),
      type: r[1].trim().toLowerCase(),
      pow: p(r[3]), tec: p(r[4]), stm: p(r[5]), appeal: p(r[6]), total: p(r[7]),
      birthday: r[9].trim().replace(" ", ""),
      age: r[19].trim(), height: r[20].trim(),
      waist: r[21].trim(), bust: r[22].trim(), hip: r[23].trim(), blood: r[24].trim(),
      cv: r[25].trim()
    };
  }))
  .concat({ id: "misaki", name: "海咲", type: "pow", pow: { lv1: 1040, lv100: 3728 }, tec: { lv1: 900, lv100: 3588 }, stm: { lv1: 1050, lv100: 4625 }, appeal: { lv1: 20, lv100: 70 }, total: { lv1: 3010, lv100: 12011 }, birthday: "7/7", age: "18", height: "156", waist: "54", bust: "85", hip: "89", blood: "A", cv: "津田美波" });
const j = JSON.stringify(out, null, 0);
fs.writeFileSync("src/data/doax-girls.json", j);
console.log("wrote", out.length, "characters");
console.log("sample:", JSON.stringify(out[0]));
