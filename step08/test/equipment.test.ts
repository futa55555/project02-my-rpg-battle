import { Armor, Weapon } from "../src/equipment";
import { EquipmentSlots } from "../src/equipmentSlots";
import { BonusStats } from "../src/stats";

export function createMockWeapon(
  name = "モック武器",
  bonusStats = new BonusStats({ strength: 1 }),
): Weapon {
  return new Weapon(name, bonusStats);
}

export function createMockArmor(
  name = "モック鎧",
  bonusStats = new BonusStats({ defense: 1 }),
): Armor {
  return new Armor(name, bonusStats);
}

describe("作成系", () => {
  test("武器を作成できる", () => {
    const mockWeapon = createMockWeapon();
    expect(mockWeapon).toBeInstanceOf(Weapon);
    expect(mockWeapon.kind).toBe("weapon");
    expect(mockWeapon.name).toBe("モック武器");
    expect(mockWeapon.bonusStats.strength).toBe(1);
  });

  test("鎧を作成できる", () => {
    const mockArmor = createMockArmor();
    expect(mockArmor).toBeInstanceOf(Armor);
    expect(mockArmor.kind).toBe("armor");
    expect(mockArmor.name).toBe("モック鎧");
    expect(mockArmor.bonusStats.defense).toBe(1);
  });

  test("name空の装備を作成できない", () => {
    expect(() => createMockWeapon(" ")).toThrow("name cannot be empty");
  });
});

describe("比較系", () => {
  test("同じものは同じ", () => {
    const mockWeapon = createMockWeapon();
    const copiedMockWeapon = createMockWeapon();
    expect(mockWeapon.equals(copiedMockWeapon)).toBe(true);
  });

  test("違うものは違う", () => {
    const mockWeapon = createMockWeapon();
    const differentMockWeapon = createMockWeapon("違う名前");
    expect(mockWeapon.equals(differentMockWeapon)).toBe(false);
  });

  test("異なるkindで比較したらfalse", () => {
    const mockWeapon = createMockWeapon("モック", new BonusStats({}));
    const mockArmor = createMockArmor("モック", new BonusStats({}));
    expect(mockWeapon.equals(mockArmor)).toBe(false);
  });
});

describe("装備系", () => {
  test("武器は武器slotに装備される", () => {
    const mockWeapon = createMockWeapon();
    const slots = new EquipmentSlots();

    mockWeapon.equipTo(slots);

    expect(slots.weapon.equipment).toBe(mockWeapon);
    expect(slots.armor.equipment).toBeNull();
  });

  test("鎧は鎧slotに装備される", () => {
    const mockArmor = createMockArmor();
    const slots = new EquipmentSlots();

    mockArmor.equipTo(slots);

    expect(slots.weapon.equipment).toBeNull();
    expect(slots.armor.equipment).toBe(mockArmor);
  });
});
