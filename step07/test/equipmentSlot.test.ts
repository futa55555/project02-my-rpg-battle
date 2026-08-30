import type { Armor, Weapon } from "../src/equipment";
import { EquipmentSlot } from "../src/equipmentSlot";
import { createMockArmor, createMockWeapon } from "./equipment.test";

function createMockWeaponSlot(weapon?: Weapon): EquipmentSlot<Weapon> {
  return new EquipmentSlot<Weapon>(weapon);
}

function createMockArmorSlot(armor?: Armor): EquipmentSlot<Armor> {
  return new EquipmentSlot<Armor>(armor);
}

describe("作成系", () => {
  test("空のslotを作れる", () => {
    const mockEmptyWeaponSlot = createMockWeaponSlot();
    expect(mockEmptyWeaponSlot).toBeInstanceOf(EquipmentSlot<Weapon>);

    const mockEmptyArmorSlot = createMockArmorSlot();
    expect(mockEmptyArmorSlot).toBeInstanceOf(EquipmentSlot<Armor>);
  });

  test("装備済みのslotを作れる", () => {
    const mockWeapon = createMockWeapon();
    const mockWeaponSlot = createMockWeaponSlot(mockWeapon);
    expect(mockWeaponSlot.equipment).toBe(mockWeapon);

    const mockArmor = createMockArmor();
    const mockArmorSlot = createMockArmorSlot(mockArmor);
    expect(mockArmorSlot.equipment).toBe(mockArmor);
  });
});

describe("装備する系", () => {
  test("空のslotに装備できる", () => {
    const mockWeapon = createMockWeapon();
    const mockEmptyWeaponSlot = createMockWeaponSlot();
    mockEmptyWeaponSlot.equip(mockWeapon);
    expect(mockEmptyWeaponSlot.equipment).toBe(mockWeapon);

    const mockArmor = createMockArmor();
    const mockEmptyArmorSlot = createMockArmorSlot();
    mockEmptyArmorSlot.equip(mockArmor);
    expect(mockEmptyArmorSlot.equipment).toBe(mockArmor);
  });

  test("装備済みのslotの装備を外せる", () => {
    const mockWeapon = createMockWeapon();
    const mockEquippedWeaponSlot = createMockWeaponSlot(mockWeapon);
    mockEquippedWeaponSlot.unequip();
    expect(mockEquippedWeaponSlot.equipment).toBeNull();

    const mockArmor = createMockArmor();
    const mockEquippedArmorSlot = createMockArmorSlot(mockArmor);
    mockEquippedArmorSlot.unequip();
    expect(mockEquippedArmorSlot.equipment).toBeNull();
  });

  test("装備済みのslotに装備できない", () => {
    const mockWeapon = createMockWeapon();
    const mockEquippedWeaponSlot = createMockWeaponSlot(mockWeapon);
    expect(() => mockEquippedWeaponSlot.equip(mockWeapon)).toThrow(
      "already equipped",
    );

    const mockArmor = createMockArmor();
    const mockEquippedArmorSlot = createMockArmorSlot(mockArmor);

    expect(() => mockEquippedArmorSlot.equip(mockArmor)).toThrow(
      "already equipped",
    );
  });

  test("空のslotの装備は外せない", () => {
    const mockEmptyWeaponSlot = createMockWeaponSlot();
    expect(() => mockEmptyWeaponSlot.unequip()).toThrow("not equipped yet");

    const mockEmptyArmorSlot = createMockArmorSlot();
    expect(() => mockEmptyArmorSlot.unequip()).toThrow("not equipped yet");
  });
});
