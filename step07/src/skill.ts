export class Skill {
  private _name: string;
  private _power: number;

  constructor(name: string, power: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (power <= 0) {
      throw new Error("power must be greater than 0");
    }
    this._power = power;
  }

  get name(): string {
    return this._name;
  }
  get power(): number {
    return this._power;
  }

  isSameSkill(skill: Skill): boolean {
    return this._name === skill.name;
  }
}
