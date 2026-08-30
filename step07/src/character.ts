import { Combatant } from "./combatant";
import { EquipmentByKind, type Equipment } from "./equipment";
import { type EquipmentSlot } from "./equipmentSlot";
import { EquipmentSlots } from "./equipmentSlots";
import { BonusStats, CalculatedStats, type Stats } from "./stats";

export class Character extends Combatant {
  private readonly _equipmentSlots: EquipmentSlots;

  constructor(name: string, stats: Stats) {
    super(name, stats);

    this._equipmentSlots = new EquipmentSlots();
  }

  get equipmentSlots(): EquipmentSlots {
    return this._equipmentSlots;
  }
  get bonusStats(): BonusStats {
    return this._equipmentSlots.totalStatsBonus;
  }
  get calculatedStats(): CalculatedStats {
    return this._baseStats.add(this.bonusStats);
  }

  equip(equipment: Equipment): void {
    equipment.equipTo(this._equipmentSlots);
  }

  unequip<Kind extends keyof EquipmentByKind>(
    slot: EquipmentSlot<EquipmentByKind[Kind]>,
  ): void {
    slot.unequip();
  }
}
