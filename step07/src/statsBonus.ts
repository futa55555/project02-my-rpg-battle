import { Stats } from "./stats";

export class StatsBonus {
  private _maxHp?: number;
  private _maxMp?: number;
  private _strength?: number;
  private _defense?: number;
  private _magicAttack?: number;
  private _healingPower?: number;

  constructor(statsBonus: Partial<Stats>) {
    this._maxHp = statsBonus.maxHp;
    this._maxMp = statsBonus.maxMp;
    this._strength = statsBonus.strength;
    this._defense = statsBonus.defense;
    this._magicAttack = statsBonus.magicAttack;
    this._healingPower = statsBonus.healingPower;
  }

  get maxHp(): number | undefined {
    return this._maxHp;
  }
  get maxMp(): number | undefined {
    return this._maxMp;
  }
  get strength(): number | undefined {
    return this._strength;
  }
  get defense(): number | undefined {
    return this._defense;
  }
  get magicAttack(): number | undefined {
    return this._magicAttack;
  }
  get healingPower(): number | undefined {
    return this._healingPower;
  }

  equals(statsBonus: StatsBonus): boolean {
    return (
      this._maxHp === statsBonus.maxHp &&
      this._maxMp === statsBonus.maxMp &&
      this._strength === statsBonus.strength &&
      this._defense === statsBonus.defense &&
      this._magicAttack === statsBonus.magicAttack &&
      this._healingPower === statsBonus.healingPower
    );
  }
}
