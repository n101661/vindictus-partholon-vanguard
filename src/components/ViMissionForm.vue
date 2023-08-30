<template>
  <el-form
    ref="formRef"
    :model="missions"
    label-width="auto"
  >
    <div
      v-for="i in count"
      :key="'mission-' + i"
    >
      <el-form-item
        label="Difficulty"
        :prop="i - 1 + '.difficulty'"
      >
        <el-select v-model="missions[i - 1].difficulty">
          <el-option
            v-for="opt of difficultyOptions"
            :key="opt.label"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Specialties"
        :prop="i - 1 + '.specialties'"
        :rules="[
          {
            type: 'array',
            len: 3,
            message: 'Please choose 3 specialties',
            trigger: 'change',
          },
        ]"
      >
        <el-select
          v-model="missions[i - 1].specialties"
          multiple
          :multiple-limit="3"
        >
          <el-option
            v-for="specialty in specialtiesOptions"
            :key="specialty"
            :label="specialty"
            :value="specialty"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Hero Slots"
        :prop="i - 1 + '.heroSlots'"
        :rules="[
          {
            type: 'number',
            min: 1,
            max: 3,
            message: 'Valid value is 1 to 3',
            trigger: 'change',
          },
        ]"
      >
        <el-input
          v-model.number="missions[i - 1].heroSlots"
          type="number"
          :min="1"
          :max="3"
        />
      </el-form-item>
      <el-form-item
        label="Grand Discovery Points"
        :prop="i - 1 + '.grandDiscoveryPoints'"
        :rules="[
          {
            type: 'number',
            min: 1,
            message: 'Please input a number greater than 0',
            trigger: 'change',
          },
        ]"
      >
        <el-input
          v-model.number="missions[i - 1].grandDiscoveryPoints"
          type="number"
          :min="1"
        />
      </el-form-item>
    </div>
  </el-form>
  <el-button
    type="primary"
    @click="calculateBestTeam(formRef)"
  >
    Submit
  </el-button>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue"
import {
  FormInstance,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus"
import { vindictusHeroes } from "./hero/heroes.ts"

const difficultyOptions: DifficultyOption[] = [
  {
    label: "Easy",
    value: 2,
  },
  {
    label: "Normal",
    value: 0,
  },
  {
    label: "Hard",
    value: -2,
  },
]
const specialtiesOptions = new Set<string>()

const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
})
const formRef = ref<FormInstance>()
const missions = reactive<Mission[]>([])

onBeforeMount(() => {
  vindictusHeroes.forEach((values: string[]) => {
    values.forEach((v: string) => {
      if (v != "") specialtiesOptions.add(v)
    })
  })

  for (let i = 0; i < props.count; i++) {
    missions.push({
      difficulty: 0,
      specialties: [],
      heroSlots: 1,
      grandDiscoveryPoints: 0,
    })
  }
})

function calculateBestTeam(form: FormInstance | undefined) {
  if (!form) return

  form.validate((valid: boolean) => {
    if (!valid) return

    // TODO: calculate best team and show result
  })
}
</script>

<script lang="ts">
interface Mission {
  difficulty: -2 | 0 | 2
  specialties: string[]
  heroSlots: 1 | 2 | 3
  grandDiscoveryPoints: number
}

interface DifficultyOption {
  label: string
  value: -2 | 0 | 2
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
</script>
