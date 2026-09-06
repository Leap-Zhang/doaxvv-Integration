const fs = require("fs");
const path = require("path");
const raw = path.join(__dirname, "raw");
const out = path.join(__dirname, "..", "..", "src", "data");
const rd = (f) => JSON.parse(fs.readFileSync(path.join(raw, f), "utf8"));
const wr = (f, d) => fs.writeFileSync(path.join(out, f), JSON.stringify(d));

// 1) 等级/经验表（100 级）
const level = rd("level_data.json").map((l, i) => ({
  level: i + 1,
  pow_tec_up: l.pow_tec_up ?? "0",
  stm_up: l.stm_up ?? "0",
  apl_up: l.apl_up ?? "0",
  need_exp: l.need_exp ?? "0"
}));
wr("doax-level.json", level);

// 2) 月度纪念（泳装发布时间线）
wr("doax-banner.json", rd("monthly_banner_data.json"));

// 3) 活动
wr("doax-event.json", rd("event_data.json"));

// 4) 潜力/优先级 PP（p_skill）
wr("doax-emphasis.json", rd("skill_emphasis_data.json"));

// 5) Steam 泳装
const steam = rd("ssr_data_steam.json").filter((s) => s.girl).map((s) => ({
  id: s.id, girl: s.girl,
  name: s.zhs_name || s.name, name_en: s.en_name || "", name_ja: s.name || "", name_tw: s.zht_name || "",
  type: (s.type || "").toLowerCase(),
  pow: +s.pow || 0, tec: +s.tec || 0, stm: +s.stm || 0, apl: +s.apl || 0,
  skills: [s.skill1, s.skill2, s.skill3].filter(Boolean),
  sell: s.sell || "", resell: s.resell || "", break: s.break || "", special_fun: s.special_fun || ""
}));
wr("doax-ssr-steam.json", steam);

console.log("wrote level:", level.length, "banner:", rd("monthly_banner_data.json").length,
  "event:", rd("event_data.json").length, "emphasis:", rd("skill_emphasis_data.json").length,
  "steam:", steam.length);