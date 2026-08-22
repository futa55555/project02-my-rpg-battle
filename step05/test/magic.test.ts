import { Magic } from "../src/magic";

describe("作成系", () => {
  test("魔法を作成できる", () => {
    const mera = new Magic("メラ", 15);
    expect(mera).toBeInstanceOf(Magic);
  });

  test("name空の魔法を作成できない", () => {
    expect(() => new Magic(" ", 15)).toThrow("name cannot be empty");
  });
});

describe("比較", () => {
  test("名前が同じ魔法は同じ", () => {
    const mera1 = new Magic("メラ", 15);
    const mera2 = new Magic("メラ", 10);

    expect(mera1.isSameMagic(mera2)).toBe(true);
  });
});
