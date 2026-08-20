import { Combatant } from "../src/combatant";

test("戦闘キャラを作成できる", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  expect(hero).toBeInstanceOf(Combatant);
});

test("name空の戦闘キャラを作成できない", () => {
  expect(() => new Combatant(" ", 100, 20, 5)).toThrow("name cannot be empty");
});

test("hpが0以下の戦闘キャラを作成できない", () => {
  expect(() => new Combatant("勇者", 0, 20, 5)).toThrow(
    "hp must be greater than 0",
  );
});

test("攻撃力が負の戦闘キャラを作成できない", () => {
  expect(() => new Combatant("勇者", 100, -10, 5)).toThrow(
    "strength cannot be negative",
  );
});

test("防御力が負の戦闘キャラを作成できない", () => {
  expect(() => new Combatant("勇者", 100, 20, -5)).toThrow(
    "defense cannot be negative",
  );
});

test("攻撃者のstrがターゲットのhpより小さい場合、str分の攻撃をする", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  const slime = new Combatant("スライム", 30, 5, 0);

  hero.attack(slime);

  expect(slime.hp).toBe(10);
});

test("攻撃者のstrがターゲットのhpより大きい場合、hpは0で止まる", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  const slime = new Combatant("スライム", 30, 5, 0);

  hero.attack(slime);
  expect(slime.hp).toBe(10);

  hero.attack(slime);
  expect(slime.hp).toBe(0);

  expect(() => hero.attack(slime)).toThrow(new Error("target is dead"));
});

test("死んだ戦闘キャラは攻撃できない", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  const boss = new Combatant("ボス", 300, 80, 0);

  boss.attack(hero);
  boss.attack(hero);

  expect(() => hero.attack(boss)).toThrow("attacker is dead");
});

test("防御力の分だけダメージを減らす", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  const orc = new Combatant("オーク", 30, 10, 0);

  orc.attack(hero);
  expect(hero.hp).toBe(95);
});

test("防御力が相手の攻撃力より高いとき、ダメージを受けない", () => {
  const hero = new Combatant("勇者", 100, 20, 10);
  const slime = new Combatant("スライム", 30, 5, 0);

  slime.attack(hero);
  expect(hero.hp).toBe(100);
});
