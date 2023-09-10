import { Hero } from "../components/hero/heroes"

const _customHeroesKey = "custom-heroes"
const _customHeroIdKey = "custom-hero.id"
const _ownedHeroesKey = "owned-heroes"

export class HeroStorage {
  public static get valid(): boolean {
    return window.localStorage != undefined
  }

  public static get customizedHeroes(): Map<number, Hero> {
    if (!HeroStorage.valid) return new Map()

    const data = window.localStorage.getItem(_customHeroesKey)
    if (data == null) return new Map()
    return new Map(JSON.parse(data))
  }

  public static set customizedHeroes(heroes: Map<number, Hero>) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(
      _customHeroesKey,
      JSON.stringify(Array.from(heroes.entries())),
    )
  }

  public static addCustomizedHero(hero: Hero): boolean {
    if (!HeroStorage.valid) return false

    const heroes = HeroStorage.customizedHeroes
    if (heroes.get(hero.id) != undefined) return false

    heroes.set(hero.id, hero)
    HeroStorage.customizedHeroes = heroes
    return true
  }

  public static removeCustomizedHero(id: number): Hero | undefined {
    if (!HeroStorage.valid) return undefined

    const heroes = HeroStorage.customizedHeroes
    const hero = heroes.get(id)
    heroes.delete(id)
    HeroStorage.customizedHeroes = heroes
    return hero
  }

  public static get customizedHeroId(): number | undefined {
    if (!HeroStorage.valid) return undefined

    const data = window.localStorage.getItem(_customHeroIdKey)
    if (data == null) return undefined
    return Number(data)
  }

  public static set customizedHeroId(id: number) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(_customHeroIdKey, id.toString())
  }

  public static get ownedHeroes(): Map<number, number> {
    if (!HeroStorage.valid) return new Map()

    const data = window.localStorage.getItem(_ownedHeroesKey)
    if (data == null) return new Map()
    return new Map(JSON.parse(data))
  }

  public static set ownedHeroes(heroes: Map<number, number>) {
    if (!HeroStorage.valid) return
    window.localStorage.setItem(
      _customHeroesKey,
      JSON.stringify(Array.from(heroes.entries())),
    )
  }

  public static setOwnedHero(id: number, amount: number) {
    const heroes = HeroStorage.ownedHeroes
    if (amount <= 0) {
      heroes.delete(id)
    } else {
      heroes.set(id, amount)
    }
    HeroStorage.ownedHeroes = heroes
  }

  public static clear() {
    if (!HeroStorage.valid) return
    window.localStorage.clear()
  }
}
