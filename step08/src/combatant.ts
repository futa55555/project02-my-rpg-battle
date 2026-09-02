import { type Action } from "./action";
import { type Magic } from "./magic";
import { type Skill } from "./skill";
import { type CalculatedStats, type BaseStats } from "./stats";

export type Damage = {
  type: "physical" | "magical";
  value: number;
};

export type Resources = {
  hp: number;
  mp: number;
};

export class Combatant {
  private _name: string;
  protected _baseStats: BaseStats;
  private readonly _resources: Resources;
  private readonly _magics: Magic[];
  private readonly _skills: Skill[];

  constructor(name: string, baseStats: BaseStats) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    this._baseStats = baseStats;

    this._resources = {
      hp: baseStats.maxHp,
      mp: baseStats.maxMp,
    };

    this._magics = [];
    this._skills = [];
  }

  get name(): string {
    return this._name;
  }
  get baseStats(): BaseStats {
    return this._baseStats;
  }
  get calculatedStats(): CalculatedStats {
    return this._baseStats;
  }
  get resources(): Readonly<Resources> {
    return this._resources;
  }
  get magics(): readonly Magic[] {
    return this._magics;
  }
  get skills(): readonly Skill[] {
    return this._skills;
  }

  healDamage(power: number): void {
    this._resources.hp = this.clampHp(this._resources.hp + power);
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
    return this._resources.hp > 0;
  }

  private canAct(): boolean {
    return this.isAlive();
  }

  private clampHp(value: number): number {
    return Math.max(0, Math.min(value, this._baseStats.maxHp));
  }
}
