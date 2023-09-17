import { Hero } from "./hero"

export type MissionDifficulty = -2 | 0 | 2

export interface Mission {
  difficulty: MissionDifficulty
  specialties: string[]
  heroSlots: 1 | 2 | 3
  grandDiscoveryPoints: number
}

export interface MissionWithTeammates extends Mission {
  teammates: Hero[]
}
