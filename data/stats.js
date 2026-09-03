// 基础数值（Lv1）：POW/TEC/STM/APL
// 来源：h1g《DOAXVV》攻略Wiki「基礎数値(Lv1)」；后续角色与理论最高待补充。
const DOAXVV_BASE = {
  misaki:  { pow: 1040, tec: 900,  stm: 1050, apl: 20 },
  elena:   { pow: 850,  tec: 1000, stm: 1150, apl: 10 },
  momiji:  { pow: 800,  tec: 900,  stm: 1290, apl: 20 },
  hitomi:  { pow: 900,  tec: 800,  stm: 1300, apl: 10 },
  kokoro:  { pow: 1000, tec: 850,  stm: 1150, apl: 10 },
  kasumi:  { pow: 900,  tec: 1040, stm: 1050, apl: 20 },
  honoka:  { pow: 850,  tec: 850,  stm: 1300, apl: 10 },
  ayane:   { pow: 800,  tec: 1000, stm: 1200, apl: 10 },
  nyotengu:{ pow: 1050, tec: 800,  stm: 1150, apl: 10 },
  luna:    { pow: 830,  tec: 820,  stm: 1340, apl: 20 },
  tamaki:  { pow: 1040, tec: 970,  stm: 980,  apl: 20 },
  leifang: { pow: 900,  tec: 1090, stm: 1000, apl: 10 },
  nagisa:  { pow: 1060, tec: 900,  stm: 1020, apl: 20 },
  sayuri:  { pow: 800,  tec: 800,  stm: 1400, apl: 20 },
  shizuku: { pow: 950,  tec: 1100, stm: 990,  apl: 20 },
  reika:   { pow: 1100, tec: 910,  stm: 1030, apl: 20 }
};

// 立绘图（本地图片，来源见图片水印/页面标注）
const DOAXVV_IMAGES = {
  honoka: "assets/img/char_honoka.jpg",
  ayane:  "assets/img/char_ayane.jpg"
};

if (typeof window !== 'undefined') {
  window.DOAXVV_BASE = DOAXVV_BASE;
  window.DOAXVV_IMAGES = DOAXVV_IMAGES;
}
export const baseStats = DOAXVV_BASE;
export const images = DOAXVV_IMAGES;
