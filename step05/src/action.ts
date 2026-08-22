import type { Combatant, Damage } from "./combatant";
import type { Magic } from "./magic";
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
      value: actor.strength,
    };
    return damage;
  }
}

export class MagicAttack extends Attack {
  private _magic: Magic;

  constructor(target: Combatant, magic: Magic) {
    super(target);

    this._magic = magic;
  }

  protected validate(actor: Combatant): void {
    if (!actor.hasLearnedMagic(this._magic)) {
      throw new Error("this magic not learned yet");
    }
  }

  protected calculateDamage(actor: Combatant): Damage {
    const damage: Damage = {
      type: "magical",
      value: this._magic.damageValue,
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
    if (!actor.hasLearnedSkill(this._skill)) {
      throw new Error("this skill not learned yet");
    }
  }

  protected calculateDamage(actor: Combatant): Damage {
    const damage: Damage = {
      type: "physical",
      value: actor.strength + this._skill.damageValue,
    };
    return damage;
  }
}
