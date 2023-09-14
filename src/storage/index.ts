import { HeroStorage } from "./hero"
import { MemoryStorage } from "./non-storage"
import { UXStorage } from "./ux"

class ViStorage {
  private _hero: HeroStorage
  private _ux: UXStorage

  constructor() {
    let storage: Storage
    if (window.localStorage) {
      storage = window.localStorage
    } else {
      storage = new MemoryStorage()
    }

    this._hero = new HeroStorage(storage)
    this._ux = new UXStorage(storage)
  }

  public get hero(): HeroStorage {
    return this._hero
  }

  public get ux(): UXStorage {
    return this._ux
  }
}

export default new ViStorage()
