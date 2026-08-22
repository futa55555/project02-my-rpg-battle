import { Skill } from "../src/skill";

describe("作成系", () => {
  test("スキルを作成できる", () => {
    const tackle = new Skill("体当たり", 10);
    expect(tackle).toBeInstanceOf(Skill);
  });

  test("name空のスキルを作成できない", () => {
    expect(() => new Skill(" ", 10)).toThrow("name cannot be empty");
  });
});

describe("比較", () => {
  test("名前が同じスキルは同じ", () => {
    const tackle1 = new Skill("体当たり", 10);
    const tackle2 = new Skill("体当たり", 5);

    expect(tackle1.isSameSkill(tackle2)).toBe(true);
  });
});
