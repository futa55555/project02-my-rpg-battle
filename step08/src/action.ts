import { BattleCombatant } from "./battleCombatant";
import type { Combatant, Damage } from "./combatant";
import type { AttackMagic, HealMagic } from "./magic";
import type { Skill } from "./skill";

export abstract class Action {
  execute(actor: BattleCombatant): void {
    actor.assertCanAct();

    this.executeAction(actor);
  }

  protected abstract executeAction(actor: BattleCombatant): void;
}

abstract class Attack extends Action {
  private _target: BattleCombatant;

  protected constructor(target: BattleCombatant) {
    super();

    this._target = target;
  }

  protected executeAction(actor: BattleCombatant): void {
    if (!this._target.isAlive()) {
      throw new Error("target combatant is dead");
    }

    this.validate(actor);

    const damage = this.calculateDamage(actor);
    this._target.takeDamage(damage);
  }

  protected abstract validate(actor: BattleCombatant): void;

  protected abstract calculateDamage(actor: BattleCombatant): Damage;
}

export class BasicAttack extends Attack {
  constructor(target: BattleCombatant) {
    super(target);
  }

  protected validate(actor: BattleCombatant): void {}

  protected calculateDamage(actor: BattleCombatant): Damage {
    const damage: Damage = {
      type: "physical",
      value: actor.calculatedStats.strength,
    };
    return damage;
  }
}

export class MagicAttack extends Attack {
  private _magic: AttackMagic;

  constructor(target: BattleCombatant, magic: AttackMagic) {
    super(target);

    this._magic = magic;
  }

  protected validate(actor: BattleCombatant): void {
    actor.assertHasLearnedMagic(this._magic);
  }

  protected calculateDamage(actor: BattleCombatant): Damage {
    const damage: Damage = {
      type: "magical",
      value: actor.calculatedStats.magicAttack + this._magic.power,
    };
    return damage;
  }
}

export class SkillAttack extends Attack {
  private _skill: Skill;

  constructor(target: BattleCombatant, skill: Skill) {
    super(target);

    this._skill = skill;
  }

  protected validate(actor: BattleCombatant): void {
    actor.assertHasLearnedSkill(this._skill);
  }

  protected calculateDamage(actor: BattleCombatant): Damage {
    const damage: Damage = {
      type: "physical",
      value: actor.calculatedStats.strength + this._skill.power,
    };
    return damage;
  }
}

export class Heal extends Action {
  private _target: BattleCombatant;
  private _magic: HealMagic;

  constructor(target: BattleCombatant, magic: HealMagic) {
    super();

    this._target = target;
    this._magic = magic;
  }

  protected executeAction(actor: BattleCombatant): void {
    if (!this._target.isAlive()) {
      throw new Error("target combatant is dead");
    }

    actor.assertHasLearnedMagic(this._magic);

    this._target.healDamage(
      actor.calculatedStats.healingPower + this._magic.power,
    );
  }
}
