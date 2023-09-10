import { Hero } from "../components/hero/heroes"

const _customHeroesKey = "custom-heroes"
const _ownedHeroesKey = "owned-heroes"

export class HeroStorage {
  public static get valid(): boolean {
    return window.localStorage != undefined
  }

  public static get customized(): Map<number, Hero> {
    if (!HeroStorage.valid) return new Map()

    const data = window.localStorage.getItem(_customHeroesKey)
    if (data == null) return new Map()
    return new Map(JSON.parse(data))
  }

  public static set customized(heroes: Map<number, Hero>) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(
      _customHeroesKey,
      JSON.stringify(Array.from(heroes.entries())),
    )
  }

  public static addCustomized(hero: Hero): boolean {
    if (!HeroStorage.valid) return false

    const heroes = HeroStorage.customized
    if (heroes.get(hero.id) != undefined) return false

    heroes.set(hero.id, hero)
    HeroStorage.customized = heroes
    return true
  }

  public static removeCustomized(id: number): Hero | undefined {
    if (!HeroStorage.valid) return undefined

    const heroes = HeroStorage.customized
    const hero = heroes.get(id)
    heroes.delete(id)
    HeroStorage.customized = heroes
    return hero
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

  public static clear() {
    if (!HeroStorage.valid) return
    window.localStorage.clear()
  }
}
