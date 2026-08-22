import { Magic } from "./magic";
import { Skill } from "./skill";

type Damage = {
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

  private act(): void {
    if (!this.isAlive()) {
      throw new Error("dead combatant cannot act");
    }
  }

  private attack(target: Combatant, damage: Damage): void {
    this.act();

    if (!target.isAlive()) {
      throw new Error("target is dead");
    }

    target.takeDamage(damage);
  }

  basicAttack(target: Combatant): void {
    const damage: Damage = { type: "physical", value: this._strength };
    this.attack(target, damage);
  }

  useMagic(magic: Magic, target: Combatant): void {
    if (!this.hasLearnedMagic(magic)) {
      throw new Error("this magic not learned yet");
    }

    const damage: Damage = { type: "magical", value: magic.damageValue };
    this.attack(target, damage);
  }

  useSkill(skill: Skill, target: Combatant): void {
    if (!this.hasLearnedSkill(skill)) {
      throw new Error("this skill not learned yet");
    }

    const damage: Damage = {
      type: "physical",
      value: this._strength + skill.damageValue,
    };
    this.attack(target, damage);
  }

  private takeDamage(damage: Damage): void {
    if (!this.isAlive()) {
      throw new Error("already dead");
    }
    if (damage.value <= 0) {
      throw new Error("damage must be greater than 0");
    }

    const calculatedDamage = this.calculateDamage(damage);
    this._hp -= Math.min(calculatedDamage, this._hp);
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

  private hasLearnedMagic(magic: Magic): boolean {
    return this._magics.some((_magic) => {
      return _magic.isSameMagic(magic);
    });
  }

  private hasLearnedSkill(skill: Skill): boolean {
    return this._skills.some((_skill) => {
      return _skill.isSameSkill(skill);
    });
  }

  isAlive(): boolean {
    return this._hp > 0;
  }
}
