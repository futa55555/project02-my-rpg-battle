import { Combatant } from "../src/combatant";

test("戦闘キャラを作成できる", () => {
  const hero = new Combatant("勇者", 100, 20);
  expect(hero).toBeInstanceOf(Combatant);
});

test("name空の戦闘キャラを作成できない", () => {
  expect(() => new Combatant(" ", 100, 20)).toThrow("name cannot be empty");
});

test("hpが0以下の戦闘キャラを作成できない", () => {
  expect(() => new Combatant("勇者", 0, 20)).toThrow(
    "hp must be greater than 0",
  );
});

test("攻撃力が負の戦闘キャラを作成できない", () => {
  expect(() => new Combatant("勇者", 100, -10)).toThrow(
    "strength cannot be negative",
  );
});

test("攻撃者のstrがターゲットのhpより小さい場合、str分の攻撃をする", () => {
  const hero = new Combatant("勇者", 100, 20);
  const slime = new Combatant("スライム", 30, 5);

  hero.attack(slime);

  expect(slime.hp).toBe(10);
});

test("攻撃者のstrがターゲットのhpより大きい場合、hpは0で止まる", () => {
  const hero = new Combatant("勇者", 100, 20);
  const slime = new Combatant("スライム", 30, 5);

  hero.attack(slime);
  expect(slime.hp).toBe(10);

  hero.attack(slime);
  expect(slime.hp).toBe(0);

  expect(() => hero.attack(slime)).toThrow(new Error("target is dead"));
});

test("死んだ戦闘キャラは攻撃できない", () => {
  const hero = new Combatant("勇者", 100, 20);
  const boss = new Combatant("ボス", 300, 80);

  boss.attack(hero);
  boss.attack(hero);

  expect(() => hero.attack(boss)).toThrow("attacker is dead");
});
