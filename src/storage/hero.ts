import { Hero } from "../models/hero"

const _customHeroesKey = "custom-heroes"
const _customHeroIdKey = "custom-hero.id"
const _ownedHeroesKey = "owned-heroes"

interface _Hero {
  id: number
  name: string
  specialties: string[]
}

export class HeroStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  public get customizedHeroes(): Map<number, Hero> {
    const data = this.storage.getItem(_customHeroesKey)
    if (data == null) return new Map()

    const result = new Map<number, Hero>()
    new Map<number, _Hero>(JSON.parse(data)).forEach((val, key) => {
      result.set(key, new Hero(val.id, val.name, val.specialties))
    })
    return result
  }

  public set customizedHeroes(heroes: Map<number, Hero>) {
    this.storage.setItem(
      _customHeroesKey,
      JSON.stringify(Array.from(heroes.entries())),
    )
  }

  public addCustomizedHero(hero: Hero): boolean {
    const heroes = this.customizedHeroes
    if (heroes.get(hero.id) != undefined) return false

    heroes.set(hero.id, hero)
    this.customizedHeroes = heroes
    return true
  }

  public removeCustomizedHero(id: number): Hero | undefined {
    const heroes = this.customizedHeroes
    const hero = heroes.get(id)
    heroes.delete(id)
    this.customizedHeroes = heroes
    return hero
  }

  public get customizedHeroId(): number | undefined {
    const data = this.storage.getItem(_customHeroIdKey)
    if (data == null) return undefined
    return Number(data)
  }

  public set customizedHeroId(id: number) {
    this.storage.setItem(_customHeroIdKey, id.toString())
  }

  public get ownedHeroes(): Map<number, number> {
    const data = this.storage.getItem(_ownedHeroesKey)
    if (data == null) return new Map()
    return new Map(JSON.parse(data))
  }

  public set ownedHeroes(heroes: Map<number, number>) {
    this.storage.setItem(
      _ownedHeroesKey,
      JSON.stringify(Array.from(heroes.entries())),
    )
  }

  public setOwnedHero(id: number, amount: number) {
    const heroes = this.ownedHeroes
    if (amount <= 0) {
      heroes.delete(id)
    } else {
      heroes.set(id, amount)
    }
    this.ownedHeroes = heroes
  }

  public clear() {
    this.storage.clear()
  }
}
