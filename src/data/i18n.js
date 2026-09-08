import girlNames from './girl-names.json'; export { girlNames };

export const LANGS = ['zh', 'en', 'ja'];
export const LANG_LABEL = { zh: '中', en: 'EN', ja: '日' };
export const LANG_FULL = { zh: '中文', en: 'English', ja: '日本語' };

export const UI = {
  zh: {
    'admin.home': '首页', 'admin.girls': '女孩图鉴', 'admin.swimsuits': '泳装图鉴', 'admin.skills': '技能图鉴', 'admin.tools': '工具', 'admin.guide': '系统指南', 'admin.community': '社区攻略', 'admin.reference': '资料库', 'admin.help': '帮助中心',
    'brand': 'DOAXVV 攻略站', 'brand.sub': '维纳斯群岛度假攻略',
    'search.placeholder': '搜索…',
    'common.all': '全部', 'common.allGirls': '全部角色', 'common.allType': '全部类型', 'common.loadMore': '加载更多', 'common.items': '件/个',
    'girls.title': '女孩资料库', 'girls.desc': '全部女孩资料、基础数值与培养笔记。',
    'swim.title': '泳装・饰品图鉴', 'swim.desc': '泳装是战力的核心来源；可按角色 / 属性 / 名称筛选。',
    'skill.title': '技能一览', 'skill.desc': 'A=主动、F=狂热、P=被动/潜力。',
    'guide.title': '核心玩法详解', 'search.title': '搜索', 'community.title': '玩家攻略（来源标注）', 'tools.title': '工具', 'tools.desc': '配装估算 / 满破PP规划。',
    'home.kick': 'DEAD OR ALIVE Xtreme Venus Vacation', 'home.title': '维纳斯群岛度假攻略站',
    'home.sub': '《死或生 沙滩排球：维纳斯假期》中文/English/日本語 攻略百科。从新手入门、比赛机制，到泳装养成与社区打法。',
    'home.cta': '浏览女孩图鉴', 'home.cta2': '社区攻略',
    'home.about': '关于本作', 'home.aboutBody': '《DEAD OR ALIVE Xtreme Venus Vacation》是光荣特库摩推出的沙滩排球养成游戏。舞台是四季如夏的维纳斯群岛，你担任新任岛主，与助手海咲一起参加“维纳斯挑战赛”，让受邀女孩以“维纳斯”的身份绽放光彩。',
    'home.one': '玩法一句话', 'home.oneBody': '组建二女海滩排球队伍，通过泳装与饰品提升属性，在比赛中赢取“魅力值”评价并培养女孩。',
    'home.quick': '快速上手',
    'home.schedule': '游戏日程', 'home.changelog': '网站更新日志',
    'home.q1': '你是指挥官，真正上场的是女孩。', 'home.q2': 'POW（力量）／TEC（技巧）／STM（体力），由女孩＋泳装＋饰品叠加。', 'home.q3': '先拿规定得分者胜；杀球比 POW、假动作比 TEC。', 'home.q4': '把“魅力值”评价刷高，S 首胜大量奖励。',
    'home.card.girls': '女孩图鉴', 'home.card.girlsD': '全部女孩资料、基础数值与培养笔记。',
    'home.card.swim': '泳装图鉴', 'home.card.swimD': '游泳系统讲解与全量泳装目录。',
    'home.card.guide': '系统指南', 'home.card.guideD': '比赛、泳装、养成、资源等核心玩法详解。',
    'home.card.community': '社区攻略', 'home.card.communityD': '贴吧 / B 站玩家攻略，按板块整理并标注来源。',
    'home.card.skills': '技能图鉴', 'home.card.skillsD': '全部技能类型、属性着色与相关泳装反查。',
    'home.card.tools': '工具', 'home.card.toolsD': '面板估算、PP规划、经验计算、属性对比。',
    'home.card.reference': '资料库', 'home.card.referenceD': '等级/月度/活动/潜力PP/饰品/亲密度与官方公告。',
    'home.card.collection': '我的收藏', 'home.card.collectionD': '收藏进度与本地备份导出/导入。',
'ed.note': '本篇正文为中文，数据与界面已支持多语言。',
    'footer.note': '内容整理自官方帮助文档与社区公开资料；图片与攻略版权归原作者。'
  },
  en: {
    'admin.home': 'Home', 'admin.girls': 'Girls', 'admin.swimsuits': 'Swimsuits', 'admin.skills': 'Skills', 'admin.tools': 'Tools', 'admin.guide': 'Guides', 'admin.community': 'Community', 'admin.reference': 'Database', 'admin.help': 'Help',
    'brand': 'DOAXVV Guide', 'brand.sub': 'Venus Islands Resort Guide',
    'search.placeholder': 'Search…',
    'common.all': 'All', 'common.allGirls': 'All Girls', 'common.allType': 'All Types', 'common.loadMore': 'Load more', 'common.items': '',
    'girls.title': 'Girl Database', 'girls.desc': 'All girl profiles, base stats and growth notes.',
    'swim.title': 'Swimsuit Codex', 'swim.desc': 'Swimsuits drive your stats; filter by character / attribute / name.',
    'skill.title': 'Skill List', 'skill.desc': 'A=Active, F=Fever, P=Passive/Potential.',
    'guide.title': 'Core Gameplay Guide', 'search.title': 'Search', 'community.title': 'Community Guides', 'tools.title': 'Tools', 'tools.desc': 'Build estimator / PP planner.',
    'home.kick': 'DEAD OR ALIVE Xtreme Venus Vacation', 'home.title': 'Venus Islands Resort Guide',
    'home.sub': 'A 中文/English/日本語 wiki for DOAXVV: from newbie tips and match mechanics to swimsuit growth and community builds.',
    'home.cta': 'Browse Girls', 'home.cta2': 'Community Guides',
    'home.about': 'About', 'home.aboutBody': 'Dead or Alive Xtreme Venus Vacation is a beach volleyball game by Koei Tecmo. On the ever-summer Venus Islands, you act as the new owner and join assistant Misaki in the Venus Festival.',
    'home.one': 'In one line', 'home.oneBody': 'Build a two-girl beach volleyball team, boost stats with swimsuits & accessories, win Appeal points and raise girls.',
    'home.quick': 'Quick start',
    'home.schedule': 'Game Schedule', 'home.changelog': 'Site Changelog',
    'home.q1': 'You are the coach; the girls play.', 'home.q2': 'POW / TEC / STM come from girl + swimsuit + accessories.', 'home.q3': 'Reach the target points first; Spike vs POW, Feint vs TEC.', 'home.q4': 'Push your Appeal rating; first S-rank gives big rewards.',
    'home.card.girls': 'Girls', 'home.card.girlsD': 'Profiles, base stats and growth notes for every girl.',
    'home.card.swim': 'Swimsuits', 'home.card.swimD': 'Swimsuit system and full catalog.',
    'home.card.guide': 'Guides', 'home.card.guideD': 'Matches, swimsuits, growth and economy.',
    'home.card.community': 'Community', 'home.card.communityD': 'Tieba / Bilibili builds by section with sources.',
'ed.note': 'This article is in Chinese; data & UI support multiple languages.',
    'footer.note': 'Compiled from official docs & community sources; images & guides belong to their authors.'
  },
  ja: {
    'admin.home': 'ホーム', 'admin.girls': 'ガールズ', 'admin.swimsuits': '水着図鑑', 'admin.skills': 'スキル図鑑', 'admin.tools': 'ツール', 'admin.guide': 'ガイド', 'admin.community': 'コミュニティ', 'admin.reference': 'データ集', 'admin.help': 'ヘルプ',
    'brand': 'DOAXVV 攻略', 'brand.sub': 'ヴィーナス諸島リゾートガイド',
    'search.placeholder': '検索…',
    'common.all': 'すべて', 'common.allGirls': '全キャラ', 'common.allType': '全タイプ', 'common.loadMore': 'もっと見る', 'common.items': '',
    'girls.title': 'ガールズデータ', 'girls.desc': '全キャラのプロフィール、基礎数値、育成メモ。',
    'swim.title': '水着一覧', 'swim.desc': '水着は戦力の要。キャラ/属性/名前で絞り込み。',
    'skill.title': 'スキル一覧', 'skill.desc': 'A=アクティブ、F=フィーバー、P=パッシブ。',
    'guide.title': 'コアゲームガイド', 'search.title': '検索', 'community.title': 'コミュニティ攻略', 'tools.title': 'ツール', 'tools.desc': 'ビルド計算 / PPプランナー。',
    'home.kick': 'DEAD OR ALIVE Xtreme Venus Vacation', 'home.title': 'ヴィーナス諸島リゾートガイド',
    'home.sub': 'DOAXVVの中文/English/日本語攻略wiki。初心者向けから試合、水着育成まで。',
    'home.cta': 'ガールズを見る', 'home.cta2': 'コミュニティ攻略',
    'home.about': 'このゲームについて', 'home.aboutBody': 'DEAD OR ALIVE Xtreme Venus Vacationはコーエーテクモのビーチバレー育成ゲーム。常夏のヴィーナス諸島でオーナーとなり、助手のみさきとヴィーナスフェスに挑みます。',
    'home.one': 'ひとことで', 'home.oneBody': '二人のビーチバレー部を編成し、水着・アクセでステータスを上げ、アピールで女の子を育成。',
    'home.quick': 'クイックスタート',
    'home.schedule': 'ゲームスケジュール', 'home.changelog': 'サイト更新履歴',
    'home.q1': '指揮するのはあなた、プレイするのは女の子。', 'home.q2': 'POW／TEC／STMは女の子＋水着＋アクセで決まる。', 'home.q3': '規定得点先取。スパイクはPOW、フェイントはTEC。', 'home.q4': 'アピール評価を上げ、初のS評価で大量報酬。',
    'home.card.girls': 'ガールズ', 'home.card.girlsD': '全キャラのプロフィール・数値・育成メモ。',
    'home.card.swim': '水着', 'home.card.swimD': '水着システムと全カタログ。',
    'home.card.guide': 'ガイド', 'home.card.guideD': '試合・水着・育成・経済の解説。',
    'home.card.community': 'コミュニティ', 'home.card.communityD': '貼吧・B站の攻略をセクション別に。',
    'home.card.skills': 'スキル', 'home.card.skillsD': '全スキルタイプと関連水着の逆引き。',
    'home.card.tools': 'ツール', 'home.card.toolsD': 'パネル・PP・経験・属性比較。',
    'home.card.reference': 'データ集', 'home.card.referenceD': 'レベル・バナー・PP・アクセサリ・親密度・公式告知。',
    'home.card.collection': 'コレクション', 'home.card.collectionD': '進捗とローカルバックアップ。',
'ed.note': '本文は中国語です。データとUIは多言語対応。',
    'footer.note': '公式資料とコミュニティ資料をもとに整理。画像・攻略の権利は各作者に帰属。'
  }
};

export const TYPE = {
  zh: { '力量型': '力量型', '技巧型': '技巧型', '体力型': '体力型' },
  en: { '力量型': 'Power', '技巧型': 'Tech', '体力型': 'Stamina' },
  ja: { '力量型': 'パワー', '技巧型': 'テク', '体力型': 'スタミナ' }
};
export const typeLabel = (lang, t) => (TYPE[lang] && TYPE[lang][t]) || t;

export const girlName = (id, lang) => {
  const n = girlNames[id];
  if (!n) return '';
  return n[lang] || n.zh;
};

export const t = (lang, key) => (UI[lang] && UI[lang][key]) || UI.zh[key] || key;