export type StatsValues = {
  maxHp: number;
  maxMp: number;
  strength: number;
  defense: number;
  magicAttack: number;
  healingPower: number;
};

export abstract class Stats {
  readonly maxHp: number;
  readonly maxMp: number;
  readonly strength: number;
  readonly defense: number;
  readonly magicAttack: number;
  readonly healingPower: number;

  constructor(values: StatsValues) {
    this.maxHp = values.maxHp;
    this.maxMp = values.maxMp;
    this.strength = values.strength;
    this.defense = values.defense;
    this.magicAttack = values.magicAttack;
    this.healingPower = values.healingPower;
  }

  equals(stats: Stats): boolean {
    return (
      this.maxHp === stats.maxHp &&
      this.maxMp === stats.maxMp &&
      this.strength === stats.strength &&
      this.defense === stats.defense &&
      this.magicAttack === stats.magicAttack &&
      this.healingPower === stats.healingPower
    );
  }

  abstract add(stats: Stats): Stats;

  protected addStatsValues(stats: Stats): StatsValues {
    const statsValues: StatsValues = {
      maxHp: this.maxHp + stats.maxHp,
      maxMp: this.maxMp + stats.maxMp,
      strength: this.strength + stats.strength,
      defense: this.defense + stats.defense,
      magicAttack: this.magicAttack + stats.magicAttack,
      healingPower: this.healingPower + stats.healingPower,
    };

    return statsValues;
  }
}

export class BaseStats extends Stats {
  constructor(values: StatsValues) {
    if (values.maxHp <= 0) {
      throw new Error("max hp must be greater than 0");
    }
    if (values.maxMp < 0) {
      throw new Error("max mp cannot be negative");
    }
    if (values.strength < 0) {
      throw new Error("strength cannot be negative");
    }
    if (values.defense < 0) {
      throw new Error("defense cannot be negative");
    }
    if (values.magicAttack < 0) {
      throw new Error("magic attack cannot be negative");
    }
    if (values.healingPower < 0) {
      throw new Error("healing power cannot be negative");
    }

    super(values);
  }

  add(bonusStats: BonusStats): BaseStats {
    const addedStatsValues = this.addStatsValues(bonusStats);

    return new BaseStats(addedStatsValues);
  }
}

export class BonusStats extends Stats {
  constructor(values: Partial<Stats>) {
    const statsValues: StatsValues = {
      maxHp: values.maxHp ?? 0,
      maxMp: values.maxMp ?? 0,
      strength: values.strength ?? 0,
      defense: values.defense ?? 0,
      magicAttack: values.magicAttack ?? 0,
      healingPower: values.healingPower ?? 0,
    };

    super(statsValues);
  }

  add(bonusStats: BonusStats): BonusStats {
    const addedStatsValues = this.addStatsValues(bonusStats);

    return new BonusStats(addedStatsValues);
  }

  static sum(bonusStatsList: BonusStats[]): BonusStats {
    const summedBonusStats = bonusStatsList.reduce((acc, cur) => {
      return acc.add(cur);
    }, new BonusStats({}));

    return summedBonusStats;
  }
}

export class CalculatedStats extends Stats {
  constructor(values: StatsValues) {
    const calculatedStats: StatsValues = {
      maxHp: values.maxHp > 0 ? values.maxHp : 1,
      maxMp: values.maxMp >= 0 ? values.maxMp : 0,
      strength: values.strength >= 0 ? values.strength : 0,
      defense: values.defense >= 0 ? values.defense : 0,
      magicAttack: values.magicAttack >= 0 ? values.magicAttack : 0,
      healingPower: values.healingPower >= 0 ? values.healingPower : 0,
    };

    super(calculatedStats);
  }

  add(bonusStats: BonusStats): CalculatedStats {
    const addedStatsValues = this.addStatsValues(bonusStats);

    return new CalculatedStats(addedStatsValues);
  }
}
