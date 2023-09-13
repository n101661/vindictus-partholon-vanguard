export class MemoryStorage implements Storage {
  private storage: Map<string, string>
  length: number

  constructor() {
    this.length = 0
    this.storage = new Map()
  }

  public clear(): void {
    this.storage.clear()
    this.length = this.storage.size
  }

  public getItem(key: string): string | null {
    const value = this.storage.get(key)
    if (value === undefined) return null
    return value
  }

  public key(index: number): string | null {
    if (index >= this.length) return null

    const values = this.storage.values()
    let i = 0
    for (const v of values) {
      if (i == index) return v
      i++
    }
    return null
  }

  public removeItem(key: string): void {
    this.storage.delete(key)
    this.length = this.storage.size
  }

  public setItem(key: string, value: string): void {
    this.storage.set(key, value)
    this.length = this.storage.size
  }
}
