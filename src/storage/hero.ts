import { Hero } from "../components/hero/heroes"

const _customHeroesKey = "custom-heroes"
const _ownedHeroesKey = "owned-heroes"

export class HeroStorage {
  public static get valid(): boolean {
    return window.localStorage != undefined
  }

  public static get customized(): Hero[] {
    if (!HeroStorage.valid) return []

    const data = window.localStorage.getItem(_customHeroesKey)
    if (data == null) return []
    return JSON.parse(data)
  }

  public static set customized(heroes: Hero[]) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(_customHeroesKey, JSON.stringify(heroes))
  }

  public static get owned(): { heroID: number; amount: number }[] {
    if (!HeroStorage.valid) return []

    const data = window.localStorage.getItem(_ownedHeroesKey)
    if (data == null) return []
    return JSON.parse(data)
  }

  public static set owned(heroes: { heroID: number; amount: number }[]) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(_customHeroesKey, JSON.stringify(heroes))
  }
}
