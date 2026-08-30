import { StatsBonus } from "../src/statsBonus";

export function createMockStatsBonus(
  maxHp: number = 1,
  maxMp: number = 0,
  strength: number = -1,
): StatsBonus {
  const statsBonus = new StatsBonus({ maxHp, maxMp, strength });

  return statsBonus;
}

describe("作成系", () => {
  test("あらゆる値で作成できる", () => {
    const mockStatsBonus = createMockStatsBonus();
    expect(mockStatsBonus).toBeInstanceOf(StatsBonus);
    expect(mockStatsBonus.maxHp).toBe(1);
    expect(mockStatsBonus.maxMp).toBe(0);
    expect(mockStatsBonus.strength).toBe(-1);
    expect(mockStatsBonus.defense).toBe(0);
    expect(mockStatsBonus.magicAttack).toBe(0);
    expect(mockStatsBonus.healingPower).toBe(0);
  });
});

describe("比較系", () => {
  test("同じなら同じ", () => {
    const mockStatsBonus = createMockStatsBonus();
    const copiedMockStatsBonus = createMockStatsBonus();
    expect(mockStatsBonus.equals(copiedMockStatsBonus)).toBe(true);

    const differentMockStatsBonus = createMockStatsBonus(0);
    expect(mockStatsBonus.equals(differentMockStatsBonus)).toBe(false);
  });
});
