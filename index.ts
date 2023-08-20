interface Mission {
  difficulty: number
  specialties: string[]
  characterSlots: number
  grandDiscoveryPoints: number
}

function maximizeProbabilityBonus(missions: Mission[], characters: string[][]): number[][] {
  const specialtiesMap = parseSpecialtiesMap(missions)
  const convertedCharacters = parseCharacters(specialtiesMap, characters)

  const difficulty = missions.map((m: Mission): number => { return m.difficulty })
  const specialties = parseMissionSpecialties(specialtiesMap, missions)
  const slots = missions.map((m: Mission): number => { return m.characterSlots })
  const requiredPoints = missions.map((m: Mission): number => { return m.grandDiscoveryPoints })

  return makeTeams(
    difficulty, specialties,
    slots, requiredPoints,
    convertedCharacters,
  ).map((charactersBitwise: number): number[] => {
    const characters: number[] = []
    for (let bit = 0; charactersBitwise > 0; bit++) {
      if ((charactersBitwise & 1) > 0) {
        characters.push(bit)
      }
      charactersBitwise >>= 1
    }
    return characters
  })
}

// Approach: recursive
// time  complexity: O(a^n), where
//  - n is the number of missions
//  - a is the number of characters
// space complexity: O(a*n)
function makeTeams(
  missionDifficulty: number[], missionSpecialties: number[],
  missionRemainedSlots: number[], missionRequiredPoints: number[],
  characters: number[]
): number[] {
  return makeBestTeams(
    missionDifficulty, missionSpecialties,
    missionRemainedSlots, missionRequiredPoints,
    characters, 0,
    Array<number>(missionDifficulty.length).fill(0), Array<number>(missionDifficulty.length).fill(0)
  ).joinedCharacters
}

interface Team {
  joinedCharacters: number[]
  totalPoints: number
}

function makeBestTeams(
  missionDifficulty: number[], missionSpecialties: number[],
  missionRemainedSlots: number[], missionRequiredPoints: number[],
  characters: number[], joinedCharacterIndex: number,
  missionGainedPoints: number[], lastJoinedCharacters: number[]
): Team {
  if (!hasRemainedSlots(missionRemainedSlots) || joinedCharacterIndex == characters.length) {
    return {
      joinedCharacters: [...lastJoinedCharacters],
      totalPoints: missionGainedPoints.reduce((previous: number, current: number): number => {
        return previous + current
      }, 0)
    }
  }

  // not join any mission
  let { joinedCharacters, totalPoints } = makeBestTeams(
    missionDifficulty, missionSpecialties,
    missionRemainedSlots, missionRequiredPoints,
    characters, joinedCharacterIndex + 1,
    missionGainedPoints, lastJoinedCharacters
  )

  // join mission
  for (let i = 0; i < missionRemainedSlots.length; i++) {
    if (missionRemainedSlots[i] == 0 || missionGainedPoints[i] == missionRequiredPoints[i]) { continue }

    const fitSpecialties = missionSpecialties[i] & characters[joinedCharacterIndex]

    missionSpecialties[i] -= fitSpecialties
    missionRemainedSlots[i]--
    lastJoinedCharacters[i] += 1 << joinedCharacterIndex

    const gainedPoints = [...missionGainedPoints]
    // calculate points of character joined
    gainedPoints[i] += gainedPoints[i] == 0 ? 10 + missionDifficulty[i] : 5
    // calculate points of fitting specialties
    gainedPoints[i] += countBits(fitSpecialties) * 3
    // points can't over missionRequiredPoints[i]
    if (gainedPoints[i] > missionRequiredPoints[i]) {
      gainedPoints[i] = missionRequiredPoints[i]
    }

    const result = makeBestTeams(
      missionDifficulty, missionSpecialties,
      missionRemainedSlots, missionRequiredPoints,
      characters, joinedCharacterIndex + 1,
      gainedPoints, lastJoinedCharacters
    )

    missionSpecialties[i] += fitSpecialties
    missionRemainedSlots[i]++
    lastJoinedCharacters[i] -= 1 << joinedCharacterIndex

    if (result.totalPoints > totalPoints) {
      joinedCharacters = result.joinedCharacters
      totalPoints = result.totalPoints
    }
  }
  return {
    joinedCharacters: joinedCharacters,
    totalPoints: totalPoints
  }
}

function countBits(v: number): number {
  let count = 0
  while (v > 0) {
    v -= ~(v - 1) & v
    count++
  }
  return count
}

function hasRemainedSlots(slots: number[]): boolean {
  for (let slot of slots) {
    if (slot > 0) { return true }
  }
  return false
}

// time  complexity: O(n*m), where
//  - n is the number of missions
//  - m is the number of specialties of mission
// space complexity: O(1)
function parseSpecialtiesMap(missions: Mission[]): Map<string, number> {
  const sm = new Map<string, number>()
  let counter = 0
  missions.forEach((m: Mission) => {
    m.specialties.forEach((s: string) => {
      if (sm.has(s)) { return }
      sm.set(s, 1 << counter++)
    })
  })
  return sm
}

