import type { Armor, Weapon } from "./equipment";
import { EquipmentSlot } from "./equipmentSlot";
import { BonusStats } from "./stats";

export class EquipmentSlots {
  private _weapon: EquipmentSlot<Weapon>;
  private _armor: EquipmentSlot<Armor>;

  constructor() {
    this._weapon = new EquipmentSlot<Weapon>();
    this._armor = new EquipmentSlot<Armor>();
  }

  get weapon(): EquipmentSlot<Weapon> {
    return this._weapon;
  }
  get armor(): EquipmentSlot<Armor> {
    return this._armor;
  }

  get totalStatsBonus(): BonusStats {
    return BonusStats.sum(
      [
        this._weapon.equipment?.bonusStats,
        this._armor.equipment?.bonusStats,
      ].filter((stats) => stats !== undefined),
    );
  }
}
