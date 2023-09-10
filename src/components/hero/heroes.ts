export const vindictusHeroes = new Map<number, Hero>([
  [
    1,
    {
      id: 1,
      name: "利斯塔",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    2,
    {
      id: 2,
      name: "菲歐娜",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    3,
    {
      id: 3,
      name: "依菲",
      specialties: ["占星術", "深沉之心", "遠程射擊", "淨化一擊", "元素魔法師"],
    },
  ],
  [
    4,
    {
      id: 4,
      name: "卡魯",
      specialties: ["", "", "", "", "無畏巨人"],
    },
  ],
  [
    5,
    {
      id: 5,
      name: "凱",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    6,
    {
      id: 6,
      name: "薇拉",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    7,
    {
      id: 7,
      name: "赫克",
      specialties: ["航海術", "堅韌耐性", "超凡之勢", "巨型武器", "浪人劍客"],
    },
  ],
  [
    8,
    {
      id: 8,
      name: "玲",
      specialties: ["華麗身世", "止水月步", "神出鬼沒", "淨化一擊", "花瓣誓言"],
    },
  ],
  [
    9,
    {
      id: 9,
      name: "艾瑞莎",
      specialties: ["闇之明瞳", "野生動物知識", "神出鬼沒", "先發制人", "時空支配者"],
    },
  ],
  [
    10,
    {
      id: 10,
      name: "赫基",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    11,
    {
      id: 11,
      name: "蒂莉亞",
      specialties: ["華麗身世", "堅韌耐性", "鋒利之刃", "巨型武器", "信念守護者"],
    },
  ],
  [
    12,
    {
      id: 12,
      name: "彌莉",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    13,
    {
      id: 13,
      name: "葛嵐頓",
      specialties: ["", "", "", "", ""],
    },
  ],
  [
    14,
    {
      id: 14,
      name: "繆兒",
      specialties: ["航海術", "深沉之心", "神出鬼沒", "遠程射擊", "空間魔女"],
    },
  ],
  [
    15,
    {
      id: 15,
      name: "蓓爾",
      specialties: ["鐵胃", "止水月步", "先發制人", "巨型武器", "時間的漂流者"],
    },
  ],
  [
    16,
    {
      id: 16,
      name: "璃朔",
      specialties: ["占星術", "卓越平衡", "謹慎戰術", "連續打擊", "黎明氏族"],
    },
  ],
  [
    17,
    {
      id: 17,
      name: "凱爾",
      specialties: ["華麗身世", "堅韌耐性", "鋒利之刃", "連續打擊", "正義使者"],
    },
  ],
  [
    18,
    {
      id: 18,
      name: "泰莎",
      specialties: ["卓越平衡", "闇之明瞳", "連續打擊", "復仇之影", "愛恨交織的獵人"],
    },
  ],
  [
    19,
    {
      id: 19,
      name: "丹雅",
      specialties: ["占星術", "堅韌耐性", "神出鬼沒", "淨化一擊", "靈魂武士"],
    },
  ],
  [
    20,
    {
      id: 20,
      name: "蕾媞",
      specialties: ["航海術", "卓越平衡", "遠程射擊", "巨型武器", "爆炸愛好者"],
    },
  ],
  [
    21,
    {
      id: 21,
      name: "拉緹雅",
      specialties: ["止水月步", "野生動物知識", "謹慎戰術", "巨型武器", "高潔的獵人"],
    },
  ],
  [
    22,
    {
      id: 22,
      name: "泫兒",
      specialties: ["占星術", "深沉之心", "謹慎戰術", "遠程射擊", "黎明魔女"],
    },
  ],
  [
    23,
    {
      id: 23,
      name: "阿刻洛",
      specialties: ["鐵胃", "野生動物知識", "連續打擊", "先發制人", "赤犬"],
    },
  ],
])

export class Hero {
  id: number
  name: string
  specialties: string[]
  constructor(id: number, name: string, specialties: string[]) {
    this.id = id
    this.name = name
    this.specialties = specialties
  }
}
