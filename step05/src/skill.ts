export class Skill {
  private _name: string;
  private _damageValue: number;

  constructor(name: string, damageValue: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (damageValue <= 0) {
      throw new Error("damage value must be greater than 0");
    }
    this._damageValue = damageValue;
  }

  get name(): string {
    return this._name;
  }
  get damageValue(): number {
    return this._damageValue;
  }

  isSameSkill(skill: Skill): boolean {
    return this._name === skill.name;
  }
}
