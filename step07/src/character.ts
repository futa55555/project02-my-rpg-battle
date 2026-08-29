import { Combatant } from "./combatant";
import { EquipmentByKind, type Equipment } from "./equipment";
import { type EquipmentSlot } from "./equipmentSlot";
import { createEquipmentSlots, type EquipmentSlots } from "./equipmentSlots";
import { type Stats } from "./stats";

export class Character extends Combatant {
  private readonly _equipmentSlots: EquipmentSlots;

  constructor(name: string, stats: Stats) {
    super(name, stats);

    this._equipmentSlots = createEquipmentSlots();
  }

  get equipmentSlots(): EquipmentSlots {
    return this._equipmentSlots;
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
