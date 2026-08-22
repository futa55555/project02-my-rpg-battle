import { Combatant } from "./combatant";
import { type Equipment, type EquipmentType } from "./equipment";
import { type Stats } from "./stats";

export class Character extends Combatant {
  private readonly _equipments: Equipment[];

  constructor(name: string, stats: Stats) {
    super(name, stats);

    this._equipments = [];
  }

  get equipments(): readonly Equipment[] {
    return this._equipments;
  }

  equip(equipment: Equipment): void {
    if (this.hasEquipmentOfType(equipment.type)) {
      throw new Error("this type already equipped");
    }

    this._equipments.push(equipment);
  }

  unequip(type: EquipmentType): void {
    if (!this.hasEquipmentOfType(type)) {
      throw new Error("this type not equipped yet");
    }

    const idx = this._equipments.findIndex((equipment) => {
      return equipment.type === type;
    });

    this._equipments.splice(idx, 1);
  }

  private hasEquipmentOfType(type: EquipmentType): boolean {
    return this._equipments.some((_equipment) => {
      return _equipment.type === type;
    });
  }
}
