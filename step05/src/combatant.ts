import type { Action } from "./action";
import type { Magic } from "./magic";
import type { Skill } from "./skill";

export type Damage = {
  type: "physical" | "magical";
  value: number;
};

export class Combatant {
  private _name: string;
  private _hp: number;
  private _strength: number;
  private _defense: number;
  private readonly _magics: Magic[];
  private readonly _skills: Skill[];

  constructor(name: string, hp: number, strength: number, defense: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (hp <= 0) {
      throw new Error("hp must be greater than 0");
    }
    this._hp = hp;

    if (strength < 0) {
      throw new Error("strength cannot be negative");
    }
    this._strength = strength;

    if (defense < 0) {
      throw new Error("defense cannot be negative");
    }
    this._defense = defense;

    this._magics = [];
    this._skills = [];
  }

  get name(): string {
    return this._name;
  }
  get hp(): number {
    return this._hp;
  }
  get strength(): number {
    return this._strength;
  }
  get defense(): number {
    return this._defense;
  }
  get magics(): readonly Magic[] {
    return this._magics;
  }
  get skills(): readonly Skill[] {
    return this._skills;
  }

  act(action: Action): void {
    this.assertCanAct();

    action.execute(this);
  }

  takeDamage(damage: Damage): void {
    const calculatedDamage = this.calculateDamage(damage);

    if (calculatedDamage < this._hp) {
      this._hp -= calculatedDamage;
    } else {
      this._hp = 0;
    }
  }

  private calculateDamage(damage: Damage): number {
    switch (damage.type) {
      case "physical":
        return Math.max(damage.value - this._defense, 0);
      case "magical":
        return damage.value;
      default:
        return 0;
    }
  }

  learnMagic(magic: Magic): void {
    if (this.hasLearnedMagic(magic)) {
      throw new Error("this magic already learned");
    }

    this._magics.push(magic);
  }

  learnSkill(skill: Skill): void {
    if (this.hasLearnedSkill(skill)) {
      throw new Error("this skill already learned");
    }

    this._skills.push(skill);
  }

  hasLearnedMagic(magic: Magic): boolean {
    return this._magics.some((_magic) => {
      return _magic.isSameMagic(magic);
    });
  }

  hasLearnedSkill(skill: Skill): boolean {
    return this._skills.some((_skill) => {
      return _skill.isSameSkill(skill);
    });
  }

  assertCanAct(): void {
    if (!this.canAct()) {
      throw new Error("dead combatant cannot act");
    }
  }

  isAlive(): boolean {
    return this._hp > 0;
  }

  private canAct(): boolean {
    return this.isAlive();
  }
}
