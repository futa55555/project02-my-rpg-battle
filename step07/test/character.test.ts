import { Character } from "../src/character";
import { type Stats } from "../src/stats";

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
  return new Weapon("勇者の剣", { strength: 5 });
}

function createHeroArmor(): Armor {
  return new Armor("勇者の鎧", { defense: 5 });
}

function createDemonSword(): Weapon {
  return new Weapon("悪魔の剣", { strength: 5 });
}

test("装備の初期値は空", () => {
  const hero = createHero();
  expect(hero.equipments.length).toBe(0);
});

test("まだ何もつけていないとき、装備できる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();

  hero.equip(heroSword);

  expect(hero.equipments.length).toBe(1);
  expect(hero.equipments).toContain(heroSword);
});

test("すでに同一タイプを装備しているとき、装備できない", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const demonSword = createDemonSword();

  hero.equip(heroSword);

  expect(() => hero.equip(demonSword)).toThrow("this type already equipped");
});

test("異なるタイプの装備は、装備できる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const heroArmor = createHeroArmor();

  hero.equip(heroSword);
  hero.equip(heroArmor);

  expect(hero.equipments.length).toBe(2);
  expect(hero.equipments).toContain(heroSword);
  expect(hero.equipments).toContain(heroArmor);
});

test("装備した装備を外すことができる", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  const heroArmor = createHeroArmor();

  hero.equip(heroSword);
  hero.equip(heroArmor);

  hero.unequip("weapon");

  expect(hero.equipments.length).toBe(1);
  expect(hero.equipments).toContain(heroArmor);
});

test("装備していない装備は外すことができない", () => {
  const hero = createHero();
  const heroSword = createHeroSword();
  hero.equip(heroSword);

  expect(() => hero.unequip("armor")).toThrow("this type not equipped yet");
});
