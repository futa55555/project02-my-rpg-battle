export type EquipmentType = "weapon" | "armor";

export class Equipment {
  private _name: string;
  private _type: EquipmentType;

  constructor(name: string, type: EquipmentType) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    this._type = type;
  }

  get name(): string {
    return this._name;
  }
  get type(): EquipmentType {
    return this._type;
  }
}
