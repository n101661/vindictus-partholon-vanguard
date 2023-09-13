import { HeroStorage } from "./hero"
import { MemoryStorage } from "./non-storage"

class ViStorage {
  private _hero: HeroStorage
  constructor() {
    let storage: Storage
    if (window.localStorage) {
      storage = window.localStorage
    } else {
      storage = new MemoryStorage()
    }

    this._hero = new HeroStorage(storage)
  }

  public get hero(): HeroStorage {
    return this._hero
  }
}

export default new ViStorage()
