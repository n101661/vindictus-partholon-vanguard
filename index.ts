interface Mission {
  difficulty: number
  specialties: string[]
  characterSlots: number
  grandDiscoveryPoints: number
}

function maximizeProbabilityBonus(
  missions: Mission[],
  characters: string[][],
): number[][] {
  const specialtiesMap = parseSpecialtiesMap(missions)
  const convertedCharacters = parseCharacters(specialtiesMap, characters)

  const difficulty = missions.map((m: Mission): number => {
    return m.difficulty
  })
  const specialties = parseMissionSpecialties(specialtiesMap, missions)
  const slots = missions.map((m: Mission): number => {
    return m.characterSlots
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
  missionDifficulty: number[],
  missionSpecialties: number[],
  missionRemainedSlots: number[],
  missionRequiredPoints: number[],
  characters: number[],
): number[] {
  return makeBestTeams(
    missionDifficulty,
    missionSpecialties,
    missionRemainedSlots,
    missionRequiredPoints,
    characters,
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
  characters: number[],
  joinedCharacterIndex: number,
  missionGainedPoints: number[],
  lastJoinedCharacters: number[],
): Team {
  if (
    !hasRemainedSlots(missionRemainedSlots) ||
    joinedCharacterIndex == characters.length
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
    characters,
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

    const fitSpecialties =
      missionSpecialties[i] & characters[joinedCharacterIndex]

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
      missionDifficulty,
      missionSpecialties,
      missionRemainedSlots,
      missionRequiredPoints,
      characters,
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
//  - a is the number of characters
//  - b is the number of characters[i]
// space complexity: O(1)
function parseCharacters(
  specialties: Map<string, number>,
  characters: string[][],
): number[] {
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
