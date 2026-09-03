const fs = require("fs");
const raw = "tools/doax/raw/";
const ssr = JSON.parse(fs.readFileSync(raw + "ssr_data.json", "utf8"));
const skill = JSON.parse(fs.readFileSync(raw + "skill_data.json", "utf8"));

const suits = ssr.map((s) => ({
  id: s.id,
  girl: s.girl,
  name: s.zhs_name || s.name,          // zh-CN
  name_en: s.en_name || "",
  name_ja: s.name || "",
  name_tw: s.zht_name || "",
  type: (s.type || "").toLowerCase(),
  pow: +s.pow || 0, tec: +s.tec || 0, stm: +s.stm || 0, apl: +s.apl || 0,
  skills: [s.skill1, s.skill2, s.skill3].filter(Boolean),
  sell: s.sell || "", resell: s.resell || "", break: s.break || ""
}));
fs.writeFileSync("src/data/doax-ssr.json", JSON.stringify(suits));

const skills = skill.map((s) => ({
  name: s.zhs_name || s.name,          // zh-CN
  name_en: s.en_name || "",
  name_ja: s.name || "",
  name_tw: s.zht_name || "",
  type: (s.type || "").toUpperCase(),
  effect: s.zhs_effect || s.effect,    // zh-CN
  effect_en: s.en_effect || "",
  effect_ja: s.effect || "",
  effect_tw: s.zht_effect || "",
  pp: s.pp_type || "",
  property: s.property || ""
}));
fs.writeFileSync("src/data/doax-skills.json", JSON.stringify(skills));

console.log("suits:", suits.length, "skills:", skills.length);
console.log("suit sample:", JSON.stringify(suits[0]));
console.log("skill sample:", JSON.stringify(skills[0]));
