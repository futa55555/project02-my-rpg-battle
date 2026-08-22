import { Character } from "../src/character";
import { Equipment } from "../src/equipment";

function createHero(): Character {
  return new Character("勇者", 100, 20, 5);
}

test("装備の初期値は空", () => {
  const hero = createHero();
  expect(hero.equipments.length).toBe(0);
});

test("まだ何もつけていないとき、装備できる", () => {
  const hero = createHero();
  const heroSword = new Equipment("勇者の剣", "weapon");

  hero.equip(heroSword);

  expect(hero.equipments.length).toBe(1);
  expect(hero.equipments).toContain(heroSword);
});

test("すでに同一タイプを装備しているとき、装備できない", () => {
  const hero = createHero();
  const heroSword = new Equipment("勇者の剣", "weapon");
  const demonSword = new Equipment("悪魔の剣", "weapon");

  hero.equip(heroSword);

  expect(() => hero.equip(demonSword)).toThrow("this type already equipped");
});

test("異なるタイプの装備は、装備できる", () => {
  const hero = createHero();
  const heroSword = new Equipment("勇者の剣", "weapon");
  const heroArmor = new Equipment("勇者の鎧", "armor");

  hero.equip(heroSword);
  hero.equip(heroArmor);

  expect(hero.equipments.length).toBe(2);
  expect(hero.equipments).toContain(heroSword);
  expect(hero.equipments).toContain(heroArmor);
});

test("装備した装備を外すことができる", () => {
  const hero = createHero();
  const heroSword = new Equipment("勇者の剣", "weapon");
  const heroArmor = new Equipment("勇者の鎧", "armor");

  hero.equip(heroSword);
  hero.equip(heroArmor);

  hero.unequip("weapon");

  expect(hero.equipments.length).toBe(1);
  expect(hero.equipments).toContain(heroArmor);
});

test("装備していない装備は外すことができない", () => {
  const hero = createHero();
  const heroSword = new Equipment("勇者の剣", "weapon");
  hero.equip(heroSword);

  expect(() => hero.unequip("armor")).toThrow("this type not equipped yet");
});