// time complexity: O(a*b), where
//  - a is the number of characters
//  - b is the number of characters[i]
// space complexity: O(1)
function parseCharacters(specialties: Map<string, number>, characters: string[][]): number[] {
  return characters.map((traits: string[]): number => {
    let v = 0
    traits.forEach((s: string) => {
      v += specialties.get(s) ?? 0
    })
    return v
  })
}

// time complexity: O(n*m), where
//  - n is the number of missions
//  - m is the number of missions[i].specialties
// space complexity: O(1)
function parseMissionSpecialties(specialtiesMap: Map<string, number>, missions: Mission[]): number[] {
  return missions.map((m: Mission): number => {
    let specialties = 0
    m.specialties.forEach((s: string) => {
      specialties += specialtiesMap.get(s) ?? 0
    })
    return specialties
  })
}

// --------------

const vindictusCharacters = new Map<string, string[]>([
  ["Lethita", ["x", "x", "x", "x", "x"]],
  ["Fiona", ["x", "x", "x", "x", "x"]],
  ["Evy", ["占星術", "深沉之心", "遠程射擊", "淨化一擊", "元素魔法師"]],
  ["Kalok", ["x", "x", "x", "x", "無畏巨人"]],
  ["Kay", ["x", "x", "x", "x", "x"]],
  ["Vella", ["x", "x", "x", "x", "x"]],
  ["Hurk", ["航海術", "堅韌耐性", "超凡之勢", "巨型武器", "浪人劍客"]],
  ["Lynn", ["華麗身世", "止水月步", "神出鬼沒", "淨化一擊", "花瓣誓言"]],
  ["Arisha", ["闇之明瞳", "野生動物知識", "神出鬼沒", "先發制人", "時空支配者"]],
  ["Hagie", ["x", "x", "x", "x", "x"]],
  ["Delia", ["華麗身世", "堅韌耐性", "鋒利之刃", "巨型武器", "信念守護者"]],
  ["Miri", ["x", "x", "x", "x", "x"]],
  ["Grimden", ["x", "x", "x", "x", "x"]],
  ["Miul", ["航海術", "深沉之心", "神出鬼沒", "遠程射擊", "空間魔女"]],
  ["Bel", ["鐵胃", "止水月步", "先發制人", "巨型武器", "時間的漂流者"]],
  ["Lethor", ["占星術", "卓越平衡", "謹慎戰術", "連續打擊", "黎明氏族"]],
  ["Kael", ["華麗身世", "堅韌耐性", "鋒利之刃", "連續打擊", "正義使者"]],
  ["Tessa", ["卓越平衡", "闇之明瞳", "連續打擊", "復仇之影", "愛恨交織的獵人"]],
  ["Danah", ["占星術", "堅韌耐性", "神出鬼沒", "淨化一擊", "靈魂武士"]],
  ["Letty", ["航海術", "卓越平衡", "遠程射擊", "巨型武器", "爆炸愛好者"]],
  ["Latiya", ["止水月步", "野生動物知識", "謹慎戰術", "巨型武器", "高潔的獵人"]],
  ["Czern", ["占星術", "深沉之心", "謹慎戰術", "遠程射擊", "黎明魔女"]]
])

const vindictusMissions: Mission[] = [
  {
    difficulty: -2,
    specialties: ["超凡之勢", "復仇之影", "淨化一擊"],
    characterSlots: 1,
    grandDiscoveryPoints: 26
  },
  {
    difficulty: 2,
    specialties: ["淨化一擊", "闇之明瞳", "華麗身世"],
    characterSlots: 3,
    grandDiscoveryPoints: 48
  },
  {
    difficulty: 0,
    specialties: ["復仇之影", "謹慎戰術", "連續打擊"],
    characterSlots: 3,
    grandDiscoveryPoints: 69
  },
  {
    difficulty: 2,
    specialties: ["遠程射擊", "連續打擊", "先發制人"],
    characterSlots: 1,
    grandDiscoveryPoints: 40
  },
  {
    difficulty: -2,
    specialties: ["謹慎戰術", "巨型武器", "神出鬼沒"],
    characterSlots: 1,
    grandDiscoveryPoints: 26
  },
]
const myCharacters: string[] = [
  "Evy",
  "Hurk",
  "Lynn",
  "Arisha",
  "Delia",
  "Miul",
  "Bel",
  "Lethor",
  "Kael",
  "Tessa",
  "Danah",
  "Letty",
  "Latiya",
  "Czern"
]

function calculateSpendTime(f: () => void) {
  const now = Date.now()
  f()
  const duration = Date.now() - now
  console.log(duration / 1000, "s ", duration % 1000, "ms")
}

calculateSpendTime(() => {
  const ans = maximizeProbabilityBonus(
    vindictusMissions,
    myCharacters.map((c: string): string[] => {
      return vindictusCharacters.get(c) ?? []
    })
  )
  const heroName = new Map<string, string>([
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
    ["Czern", "泫兒"]
  ])

  console.log(ans.map((cs: number[]): string[] => {
    return cs.map((v: number): string => {
      return heroName.get(myCharacters[v]) ?? "unknown"
    })
  }))
})