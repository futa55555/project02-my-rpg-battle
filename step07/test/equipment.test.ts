import { Equipment, type EquipmentType } from "../src/equipment";

function createMockEquipment(
  name = "モック",
  type: EquipmentType = "weapon",
  statsBonus = { strength: 1 },
): Equipment {
  return new Equipment(name, type, statsBonus);
}

describe("作成系", () => {
  test("装備を作成できる", () => {
    const mockEquipment = createMockEquipment();
    expect(mockEquipment).toBeInstanceOf(Equipment);
  });

  test("name空の装備を作成できない", () => {
    expect(() => createMockEquipment(" ")).toThrow("name cannot be empty");
  });
});
