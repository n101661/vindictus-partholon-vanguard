import { MissionWithTeammates } from "../models/mission"

const _menuCollapse = "menu.collapse"
const _missions = "missions"

interface Missions {
  missions: MissionWithTeammates[]
  expiry: number
}

export class UXStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  public get menuCollapse(): boolean {
    return this.storage.getItem(_menuCollapse) === "true"
  }
  public set menuCollapse(collapse: boolean) {
    this.storage.setItem(_menuCollapse, collapse ? "true" : "false")
  }

  public get missions(): MissionWithTeammates[] {
    const data = this.storage.getItem(_missions)
    if (data === null) return []
    const m: Missions = JSON.parse(data)
    if (new Date().valueOf() > m.expiry) return []
    return m.missions
  }
  public set missions(ms: MissionWithTeammates[]) {
    const now = new Date()
    const data: Missions = {
      missions: ms,
      expiry: now.setMinutes(now.getMinutes() + 20),
    }
    this.storage.setItem(_missions, JSON.stringify(data))
  }
}
