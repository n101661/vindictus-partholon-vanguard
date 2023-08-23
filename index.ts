interface Mission {
  difficulty: number
  specialties: string[]
  heroSlots: number
  grandDiscoveryPoints: number
}

function maximizeProbabilityBonus(
  missions: Mission[],
  heroes: string[][],
): number[][] {
  const specialtiesMap = parseSpecialtiesMap(missions)
  const convertedCharacters = parseCharacters(specialtiesMap, heroes)

  const difficulty = missions.map((m: Mission): number => {
    return m.difficulty
  })
  const specialties = parseMissionSpecialties(specialtiesMap, missions)
  const slots = missions.map((m: Mission): number => {
    return m.heroSlots
  })
  const requiredPoints = missions.map((m: Mission): number => {
    return m.grandDiscoveryPoints
  })

  return makeTeams(
    difficulty,
    specialties,
    slots,
    requiredPoints,
    convertedCharacters,
  ).map((heroesBitwise: number): number[] => {
    const heroes: number[] = []
    for (let bit = 0; heroesBitwise > 0; bit++) {
      if ((heroesBitwise & 1) > 0) {
        heroes.push(bit)
      }
      heroesBitwise >>= 1
    }
    return heroes
  })
}

// Approach: recursive
// time  complexity: O(a^n), where
//  - n is the number of missions
//  - a is the number of heroes
// space complexity: O(a*n)
function makeTeams(
  missionDifficulty: number[],
  missionSpecialties: number[],
  missionRemainedSlots: number[],
  missionRequiredPoints: number[],
  heroes: number[],
): number[] {
  return makeBestTeams(
    missionDifficulty,
    missionSpecialties,
    missionRemainedSlots,
    missionRequiredPoints,
    heroes,
    0,
    Array<number>(missionDifficulty.length).fill(0),
    Array<number>(missionDifficulty.length).fill(0),
  ).joinedCharacters
}

interface Team {
  joinedCharacters: number[]
  totalPoints: number
}

function makeBestTeams(
  missionDifficulty: number[],
  missionSpecialties: number[],
  missionRemainedSlots: number[],
  missionRequiredPoints: number[],
  heroes: number[],
  joinedCharacterIndex: number,
  missionGainedPoints: number[],
  lastJoinedCharacters: number[],
): Team {
  if (
    !hasRemainedSlots(missionRemainedSlots) ||
    joinedCharacterIndex == heroes.length
  ) {
    return {
      joinedCharacters: [...lastJoinedCharacters],
      totalPoints: missionGainedPoints.reduce(
        (previous: number, current: number): number => {
          return previous + current
        },
        0,
      ),
    }
  }

  // not join any mission
  let { joinedCharacters, totalPoints } = makeBestTeams(
    missionDifficulty,
    missionSpecialties,
    missionRemainedSlots,
    missionRequiredPoints,
    heroes,
    joinedCharacterIndex + 1,
    missionGainedPoints,
    lastJoinedCharacters,
  )

  // join mission
  for (let i = 0; i < missionRemainedSlots.length; i++) {
    if (
      missionRemainedSlots[i] == 0 ||
      missionGainedPoints[i] == missionRequiredPoints[i]
    ) {
      continue
    }

    const fitSpecialties = missionSpecialties[i] & heroes[joinedCharacterIndex]

    missionSpecialties[i] -= fitSpecialties
    missionRemainedSlots[i]--
    lastJoinedCharacters[i] += 1 << joinedCharacterIndex

    const gainedPoints = [...missionGainedPoints]
    // calculate points of hero joined
    gainedPoints[i] += gainedPoints[i] == 0 ? 10 + missionDifficulty[i] : 5
    // calculate points of fitting specialties
    gainedPoints[i] += countBits(fitSpecialties) * 3
    // points can't over missionRequiredPoints[i]
    if (gainedPoints[i] > missionRequiredPoints[i]) {
      gainedPoints[i] = missionRequiredPoints[i]
    }

    const result = makeBestTeams(
      missionDifficulty,
      missionSpecialties,
      missionRemainedSlots,
      missionRequiredPoints,
      heroes,
      joinedCharacterIndex + 1,
      gainedPoints,
      lastJoinedCharacters,
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
    totalPoints: totalPoints,
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
  for (const slot of slots) {
    if (slot > 0) {
      return true
    }
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
      if (sm.has(s)) {
        return
      }
      sm.set(s, 1 << counter++)
    })
  })
  return sm
}

// time complexity: O(a*b), where
//  - a is the number of heroes
//  - b is the number of heroes[i]
// space complexity: O(1)
function parseCharacters(
  specialties: Map<string, number>,
  heroes: string[][],
): number[] {
  return heroes.map((traits: string[]): number => {
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
function parseMissionSpecialties(
  specialtiesMap: Map<string, number>,
  missions: Mission[],
): number[] {
  return missions.map((m: Mission): number => {
    let specialties = 0
    m.specialties.forEach((s: string) => {
      specialties += specialtiesMap.get(s) ?? 0
    })
    return specialties
  })
}
