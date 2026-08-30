export type Stats = {
  readonly maxHp: number;
  readonly maxMp: number;
  readonly strength: number;
  readonly defense: number;
  readonly magicAttack: number;
  readonly healingPower: number;
};

export function validateStats(stats: Stats): void {
  if (stats.maxHp <= 0) {
    throw new Error("max hp must be greater than 0");
  }
  if (stats.maxMp < 0) {
    throw new Error("max mp cannot be negative");
  }
  if (stats.strength < 0) {
    throw new Error("strength cannot be negative");
  }
  if (stats.defense < 0) {
    throw new Error("defense cannot be negative");
  }
  if (stats.magicAttack < 0) {
    throw new Error("magic attack cannot be negative");
  }
  if (stats.healingPower < 0) {
    throw new Error("healing power cannot be negative");
  }
}
