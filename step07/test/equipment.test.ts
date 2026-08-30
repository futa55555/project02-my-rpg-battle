import { Armor, Weapon } from "../src/equipment";
import { createEquipmentSlots } from "../src/equipmentSlots";
import { StatsBonus } from "../src/statsBonus";

export function createMockWeapon(
  name = "モック武器",
  statsBonus = new StatsBonus({ strength: 1 }),
): Weapon {
  return new Weapon(name, statsBonus);
}

export function createMockArmor(
  name = "モック鎧",
  statsBonus = new StatsBonus({ defense: 1 }),
): Armor {
  return new Armor(name, statsBonus);
}

describe("作成系", () => {
  test("武器を作成できる", () => {
    const mockWeapon = createMockWeapon();
    expect(mockWeapon).toBeInstanceOf(Weapon);
    expect(mockWeapon.kind).toBe("weapon");
    expect(mockWeapon.name).toBe("モック武器");
    expect(mockWeapon.statsBonus.strength).toBe(1);
  });

  test("鎧を作成できる", () => {
    const mockArmor = createMockArmor();
    expect(mockArmor).toBeInstanceOf(Armor);
    expect(mockArmor.kind).toBe("armor");
    expect(mockArmor.name).toBe("モック鎧");
    expect(mockArmor.statsBonus.defense).toBe(1);
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
    const mockWeapon = createMockWeapon("モック", new StatsBonus({}));
    const mockArmor = createMockArmor("モック", new StatsBonus({}));
    expect(mockWeapon.equals(mockArmor)).toBe(false);
  });
});

describe("装備系", () => {
  test("武器は武器slotに装備される", () => {
    const mockWeapon = createMockWeapon();
    const slots = createEquipmentSlots();

    mockWeapon.equipTo(slots);

    expect(slots.weapon.equipment).toBe(mockWeapon);
    expect(slots.armor.equipment).toBeNull();
  });

  test("鎧は鎧slotに装備される", () => {
    const mockArmor = createMockArmor();
    const slots = createEquipmentSlots();

    mockArmor.equipTo(slots);

    expect(slots.weapon.equipment).toBeNull();
    expect(slots.armor.equipment).toBe(mockArmor);
  });
});
