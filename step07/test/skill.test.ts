import { Skill } from "../src/skill";

function createMockSkill(name = "モック", power = 1) {
  return new Skill(name, power);
}

describe("作成系", () => {
  test("スキルを作成できる", () => {
    const mockSkill = createMockSkill();
    expect(mockSkill).toBeInstanceOf(Skill);
  });

  test("name空のスキルを作成できない", () => {
    expect(() => createMockSkill(" ")).toThrow("name cannot be empty");
  });

  test("威力が0以下のスキルを作成できない", () => {
    expect(() => createMockSkill(undefined, 0)).toThrow(
      "power must be greater than 0",
    );
  });
});

describe("比較", () => {
  test("名前が同じスキルは同じ", () => {
    const mockSkill1 = createMockSkill();
    const mockSkill2 = createMockSkill();

    expect(mockSkill1.isSameSkill(mockSkill2)).toBe(true);
  });
});
