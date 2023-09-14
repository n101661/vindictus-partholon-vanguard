const _menuCollapse = "menu.collapse"

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
}
