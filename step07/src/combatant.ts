import { type Action } from "./action";
import { type Magic } from "./magic";
import { type Skill } from "./skill";
import { type Stats, validateStats } from "./stats";

export type Damage = {
  type: "physical" | "magical";
  value: number;
};

export class Combatant {
  private _name: string;
  private _stats: Stats;
  private _hp: number;
  private _mp: number;
  private readonly _magics: Magic[];
  private readonly _skills: Skill[];

  constructor(name: string, stats: Stats) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    validateStats(stats);
    this._stats = stats;

    this._hp = stats.maxHp;
    this._mp = stats.maxMp;

    this._magics = [];
    this._skills = [];
  }

  get name(): string {
    return this._name;
  }
  get stats(): Stats {
    return this._stats;
  }
  get hp(): number {
    return this._hp;
  }
  get mp(): number {
    return this._mp;
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
        return Math.max(damage.value - this.stats.defense, 0);
      case "magical":
        return damage.value;
      default:
        return 0;
    }
  }

  healDamage(power: number): void {
    if (power < this._stats.maxHp - this._hp) {
      this._hp += power;
    } else {
      this._hp = this._stats.maxHp;
    }
  }

  learnMagic(magic: Magic): void {
    this.assertHasNotLearnedMagic(magic);

    this._magics.push(magic);
  }

  learnSkill(skill: Skill): void {
    this.assertHasNotLearnedSkill(skill);

    this._skills.push(skill);
  }

  assertHasNotLearnedMagic(magic: Magic): void {
    if (this.hasLearnedMagic(magic)) {
      throw new Error("this magic already learned");
    }
  }

  assertHasLearnedMagic(magic: Magic): void {
    if (!this.hasLearnedMagic(magic)) {
      throw new Error("this magic not learned yet");
    }
  }

  assertHasNotLearnedSkill(skill: Skill): void {
    if (this.hasLearnedSkill(skill)) {
      throw new Error("this skill already learned");
    }
  }

  assertHasLearnedSkill(skill: Skill): void {
    if (!this.hasLearnedSkill(skill)) {
      throw new Error("this skill not learned yet");
    }
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
