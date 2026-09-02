import { Action } from "./action";
import { Combatant, Damage, Resources } from "./combatant";
import { Magic } from "./magic";
import { Skill } from "./skill";
import { CalculatedStats } from "./stats";

export class BattleCombatant {
  private readonly _name: string;
  private _calculatedStats: CalculatedStats;
  private readonly _resources: Resources;
  private readonly _magics: readonly Magic[];
  private readonly _skills: readonly Skill[];

  constructor(combatant: Combatant) {
    this._name = combatant.name;
    this._calculatedStats = combatant.calculatedStats;
    this._resources = combatant.resources;
    this._magics = combatant.magics;
    this._skills = combatant.skills;
  }

  get name(): string {
    return this._name;
  }
  get calculatedStats(): CalculatedStats {
    return this._calculatedStats;
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

  act(action: Action): void {
    action.execute(this);
  }

  takeDamage(damage: Damage): void {
    const calculatedDamage = this.calculateDamage(damage);

    this._resources.hp = this.clampHp(this._resources.hp - calculatedDamage);
  }

  private calculateDamage(damage: Damage): number {
    switch (damage.type) {
      case "physical":
        return Math.max(damage.value - this.calculatedStats.defense, 0);
      case "magical":
        return damage.value;
      default:
        return 0;
    }
  }

  healDamage(power: number): void {
    this._resources.hp = this.clampHp(this._resources.hp + power);
  }

  assertHasLearnedMagic(magic: Magic): void {
    if (!this.hasLearnedMagic(magic)) {
      throw new Error("this magic not learned yet");
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
    return Math.max(0, Math.min(value, this._calculatedStats.maxHp));
  }
}
