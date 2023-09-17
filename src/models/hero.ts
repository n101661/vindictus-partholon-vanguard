export class Hero {
  id: number
  name: string
  specialties: string[]
  constructor()
  constructor(id: number, name: string, specialties: string[])
  constructor(id = 0, name = "", specialties: string[] = []) {
    this.id = id
    this.name = name
    this.specialties = specialties
  }

  public clone(): Hero {
    return new Hero(this.id, this.name, [...this.specialties])
  }
}
