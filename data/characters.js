const DOAXVV_CHARACTERS = [
  { id: "misaki", name: "海咲", romaji: "Misaki", jp: "みさき", cv: "津田美波", birthday: "7月7日", age: "18岁", height: "156cm", size: "B85 / W54 / H89", category: "初始", tags: ["学生", "助手"], profile: "游戏开始最先迎接岛主的女孩。兼职工作人员，作为专属助手时刻为岛主提供支援，像朋友一样轻松相处。极度讨厌暴露肌肤，有害羞的一面。" },
  { id: "elena", name: "海莲娜", romaji: "Elena", jp: "エレナ", cv: "小山裕香", birthday: "1月30日", age: "23岁", height: "待补充", size: "待补充", category: "初始", tags: ["DOATEC", "统帅"], profile: "综合企业兼幕后黑手 DOATEC 的现任统帅，察觉到维纳斯群岛上有与多诺万有关的线索，假借私人度假来到岛上调查。" },
  { id: "momiji", name: "红叶", romaji: "Momiji", jp: "紅葉", cv: "皆口裕子", birthday: "9月20日", age: "21岁", height: "待补充", size: "待补充", category: "初始", tags: ["忍者", "龙之巫女"], profile: "龙之巫女、女忍者，收到命令来到岛上进行修行。" },
  { id: "hitomi", name: "瞳", romaji: "Hitomi", jp: "ヒトミ", cv: "堀江由衣", birthday: "5月25日", age: "20岁", height: "待补充", size: "待补充", category: "初始", tags: ["学生", "空手道"], profile: "学生兼空手道老师，世界顶尖的空手道高手。" },
  { id: "nyotengu", name: "女天狗", romaji: "Nyotengu", jp: "女天狗", cv: "佐藤朱", birthday: "11月19日（特别日）", age: "1018岁（换算）", height: "172cm", size: "B93 / W58 / H88", category: "初始", tags: ["天狗"], profile: "隐居深山的天狗一族族人，因感受到人类“假期”的气息而来到岛上。" },
  { id: "kokoro", name: "心", romaji: "Kokoro", jp: "こころ", cv: "川澄绫子", birthday: "12月1日", age: "19岁", height: "待补充", size: "待补充", category: "初始", tags: ["学生", "舞妓"], profile: "学生兼舞妓，为了更好的修行而前往维纳斯群岛度假。" },
  { id: "ayane", name: "绫音", romaji: "Ayane", jp: "あやね", cv: "山崎和佳奈", birthday: "8月5日", age: "18岁", height: "157cm", size: "B93 / W54 / H84", category: "初始", tags: ["忍者"], profile: "女忍者，因追逐身为“叛忍”的霞而来到维纳斯群岛。" },
  { id: "kasumi", name: "霞", romaji: "Kasumi", jp: "かすみ", cv: "桑岛法子", birthday: "2月23日", age: "19岁", height: "待补充", size: "待补充", category: "初始", tags: ["忍者", "叛忍"], profile: "退出组织的忍者，绫音的同父异母姐姐。因占卜显示岛上有自己想要的东西而来到岛上。" },
  { id: "honoka", name: "穗香", romaji: "Honoka", jp: "ほのか", cv: "野中蓝", birthday: "3月24日", age: "18岁", height: "待补充", size: "待补充", category: "初始", tags: ["学生"], profile: "喜欢格斗的校园女孩，在商店街抽奖中抽中招待券而来到维纳斯群岛旅行。" },
  { id: "marierose", name: "玛莉萝丝", romaji: "Marie Rose", jp: "マリー・ローズ", cv: "相泽舞", birthday: "6月6日", age: "18岁", height: "待补充", size: "待补充", category: "初始", tags: ["仆从"], profile: "海莲娜的仆人，被海莲娜带到岛上后便独自留了下来。以上10人为游戏开场时可选其二的初始角色。" },

  { id: "luna", name: "露娜", romaji: "Luna", jp: "ルナ", cv: "三上枝织", birthday: "10月15日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["学者"], profile: "学者。因未知原因倒在沙滩上，被岛主给的烤红薯拯救后主动留下调查维纳斯锦标赛。" },
  { id: "tamaki", name: "环", romaji: "Tamaki", jp: "たまき", cv: "大西沙织", birthday: "8月19日", age: "22岁", height: "待补充", size: "待补充", category: "追加", tags: ["设计师"], profile: "服装设计师。" },
  { id: "leifang", name: "丽凤", romaji: "Leifang", jp: "レイファン", cv: "冬马由美", birthday: "4月23日", age: "21岁", height: "待补充", size: "待补充", category: "追加", tags: ["学生", "太极拳"], profile: "学生，太极拳手。" },
  { id: "fiona", name: "菲欧娜", romaji: "Fiona", jp: "フィオナ", cv: "本渡枫", birthday: "2月11日", age: "18岁", height: "152cm", size: "B88 / W55 / H84", category: "追加", tags: ["公主"], profile: "自称职业是公主。" },
  { id: "nagisa", name: "凪咲", romaji: "Nagisa", jp: "なぎさ", cv: "内田真礼", birthday: "5月5日", age: "20岁", height: "待补充", size: "待补充", category: "追加", tags: ["舞台演员"], profile: "舞台演员，海咲的姐姐。十分看重妹妹，对想抢走她的男性充满敌意，一般称岛主为“色狗”，实为傲娇。" },
  { id: "kanna", name: "神无", romaji: "Kanna", jp: "カンナ", cv: "大空直美", birthday: "9月15日（特别日）", age: "1014岁（换算）", height: "待补充", size: "待补充", category: "追加", tags: ["鬼"], profile: "鬼。扬言要将岛屿与岛主占为己有。" },
  { id: "monica", name: "莫妮卡", romaji: "Monica", jp: "モニカ", cv: "幸村惠理", birthday: "1月1日", age: "19岁", height: "待补充", size: "待补充", category: "追加", tags: ["荷官"], profile: "自称是荷官。" },
  { id: "sayuri", name: "小百合", romaji: "Sayuri", jp: "さゆり", cv: "和气杏未", birthday: "3月31日", age: "24岁", height: "待补充", size: "待补充", category: "追加", tags: ["护士"], profile: "护士，应聘岛上的护士职位，并因此与岛主结识。" },
  { id: "patty", name: "派蒂", romaji: "Patty", jp: "パティ", cv: "高野麻里佳", birthday: "7月31日", age: "19岁", height: "待补充", size: "待补充", category: "追加", tags: ["本地", "少女"], profile: "维纳斯群岛上土生土长的少女。" },
  { id: "tsukushi", name: "筑紫", romaji: "Tsukushi", jp: "つくし", cv: "指出毬亚", birthday: "10月24日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["学生", "美术"], profile: "美术系学生，为了取材而来到维纳斯群岛。" },
  { id: "lobelia", name: "萝贝莉娅", romaji: "Lobelia", jp: "ロベリア", cv: "古贺葵", birthday: "6月25日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["贵族"], profile: "笑得促狭的贵族大小姐，初次见面就吃菲欧娜的醋。名字指半边莲，花语是“恶意”。" },
  { id: "nanami", name: "七海", romaji: "Nanami", jp: "ななみ", cv: "岛袋美由利", birthday: "4月16日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["学生"], profile: "学生，外冷内热的冰山美人。" },
  { id: "elise", name: "伊莉丝", romaji: "Elise", jp: "エリーゼ", cv: "濑户麻沙美", birthday: "9月3日", age: "22岁", height: "待补充", size: "待补充", category: "追加", tags: ["指导员"], profile: "自称是“指导员”，严厉的完美主义者。" },
  { id: "koharu", name: "小春", romaji: "Koharu", jp: "こはる", cv: "长绳麻理亚", birthday: "12月22日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["学生", "温泉"], profile: "学生兼温泉小掌柜，前来维纳斯群岛进行女将修业。" },
  { id: "tina", name: "蒂娜", romaji: "Tina", jp: "ティナ", cv: "永岛由子", birthday: "12月6日", age: "24岁", height: "待补充", size: "待补充", category: "追加", tags: ["摇滚明星"], profile: "摇滚明星，在维纳斯岛度假期间被岛主找上门请求参赛。以上25人目前已在国际服实装。" },

  { id: "amy", name: "艾咪", romaji: "Amy", jp: "エイミー", cv: "铃代纱弓", birthday: "6月18日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["研究生", "工程师"], profile: "研究生兼工程师。" },
  { id: "shandy", name: "香蒂", romaji: "Shandy", jp: "シャンディ", cv: "下地紫野", birthday: "3月3日", age: "21岁", height: "待补充", size: "待补充", category: "追加", tags: ["调酒师"], profile: "调酒师。" },
  { id: "yukino", name: "雪乃", romaji: "Yukino", jp: "ゆきの", cv: "前田佳织里", birthday: "1月20日", age: "18岁", height: "待补充", size: "待补充", category: "追加", tags: ["学生"], profile: "学生。" },
  { id: "shizuku", name: "雫", romaji: "Shizuku", jp: "しずく", cv: "羊宫妃那", birthday: "待补充", age: "19岁", height: "待补充", size: "待补充", category: "追加", tags: ["—"], profile: "详细资料待补充。" },
  { id: "reika", name: "玲夏", romaji: "Reika", jp: "れいか", cv: "近藤玲奈", birthday: "7月21日", age: "18岁", height: "151cm", size: "B83 / W54 / H85", category: "追加", tags: ["学生", "救生员"], profile: "学生兼职救生员。" },
  { id: "megu", name: "梅格", romaji: "Megu", jp: "メグ", cv: "富田美忧", birthday: "2月4日", age: "19岁", height: "待补充", size: "待补充", category: "追加", tags: ["咖啡店"], profile: "咖啡店店员，慵懒随性。" },
  { id: "azusa", name: "梓", romaji: "Azusa", jp: "あずさ", cv: "布里德卡特·塞拉·惠美", birthday: "8月12日", age: "20岁", height: "待补充", size: "待补充", category: "追加", tags: ["定食店"], profile: "在定食店帮忙家业。" },
  { id: "nozomi", name: "望", romaji: "Nozomi", jp: "のぞみ", cv: "花宫初奈", birthday: "9月30日", age: "20岁", height: "待补充", size: "待补充", category: "追加", tags: ["店主"], profile: "新人店主。" }
];

if (typeof window !== 'undefined') window.DOAXVV_CHARACTERS = DOAXVV_CHARACTERS;
export const characters = DOAXVV_CHARACTERS;
