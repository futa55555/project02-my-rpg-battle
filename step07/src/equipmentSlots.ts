import { Armor, Weapon } from "./equipment";
import { EquipmentSlot } from "./equipmentSlot";

export type EquipmentSlots = {
  weapon: EquipmentSlot<Weapon>;
  armor: EquipmentSlot<Armor>;
};

export function createEquipmentSlots() {
  const equipmentSlots: EquipmentSlots = {
    weapon: new EquipmentSlot<Weapon>(),
    armor: new EquipmentSlot<Armor>(),
  };

  return equipmentSlots;
}
