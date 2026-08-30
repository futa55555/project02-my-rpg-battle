import { AttackMagic, HealMagic } from "../src/magic";

function createMockAttackMagic(
  name = "モック攻撃魔法",
  power = 1,
): AttackMagic {
  return new AttackMagic(name, power);
}

function createMockHealMagic(name = "モック回復魔法", power = 1): HealMagic {
  return new HealMagic(name, power);
}

describe("作成系", () => {
  test("魔法を作成できる", () => {
    const mockAttackMagic = createMockAttackMagic();
    expect(mockAttackMagic).toBeInstanceOf(AttackMagic);
    expect(mockAttackMagic.kind).toBe("attack");
    expect(mockAttackMagic.name).toBe("モック攻撃魔法");
    expect(mockAttackMagic.power).toBe(1);

    const mockHealMagic = createMockHealMagic();
    expect(mockHealMagic).toBeInstanceOf(HealMagic);
    expect(mockHealMagic.kind).toBe("heal");
    expect(mockHealMagic.name).toBe("モック回復魔法");
    expect(mockHealMagic.power).toBe(1);
  });

  test("name空の魔法を作成できない", () => {
    expect(() => createMockAttackMagic(" ")).toThrow("name cannot be empty");
    expect(() => createMockHealMagic(" ")).toThrow("name cannot be empty");
  });

  test("威力が0以下の魔法を作成できない", () => {
    expect(() => createMockAttackMagic(undefined, 0)).toThrow(
      "power must be greater than 0",
    );
    expect(() => createMockHealMagic(undefined, 0)).toThrow(
      "power must be greater than 0",
    );
  });
});

describe("比較系", () => {
  test("同じ魔法は同じ", () => {
    const mockAttackMagic = createMockAttackMagic();
    const copiedMockAttackMagic = createMockAttackMagic();
    expect(mockAttackMagic.isSameMagic(copiedMockAttackMagic)).toBe(true);

    const mockHealMagic = createMockHealMagic();
    const copiedMockHealMagic = createMockHealMagic();
    expect(mockHealMagic.isSameMagic(copiedMockHealMagic)).toBe(true);
  });

  test("種類が違えば違う魔法", () => {
    const mockAttackMagic = createMockAttackMagic("モック魔法", 1);
    const mockHealMagic = createMockHealMagic("モック魔法", 1);
    expect(mockAttackMagic.isSameMagic(mockHealMagic)).toBe(false);
  });

  test("名前が違えば違う魔法", () => {
    const mockAttackMagic = createMockAttackMagic();
    const differentMockAttackMagic = createMockAttackMagic("違う攻撃魔法");
    expect(mockAttackMagic.isSameMagic(differentMockAttackMagic)).toBe(false);

    const mockHealMagic = createMockHealMagic();
    const differentMockHealMagic = createMockHealMagic("違う回復魔法");
    expect(mockHealMagic.isSameMagic(differentMockHealMagic)).toBe(false);
  });

  test("威力が違えば違う魔法", () => {
    const mockAttackMagic = createMockAttackMagic();
    const differentMockAttackMagic = createMockAttackMagic(undefined, 2);
    expect(mockAttackMagic.isSameMagic(differentMockAttackMagic)).toBe(false);

    const mockHealMagic = createMockHealMagic();
    const differentMockHealMagic = createMockHealMagic(undefined, 2);
    expect(mockHealMagic.isSameMagic(differentMockHealMagic)).toBe(false);
  });
});
