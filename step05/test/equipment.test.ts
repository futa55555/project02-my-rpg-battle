import { Equipment } from "../src/equipment";

describe("作成系", () => {
  test("装備を作成できる", () => {
    const heroSword = new Equipment("勇者の剣", "weapon");
    expect(heroSword).toBeInstanceOf(Equipment);
  });

  test("name空の装備を作成できない", () => {
    expect(() => new Equipment(" ", "weapon")).toThrow("name cannot be empty");
  });
});
