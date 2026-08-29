import { type EquipmentSlots } from "./equipmentSlots";
import { type StatsBonus } from "./statsBonus";

export type EquipmentByKind = {
  weapon: Weapon;
  armor: Armor;
};

export abstract class Equipment {
  abstract readonly kind: keyof EquipmentByKind;
  private _name: string;
  private _statsBonus: StatsBonus;

  constructor(name: string, statsBonus: StatsBonus) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    this._statsBonus = statsBonus;
  }

  get name(): string {
    return this._name;
  }
  get statsBonus(): StatsBonus {
    return this._statsBonus;
  }

  equals(equipment: Equipment): boolean {
    return (
      this._name === equipment.name &&
      this._statsBonus.equals(equipment.statsBonus)
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
