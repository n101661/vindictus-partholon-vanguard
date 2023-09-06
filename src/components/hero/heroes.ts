export const vindictusHeroes: Hero[] = [
  {
    id: 1,
    name: "Lethita",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 2,
    name: "Fiona",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 3,
    name: "Evy",
    specialties: ["占星術", "深沉之心", "遠程射擊", "淨化一擊", "元素魔法師"],
  },
  {
    id: 4,
    name: "Kalok",
    specialties: ["", "", "", "", "無畏巨人"],
  },
  {
    id: 5,
    name: "Kay",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 6,
    name: "Vella",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 7,
    name: "Hurk",
    specialties: ["航海術", "堅韌耐性", "超凡之勢", "巨型武器", "浪人劍客"],
  },
  {
    id: 8,
    name: "Lynn",
    specialties: ["華麗身世", "止水月步", "神出鬼沒", "淨化一擊", "花瓣誓言"],
  },
  {
    id: 9,
    name: "Arisha",
    specialties: ["闇之明瞳", "野生動物知識", "神出鬼沒", "先發制人", "時空支配者"],
  },
  {
    id: 10,
    name: "Hagie",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 11,
    name: "Delia",
    specialties: ["華麗身世", "堅韌耐性", "鋒利之刃", "巨型武器", "信念守護者"],
  },
  {
    id: 12,
    name: "Miri",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 13,
    name: "Grimden",
    specialties: ["", "", "", "", ""],
  },
  {
    id: 14,
    name: "Miul",
    specialties: ["航海術", "深沉之心", "神出鬼沒", "遠程射擊", "空間魔女"],
  },
  {
    id: 15,
    name: "Bel",
    specialties: ["鐵胃", "止水月步", "先發制人", "巨型武器", "時間的漂流者"],
  },
  {
    id: 16,
    name: "Lethor",
    specialties: ["占星術", "卓越平衡", "謹慎戰術", "連續打擊", "黎明氏族"],
  },
  {
    id: 17,
    name: "Kael",
    specialties: ["華麗身世", "堅韌耐性", "鋒利之刃", "連續打擊", "正義使者"],
  },
  {
    id: 18,
    name: "Tessa",
    specialties: ["卓越平衡", "闇之明瞳", "連續打擊", "復仇之影", "愛恨交織的獵人"],
  },
  {
    id: 19,
    name: "Danah",
    specialties: ["占星術", "堅韌耐性", "神出鬼沒", "淨化一擊", "靈魂武士"],
  },
  {
    id: 20,
    name: "Letty",
    specialties: ["航海術", "卓越平衡", "遠程射擊", "巨型武器", "爆炸愛好者"],
  },
  {
    id: 21,
    name: "Latiya",
    specialties: ["止水月步", "野生動物知識", "謹慎戰術", "巨型武器", "高潔的獵人"],
  },
  {
    id: 22,
    name: "Czern",
    specialties: ["占星術", "深沉之心", "謹慎戰術", "遠程射擊", "黎明魔女"],
  },
  {
    id: 23,
    name: "Achel",
    specialties: ["鐵胃", "野生動物知識", "連續打擊", "先發制人", "赤犬"],
  },
]

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

const names = new Map<string, string>([
  ["Lethita", "利斯塔"],
  ["Fiona", "菲歐娜"],
  ["Evy", "依菲"],
  ["Kalok", "卡魯"],
  ["Kay", "凱"],
  ["Vella", "薇拉"],
  ["Hurk", "赫克"],
  ["Lynn", "玲"],
  ["Arisha", "艾瑞莎"],
  ["Hagie", "赫基"],
  ["Delia", "蒂莉亞"],
  ["Miri", "彌莉"],
  ["Grimden", "葛嵐頓"],
  ["Miul", "繆兒"],
  ["Bel", "蓓爾"],
  ["Lethor", "璃朔"],
  ["Kael", "凱爾"],
  ["Tessa", "泰莎"],
  ["Danah", "丹雅"],
  ["Letty", "蕾媞"],
  ["Latiya", "拉緹雅"],
  ["Czern", "泫兒"],
  ["Achel", "阿刻洛"],
])

export function getName(id: string): string {
  return names.get(id) ?? id
}
