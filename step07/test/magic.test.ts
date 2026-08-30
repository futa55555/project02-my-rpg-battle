import { AttackMagic } from "../src/magic";

function createMockAttackMagic(name = "モック", power = 1): AttackMagic {
  return new AttackMagic(name, power);
}

describe("作成系", () => {
  test("魔法を作成できる", () => {
    const mockAttackMagic = createMockAttackMagic();
    expect(mockAttackMagic).toBeInstanceOf(AttackMagic);
  });

  test("name空の魔法を作成できない", () => {
    expect(() => createMockAttackMagic(" ")).toThrow("name cannot be empty");
  });

  test("威力が0以下の魔法を作成できない", () => {
    expect(() => createMockAttackMagic(undefined, 0)).toThrow(
      "power must be greater than 0",
    );
  });
});

describe("比較系", () => {
  test("名前が同じ魔法は同じ", () => {
    const mockAttackMagic1 = createMockAttackMagic();
    const mockAttackMagic2 = createMockAttackMagic();

    expect(mockAttackMagic1.isSameMagic(mockAttackMagic2)).toBe(true);
  });
});
