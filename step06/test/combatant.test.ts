import { BasicAttack, Heal, MagicAttack, SkillAttack } from "../src/action";
import { Combatant } from "../src/combatant";
import { AttackMagic, HealMagic } from "../src/magic";
import { Skill } from "../src/skill";

describe("作成系", () => {
  test("戦闘キャラを作成できる", () => {
    const hero = new Combatant("勇者", 100, 20, 5);
    expect(hero).toBeInstanceOf(Combatant);
  });

  test("name空の戦闘キャラを作成できない", () => {
    expect(() => new Combatant(" ", 100, 20, 5)).toThrow(
      "name cannot be empty",
    );
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
});

test("通常攻撃できる", () => {
  const hero = new Combatant("勇者", 100, 20, 5);
  const orc = new Combatant("オーク", 45, 10, 5);

  hero.act(new BasicAttack(orc));
  expect(orc.hp).toBe(30);
});

test("hpが0の戦闘キャラは行動できない", () => {
  const hero = new Combatant("勇者", 100, 20, 5);

  hero.takeDamage({ type: "physical", value: 150 });
  expect(hero.hp).toBe(0);

  const slime = new Combatant("スライム", 30, 5, 0);
  expect(() => hero.act(new BasicAttack(slime))).toThrow(
    "dead combatant cannot act",
  );
});

test("防御力の分だけダメージを減らす", () => {
  const hero = new Combatant("勇者", 100, 20, 5);

  hero.takeDamage({ type: "physical", value: 25 });
  expect(hero.hp).toBe(80);
});

test("防御力が相手の攻撃力より高いとき、ダメージを受けない", () => {
  const hero = new Combatant("勇者", 100, 20, 10);

  hero.takeDamage({ type: "physical", value: 5 });
  expect(hero.hp).toBe(100);
});

describe("魔法系", () => {
  test("魔法を覚えることができる", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const mera = new AttackMagic("メラ", 15);

    hero.learnMagic(mera);

    expect(hero.magics.length).toBe(1);
    expect(hero.magics).toContain(mera);
  });

  test("すでに覚えた魔法と同名の魔法は覚えることができない", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const mera1 = new AttackMagic("メラ", 15);
    const mera2 = new AttackMagic("メラ", 10);

    hero.learnMagic(mera1);

    expect(() => hero.learnMagic(mera2)).toThrow("this magic already learned");
  });

  test("覚えた魔法を使って攻撃でき、防御力を貫通する", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const slime = new Combatant("スライム", 30, 5, 0);
    const orc = new Combatant("オーク", 45, 10, 5);
    const mera = new AttackMagic("メラ", 15);

    hero.learnMagic(mera);

    hero.act(new MagicAttack(slime, mera));
    expect(slime.hp).toBe(15);

    hero.act(new MagicAttack(orc, mera));
    expect(orc.hp).toBe(30);
  });

  test("覚えてない魔法は使うことができない", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const slime = new Combatant("スライム", 30, 5, 0);
    const mera = new AttackMagic("メラ", 15);

    expect(() => hero.act(new MagicAttack(slime, mera))).toThrow(
      "this magic not learned yet",
    );
  });

  test("回復魔法で回復できる", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const orc = new Combatant("オーク", 45, 15, 5);
    const heal = new HealMagic("ホイミ", 10);

    orc.act(new BasicAttack(hero));
    expect(hero.hp).toBe(95);

    hero.learnMagic(heal);
    hero.act(new Heal(hero, heal));
    expect(hero.hp).toBe(105);
  });
});

describe("スキル系", () => {
  test("スキルを覚えることができる", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const tackle = new Skill("体当たり", 10);

    hero.learnSkill(tackle);

    expect(hero.skills.length).toBe(1);
    expect(hero.skills).toContain(tackle);
  });

  test("すでに覚えたスキルと同名のスキルは覚えることができない", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const tackle1 = new Skill("体当たり", 10);
    const tackle2 = new Skill("体当たり", 5);

    hero.learnSkill(tackle1);

    expect(() => hero.learnSkill(tackle2)).toThrow(
      "this skill already learned",
    );
  });

  test("覚えたスキルを使って攻撃でき、防御力を貫通しない", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const orc = new Combatant("オーク", 45, 10, 5);
    const tackle = new Skill("体当たり", 10);

    hero.learnSkill(tackle);

    hero.act(new SkillAttack(orc, tackle));
    expect(orc.hp).toBe(20);
  });

  test("覚えてないスキルは使うことができない", () => {
    const hero = new Combatant("勇者", 100, 20, 10);
    const slime = new Combatant("スライム", 30, 5, 0);
    const tackle = new Skill("体当たり", 10);

    expect(() => hero.act(new SkillAttack(slime, tackle))).toThrow(
      "this skill not learned yet",
    );
  });
});
