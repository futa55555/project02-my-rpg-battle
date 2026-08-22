export class Skill {
  private _name: string;
  private _damage: number;

  constructor(name: string, damage: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (damage <= 0) {
      throw new Error("damage must be greater than 0");
    }
    this._damage = damage;
  }

  get name(): string {
    return this._name;
  }
  get damage(): number {
    return this._damage;
  }

  isSameSkill(skill: Skill): boolean {
    return this._name === skill.name;
  }
}
