import { AttackMagic } from "../src/magic";

describe("作成系", () => {
  test("魔法を作成できる", () => {
    const mera = new AttackMagic("メラ", 15);
    expect(mera).toBeInstanceOf(AttackMagic);
  });

  test("name空の魔法を作成できない", () => {
    expect(() => new AttackMagic(" ", 15)).toThrow("name cannot be empty");
  });
});

describe("比較", () => {
  test("名前が同じ魔法は同じ", () => {
    const mera1 = new AttackMagic("メラ", 15);
    const mera2 = new AttackMagic("メラ", 10);

    expect(mera1.isSameMagic(mera2)).toBe(true);
  });
});
