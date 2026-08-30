import { type EquipmentSlots } from "./equipmentSlots";
import { BonusStats } from "./stats";

export type EquipmentByKind = {
  weapon: Weapon;
  armor: Armor;
};

export abstract class Equipment {
  abstract readonly kind: keyof EquipmentByKind;
  private _name: string;
  private _bonusStats: BonusStats;

  constructor(name: string, bonusStats: BonusStats) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    this._bonusStats = bonusStats;
  }

  get name(): string {
    return this._name;
  }
  get bonusStats(): BonusStats {
    return this._bonusStats;
  }

  equals(equipment: Equipment): boolean {
    return (
      this.kind === equipment.kind &&
      this._name === equipment.name &&
      this._bonusStats.equals(equipment.bonusStats)
    );
  }

  abstract equipTo(slots: EquipmentSlots): void;
}

export class Weapon extends Equipment {
  readonly kind = "weapon";

  equipTo(slots: EquipmentSlots): void {
    slots.weapon.equip(this);
  }
}

export class Armor extends Equipment {
  readonly kind = "armor";

  equipTo(slots: EquipmentSlots): void {
    slots.armor.equip(this);
  }
}
