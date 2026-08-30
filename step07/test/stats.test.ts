import { validateStats, type Stats } from "../src/stats";

function createMockStats(
  maxHp: number = 1,
  maxMp: number = 0,
  strength: number = 0,
  defense: number = 0,
  magicAttack: number = 0,
  healingPower: number = 0,
): Stats {
  const stats: Stats = {
    maxHp,
    maxMp,
    strength,
    defense,
    magicAttack,
    healingPower,
  };

  return stats;
}

describe("validateエラー", () => {
  test("最大hpは正でなければならない", () => {
    const invalidStas = createMockStats(0);
    expect(() => validateStats(invalidStas)).toThrow(
      "max hp must be greater than 0",
    );
  });

  test("最大mpは0以上でなければならない", () => {
    const invalidStas = createMockStats(undefined, -1);
    expect(() => validateStats(invalidStas)).toThrow(
      "max mp cannot be negative",
    );
  });

  test("力は0以上でなければならない", () => {
    const invalidStas = createMockStats(undefined, undefined, -1);
    expect(() => validateStats(invalidStas)).toThrow(
      "strength cannot be negative",
    );
  });

  test("防御は0以上でなければならない", () => {
    const invalidStas = createMockStats(undefined, undefined, undefined, -1);
    expect(() => validateStats(invalidStas)).toThrow(
      "defense cannot be negative",
    );
  });

  test("攻撃魔力は0以上でなければならない", () => {
    const invalidStas = createMockStats(
      undefined,
      undefined,
      undefined,
      undefined,
      -1,
    );
    expect(() => validateStats(invalidStas)).toThrow(
      "magic attack cannot be negative",
    );
  });

  test("回復魔力は0以上でなければならない", () => {
    const invalidStas = createMockStats(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      -1,
    );
    expect(() => validateStats(invalidStas)).toThrow(
      "healing power cannot be negative",
    );
  });
});
