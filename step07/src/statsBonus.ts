import { Stats } from "./stats";

export class StatsBonus {
  readonly maxHp: number;
  readonly maxMp: number;
  readonly strength: number;
  readonly defense: number;
  readonly magicAttack: number;
  readonly healingPower: number;

  constructor(statsBonus: Partial<Stats>) {
    this.maxHp = statsBonus.maxHp ?? 0;
    this.maxMp = statsBonus.maxMp ?? 0;
    this.strength = statsBonus.strength ?? 0;
    this.defense = statsBonus.defense ?? 0;
    this.magicAttack = statsBonus.magicAttack ?? 0;
    this.healingPower = statsBonus.healingPower ?? 0;
  }

  equals(statsBonus: StatsBonus): boolean {
    return (
      this.maxHp === statsBonus.maxHp &&
      this.maxMp === statsBonus.maxMp &&
      this.strength === statsBonus.strength &&
      this.defense === statsBonus.defense &&
      this.magicAttack === statsBonus.magicAttack &&
      this.healingPower === statsBonus.healingPower
    );
  }
}
