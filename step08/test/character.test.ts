import { BasicAttack, Heal, MagicAttack, SkillAttack } from "../src/action";
import { Character } from "../src/character";
import { Armor, Weapon } from "../src/equipment";
import { AttackMagic, HealMagic } from "../src/magic";
import { Skill } from "../src/skill";
import { BaseStats, BonusStats } from "../src/stats";

export function createMockCharacter(
  name: string = "モックキャラクター",
): Character {
  const baseStats = new BaseStats({
    maxHp: 20,
    maxMp: 8,
    strength: 5,
    defense: 5,
    magicAttack: 2,
    healingPower: 2,
  });

  return new Character(name, baseStats);
}

function createMockWeapon(name: string = "モック武器"): Weapon {
  return new Weapon(
    name,
    new BonusStats({ strength: 1, magicAttack: 1, healingPower: 1 }),
  );
}

function createMockArmor(): Armor {
  return new Armor("モック鎧", new BonusStats({ defense: 1 }));
}

function createMockAttackMagic(): AttackMagic {
  return new AttackMagic("モック攻撃魔法", 2);
}

function createMockHealMagic(): HealMagic {
  return new HealMagic("モック回復魔法", 2);
}

function createMockSkill(): Skill {
  return new Skill("モックスキル", 2);
}

describe("装備系", () => {
  test("装備の初期値は空", () => {
    const mockCharacter = createMockCharacter();
    expect(mockCharacter.equipmentSlots.weapon.equipment).toBeNull();
    expect(mockCharacter.equipmentSlots.armor.equipment).toBeNull();
  });

  test("まだ何もつけていないとき、装備できる", () => {
    const mockCharacter = createMockCharacter();
    const mockWeapon = createMockWeapon();

    expect(mockCharacter.calculatedStats.strength).toBe(
      mockCharacter.baseStats.strength,
    );

    mockCharacter.equip(mockWeapon);

    expect(mockCharacter.equipmentSlots.weapon.equipment).toBe(mockWeapon);
    expect(mockCharacter.equipmentSlots.armor.equipment).toBeNull();

    expect(mockCharacter.calculatedStats.strength).toBe(
      mockCharacter.baseStats.strength + mockWeapon.bonusStats.strength,
    );
  });

  test("すでに同一タイプを装備しているとき、装備できない", () => {
    const mockCharacter = createMockCharacter();
    const mockWeapon = createMockWeapon();
    const differentWeapon = createMockWeapon("違う武器");

    mockCharacter.equip(mockWeapon);

    expect(() => mockCharacter.equip(differentWeapon)).toThrow(
      "already equipped",
    );
  });

  test("異なるタイプの装備は、装備できる", () => {
    const mockCharacter = createMockCharacter();
    const mockWeapon = createMockWeapon();
    const mockArmor = createMockArmor();

    mockCharacter.equip(mockWeapon);
    mockCharacter.equip(mockArmor);

    expect(mockCharacter.equipmentSlots.weapon.equipment).toBe(mockWeapon);
    expect(mockCharacter.equipmentSlots.armor.equipment).toBe(mockArmor);
  });

  test("装備した装備を外すことができる", () => {
    const mockCharacter = createMockCharacter();
    const mockWeapon = createMockWeapon();
    const mockArmor = createMockArmor();

    mockCharacter.equip(mockWeapon);
    mockCharacter.equip(mockArmor);

    mockCharacter.unequip(mockCharacter.equipmentSlots.weapon);

    expect(mockCharacter.equipmentSlots.weapon.equipment).toBeNull();
    expect(mockCharacter.equipmentSlots.armor.equipment).toBe(mockArmor);
  });

  test("装備していない装備は外すことができない", () => {
    const mockCharacter = createMockCharacter();
    const mockWeapon = createMockWeapon();
    mockCharacter.equip(mockWeapon);

    expect(() =>
      mockCharacter.unequip(mockCharacter.equipmentSlots.armor),
    ).toThrow("not equipped yet");
  });
});
