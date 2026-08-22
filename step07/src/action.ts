import type { Combatant, Damage } from "./combatant";
import type { AttackMagic, HealMagic } from "./magic";
import type { Skill } from "./skill";

export abstract class Action {
  execute(actor: Combatant): void {
    actor.assertCanAct();

    this.executeAction(actor);
  }

  protected abstract executeAction(actor: Combatant): void;
}

abstract class Attack extends Action {
  private _target: Combatant;

  protected constructor(target: Combatant) {
    super();

    this._target = target;
  }

  protected executeAction(actor: Combatant): void {
    if (!this._target.isAlive()) {
      throw new Error("target combatant is dead");
    }

    this.validate(actor);

    const damage = this.calculateDamage(actor);
    this._target.takeDamage(damage);
  }

  protected abstract validate(actor: Combatant): void;

  protected abstract calculateDamage(actor: Combatant): Damage;
}

export class BasicAttack extends Attack {
  constructor(target: Combatant) {
    super(target);
  }

  protected validate(actor: Combatant): void {}

  protected calculateDamage(actor: Combatant): Damage {
    const damage: Damage = {
      type: "physical",
      value: actor.stats.strength,
    };
    return damage;
  }
}

export class MagicAttack extends Attack {
  private _magic: AttackMagic;

  constructor(target: Combatant, magic: AttackMagic) {
    super(target);

    this._magic = magic;
  }

  protected validate(actor: Combatant): void {
    actor.assertHasLearnedMagic(this._magic);
  }

  protected calculateDamage(actor: Combatant): Damage {
    const damage: Damage = {
      type: "magical",
      value: actor.stats.magicAttack + this._magic.power,
    };
    return damage;
  }
}

export class SkillAttack extends Attack {
  private _skill: Skill;

  constructor(target: Combatant, skill: Skill) {
    super(target);

    this._skill = skill;
  }

  protected validate(actor: Combatant): void {
    actor.assertHasLearnedSkill(this._skill);
  }

  protected calculateDamage(actor: Combatant): Damage {
    const damage: Damage = {
      type: "physical",
      value: actor.stats.strength + this._skill.power,
    };
    return damage;
  }
}

export class Heal extends Action {
  private _target: Combatant;
  private _magic: HealMagic;

  constructor(target: Combatant, magic: HealMagic) {
    super();

    this._target = target;
    this._magic = magic;
  }

  protected executeAction(actor: Combatant): void {
    if (!this._target.isAlive()) {
      throw new Error("target combatant is dead");
    }

    actor.assertHasLearnedMagic(this._magic);

    this._target.healDamage(actor.stats.healingPower + this._magic.power);
  }
}
