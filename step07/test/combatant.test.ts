import { BasicAttack, Heal, MagicAttack, SkillAttack } from "../src/action";
import { Combatant } from "../src/combatant";
import { AttackMagic, HealMagic } from "../src/magic";
import { Skill } from "../src/skill";
import { Stats } from "../src/stats";

const mockStats: Stats = {
  maxHp: 1,
  maxMp: 1,
  strength: 1,
  defense: 1,
  magicAttack: 1,
  healingPower: 1,
};

function createHero(): Combatant {
  const stats: Stats = {
    maxHp: 100,
    maxMp: 30,
    strength: 20,
    defense: 10,
    magicAttack: 5,
    healingPower: 5,
  };

  return new Combatant("勇者", stats);
}

function createSlime(): Combatant {
  const stats: Stats = {
    maxHp: 30,
    maxMp: 5,
    strength: 15,
    defense: 5,
    magicAttack: 2,
    healingPower: 2,
  };

  return new Combatant("スライム", stats);
}

function createOrc(): Combatant {
  const stats: Stats = {
    maxHp: 70,
    maxMp: 10,
    strength: 20,
    defense: 5,
    magicAttack: 5,
    healingPower: 5,
  };

  return new Combatant("オーク", stats);
}

function createMockCombatant(name = "モック", stats = mockStats): Combatant {
  return new Combatant(name, stats);
}

function createFireBall(): AttackMagic {
  return new AttackMagic("ファイアーボール", 15);
}

function createHeal(): HealMagic {
  return new HealMagic("ヒール", 10);
}

function createTackle(): Skill {
  return new Skill("体当たり", 10);
}

describe("作成系", () => {
  test("戦闘キャラを作成できる", () => {
    const mockCombatant = createMockCombatant();
    expect(mockCombatant).toBeInstanceOf(Combatant);
  });

  test("name空の戦闘キャラを作成できない", () => {
    expect(() => createMockCombatant("")).toThrow("name cannot be empty");
  });

  test("最大hpが0以下の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, maxHp: 0 }),
    ).toThrow("max hp must be greater than 0");
  });

  test("最大mpが負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, maxMp: -1 }),
    ).toThrow("max mp cannot be negative");
  });

  test("攻撃力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, strength: -1 }),
    ).toThrow("strength cannot be negative");
  });

  test("防御力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, defense: -1 }),
    ).toThrow("defense cannot be negative");
  });

  test("攻撃魔力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, magicAttack: -1 }),
    ).toThrow("magic attack cannot be negative");
  });

  test("回復魔力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(undefined, { ...mockStats, healingPower: -1 }),
    ).toThrow("healing power cannot be negative");
  });
});

test("通常攻撃できる", () => {
  const hero = createHero();
  const orc = createOrc();

  hero.act(new BasicAttack(orc));
  expect(orc.hp).toBe(55);
});

test("hpが0の戦闘キャラは行動できない", () => {
  const hero = createHero();

  hero.takeDamage({ type: "physical", value: 150 });
  expect(hero.hp).toBe(0);

  const slime = createSlime();
  expect(() => hero.act(new BasicAttack(slime))).toThrow(
    "dead combatant cannot act",
  );
});

test("防御力の分だけダメージを減らす", () => {
  const hero = createHero();
  const slime = createSlime();

  slime.act(new BasicAttack(hero));
  expect(hero.hp).toBe(95);
});

test("防御力が相手の攻撃力より高いとき、ダメージを受けない", () => {
  const hero = createHero();

  hero.takeDamage({ type: "physical", value: 5 });
  expect(hero.hp).toBe(100);
});

describe("魔法系", () => {
  test("魔法を覚えることができる", () => {
    const hero = createHero();
    const fireBall = createFireBall();

    hero.learnMagic(fireBall);

    expect(hero.magics.length).toBe(1);
    expect(hero.magics).toContain(fireBall);
  });

  test("すでに覚えた魔法と同名の魔法は覚えることができない", () => {
    const hero = createHero();
    const fireBall1 = createFireBall();
    const fireBall2 = createFireBall();

    hero.learnMagic(fireBall1);

    expect(() => hero.learnMagic(fireBall2)).toThrow(
      "this magic already learned",
    );
  });

  test("覚えた魔法を使って攻撃でき、防御力を貫通する", () => {
    const hero = createHero();
    const slime = createSlime();
    const orc = createOrc();
    const fireBall = createFireBall();

    hero.learnMagic(fireBall);

    hero.act(new MagicAttack(slime, fireBall));
    expect(slime.hp).toBe(15);

    hero.act(new MagicAttack(orc, fireBall));
    expect(orc.hp).toBe(55);
  });

  test("覚えてない魔法は使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const fireBall = createFireBall();

    expect(() => hero.act(new MagicAttack(slime, fireBall))).toThrow(
      "this magic not learned yet",
    );
  });

  test("回復魔法で回復できる", () => {
    const hero = createHero();
    const orc = createOrc();
    const heal = createHeal();

    orc.act(new BasicAttack(hero));
    orc.act(new BasicAttack(hero));
    expect(hero.hp).toBe(80);

    hero.learnMagic(heal);
    hero.act(new Heal(hero, heal));
    expect(hero.hp).toBe(90);
  });
});

describe("スキル系", () => {
  test("スキルを覚えることができる", () => {
    const hero = createHero();
    const tackle = createTackle();

    hero.learnSkill(tackle);

    expect(hero.skills.length).toBe(1);
    expect(hero.skills).toContain(tackle);
  });

  test("すでに覚えたスキルと同名のスキルは覚えることができない", () => {
    const hero = createHero();
    const tackle1 = createTackle();
    const tackle2 = createTackle();

    hero.learnSkill(tackle1);

    expect(() => hero.learnSkill(tackle2)).toThrow(
      "this skill already learned",
    );
  });

  test("覚えたスキルを使って攻撃でき、防御力を貫通しない", () => {
    const hero = createHero();
    const orc = createOrc();
    const tackle = createTackle();

    hero.learnSkill(tackle);

    hero.act(new SkillAttack(orc, tackle));
    expect(orc.hp).toBe(45);
  });

  test("覚えてないスキルは使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const tackle = createTackle();

    expect(() => hero.act(new SkillAttack(slime, tackle))).toThrow(
      "this skill not learned yet",
    );
  });
});
