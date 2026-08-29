import { type Equipment } from "./equipment";

export class EquipmentSlot<T extends Equipment> {
  private _equipment: T | null;

  constructor(equipment?: T) {
    this._equipment = equipment ?? null;
  }

  get equipment(): T | null {
    return this._equipment;
  }

  equip(equipment: T): void {
    this.assertEmpty();

    this._equipment = equipment;
  }

  unequip(): void {
    this.assertEquipped();

    this._equipment = null;
  }

  private assertEmpty(): void {
    if (!this.isEmpty()) {
      throw new Error("already equipped");
    }
  }

  private assertEquipped(): void {
    if (this.isEmpty()) {
      throw new Error("not equipped");
    }
  }

  private isEmpty(): boolean {
    return this._equipment === null;
  }
}
