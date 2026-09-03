// 每个女孩的“培养笔记 / 属性偏向”，内容整理自贴吧与B站社区攻略，附来源。
// type：社区明确的属性偏向；bullets：培养要点；src：信息来源（标题+链接）。
const DOAXVV_COMMUNITY = {
  misaki: {
    type: "力量型（主攻）",
    bullets: [
      "满级基础属性约 P2528 / T2388 / S3029（据觉醒技能推荐帖）。",
      "刷分服偏弱，JK 服 / 圣诞服可当副手辅助得分。",
      "社区反馈不适合当“攻副”；抽到当期流行时，单流行也能冲 SSS。"
    ],
    src: { title: "steam 全角色 SSR 觉醒技能推荐", author: "百度贴吧", url: "https://tieba.baidu.com/p/6387901332" }
  },
  kasumi: {
    type: "技巧型",
    bullets: [
      "有常驻 SR 技巧接球 12PP，接球+技巧累计较高。",
      "想练接球的新人参考：油用 3 个 15 体力。",
      "常作技巧队主攻/接球位。"
    ],
    src: { title: "关于10个常驻女孩的小知识 · 周一新CD测评", author: "百度贴吧", url: "https://jump2.bdimg.com/p/7841056449" }
  },
  ayane: {
    type: "技巧型",
    bullets: [
      "有常驻 SR 技巧接球 12PP（与霞合计约 61% 接球+技巧）。",
      "社区常作“实用防副 / 紧凑防副”使用。"
    ],
    src: { title: "关于10个常驻女孩的小知识", author: "百度贴吧", url: "https://jump2.bdimg.com/p/7841056449" }
  },
  marierose: {
    type: "技巧型",
    bullets: [
      "练成难度最低：有常驻 SR 体力 + 升级送 8PP 体力。",
      "技巧向配置：油常用 3 个 20 技巧；玛丽白金装为热门刷分装。"
    ],
    src: { title: "关于10个常驻女孩的小知识 · 周一新CD测评", author: "百度贴吧", url: "https://jump2.bdimg.com/p/7841056449" }
  },
  elena: {
    type: "技巧型",
    bullets: ["有常驻 SR 体力，基础体力好，适合持久战。"],
    src: { title: "关于10个常驻女孩的小知识", author: "百度贴吧", url: "https://jump2.bdimg.com/p/7841056449" }
  },
  monica: {
    type: "技巧型",
    bullets: ["社区攻略归入技巧偏向。"],
    src: { title: "DOAXVV 打分队（攻略向）", author: "Bilibili", url: "https://www.bilibili.com/opus/566244485395289268" }
  },
  leifang: {
    type: "技巧型",
    bullets: [
      "技巧 TEC 基础高；社区归入技巧偏向。",
      "竞技场常作“沙包 / 防副”位。"
    ],
    src: { title: "DOAXVV 打分队（攻略向）", author: "Bilibili", url: "https://www.bilibili.com/opus/566244485395289268" }
  },
  tamaki: {
    type: "力量型",
    bullets: [
      "属性偏向为力量，POW 基础高。",
      "参考：满强化 SSR「Vintage Noctiluca」Lv.90 可达 4442/3794/3864。"
    ],
    src: { title: "DOAXVV 打分队（攻略向）", author: "Bilibili", url: "https://www.bilibili.com/opus/566244485395289268" }
  },
  honoka: {
    type: "体力型",
    bullets: ["基础体力高；接球需补大技巧 12/13PP。"],
    src: { title: "关于10个常驻女孩的小知识", author: "百度贴吧", url: "https://jump2.bdimg.com/p/7841056449" }
  }
};

if (typeof window !== 'undefined') window.DOAXVV_COMMUNITY = DOAXVV_COMMUNITY;
export const communityNotes = DOAXVV_COMMUNITY;
