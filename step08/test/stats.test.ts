import { BaseStats } from "../src/stats";

function createMockBaseStats(
  maxHp: number = 1,
  maxMp: number = 0,
  strength: number = 0,
  defense: number = 0,
  magicAttack: number = 0,
  healingPower: number = 0,
): BaseStats {
  return new BaseStats({
    maxHp,
    maxMp,
    strength,
    defense,
    magicAttack,
    healingPower,
  });
}

describe("validateエラー", () => {
  test("最大hpは正でなければならない", () => {
    expect(() => createMockBaseStats(0)).toThrow(
      "max hp must be greater than 0",
    );
  });

  test("最大mpは0以上でなければならない", () => {
    expect(() => createMockBaseStats(undefined, -1)).toThrow(
      "max mp cannot be negative",
    );
  });

  test("力は0以上でなければならない", () => {
    expect(() => createMockBaseStats(undefined, undefined, -1)).toThrow(
      "strength cannot be negative",
    );
  });

  test("防御は0以上でなければならない", () => {
    expect(() =>
      createMockBaseStats(undefined, undefined, undefined, -1),
    ).toThrow("defense cannot be negative");
  });

  test("攻撃魔力は0以上でなければならない", () => {
    expect(() =>
      createMockBaseStats(undefined, undefined, undefined, undefined, -1),
    ).toThrow("magic attack cannot be negative");
  });

  test("回復魔力は0以上でなければならない", () => {
    expect(() =>
      createMockBaseStats(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        -1,
      ),
    ).toThrow("healing power cannot be negative");
  });
});
