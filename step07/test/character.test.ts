import { Character } from "../src/character";
import { Armor, Weapon } from "../src/equipment";
import { type Stats } from "../src/stats";
import { createMockStatsBonus } from "./statsBonus.test";

function createHero(): Character {
  const stats: Stats = {
    maxHp: 100,
    maxMp: 30,
    strength: 20,
    defense: 10,
    magicAttack: 5,
    healingPower: 5,
  };

  return new Character("勇者", stats);
}

function createHeroSword(): Weapon {
  return new Weapon("勇者の剣", createMockStatsBonus());
}

function createHeroArmor(): Armor {
  return new Armor("勇者の鎧", createMockStatsBonus());
}

function createDemonSword(): Weapon {
  return new Weapon("悪魔の剣", createMockStatsBonus());
}

test("装備の初期値は空", () => {
  const hero = createHero();
  expect(hero.equipmentSlots.weapon.equipment).toBeNull();
  expect(hero.equipmentSlots.armor.equipment).toBeNull();
});

test("まだ何もつけていないとき、装備できる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();

  hero.equip(heroSword);

  expect(hero.equipmentSlots.weapon.equipment).toBe(heroSword);
  expect(hero.equipmentSlots.armor.equipment).toBeNull();
});

test("すでに同一タイプを装備しているとき、装備できない", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const demonSword = createDemonSword();

  hero.equip(heroSword);

  expect(() => hero.equip(demonSword)).toThrow("already equipped");
});

test("異なるタイプの装備は、装備できる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const heroArmor = createHeroArmor();

  hero.equip(heroSword);
  hero.equip(heroArmor);

  expect(hero.equipmentSlots.weapon.equipment).toBe(heroSword);
  expect(hero.equipmentSlots.armor.equipment).toBe(heroArmor);
});

test("装備した装備を外すことができる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const heroArmor = createHeroArmor();

  hero.equip(heroSword);
  hero.equip(heroArmor);

  hero.unequip(hero.equipmentSlots.weapon);

  expect(hero.equipmentSlots.weapon.equipment).toBeNull();
  expect(hero.equipmentSlots.armor.equipment).toBe(heroArmor);
});

test("装備していない装備は外すことができない", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  hero.equip(heroSword);

  expect(() => hero.unequip(hero.equipmentSlots.armor)).toThrow(
    "not equipped yet",
  );
});
