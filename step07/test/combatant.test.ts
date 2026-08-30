import { BasicAttack, Heal, MagicAttack, SkillAttack } from "../src/action";
import { Combatant } from "../src/combatant";
import { AttackMagic, HealMagic } from "../src/magic";
import { Skill } from "../src/skill";
import { BaseStats } from "../src/stats";

const mockBaseStats = new BaseStats({
  maxHp: 1,
  maxMp: 1,
  strength: 1,
  defense: 1,
  magicAttack: 1,
  healingPower: 1,
});

function createHero(): Combatant {
  const baseStats = new BaseStats({
    maxHp: 20,
    maxMp: 8,
    strength: 5,
    defense: 5,
    magicAttack: 2,
    healingPower: 2,
  });

  return new Combatant("勇者", baseStats);
}

function createSlime(): Combatant {
  const baseStats = new BaseStats({
    maxHp: 5,
    maxMp: 2,
    strength: 3,
    defense: 2,
    magicAttack: 0,
    healingPower: 0,
  });

  return new Combatant("スライム", baseStats);
}

function createMockCombatant(
  name = "モック",
  baseStats = mockBaseStats,
): Combatant {
  return new Combatant(name, baseStats);
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
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, maxHp: 0 }),
      ),
    ).toThrow("max hp must be greater than 0");
  });

  test("最大mpが負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, maxMp: -1 }),
      ),
    ).toThrow("max mp cannot be negative");
  });

  test("攻撃力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, strength: -1 }),
      ),
    ).toThrow("strength cannot be negative");
  });

  test("防御力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, defense: -1 }),
      ),
    ).toThrow("defense cannot be negative");
  });

  test("攻撃魔力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, magicAttack: -1 }),
      ),
    ).toThrow("magic attack cannot be negative");
  });

  test("回復魔力が負の戦闘キャラを作成できない", () => {
    expect(() =>
      createMockCombatant(
        undefined,
        new BaseStats({ ...mockBaseStats, healingPower: -1 }),
      ),
    ).toThrow("healing power cannot be negative");
  });
});

describe("通常攻撃系", () => {
  test("通常攻撃できる", () => {
    const hero = createHero();
    const slime = createSlime();

    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(2);
  });

  test("攻撃を受けてもhpは0を下回らない", () => {
    const hero = createHero();
    const slime = createSlime();

    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(2);
    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(0);
  });

  test("hpが0の戦闘キャラは行動できない", () => {
    const hero = createHero();
    const slime = createSlime();

    hero.act(new BasicAttack(slime));
    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(0);

    expect(() => slime.act(new BasicAttack(hero))).toThrow(
      "dead combatant cannot act",
    );
  });

  test("hpが0の戦闘キャラを攻撃できない", () => {
    const hero = createHero();
    const slime = createSlime();

    hero.act(new BasicAttack(slime));
    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(0);

    expect(() => hero.act(new BasicAttack(slime))).toThrow(
      "target combatant is dead",
    );
  });

  test("防御力が相手の攻撃力より高いとき、ダメージを受けない", () => {
    const hero = createHero();
    const slime = createSlime();

    expect(hero.hp).toBe(20);
    slime.act(new BasicAttack(hero));
    expect(hero.hp).toBe(20);
  });
});

describe("魔法系", () => {
  test("魔法を覚えることができる", () => {
    const hero = createHero();
    const mockAttackMagic = createMockAttackMagic();

    hero.learnMagic(mockAttackMagic);

    expect(hero.magics.length).toBe(1);
    expect(hero.magics).toContain(mockAttackMagic);
  });

  test("すでに覚えた魔法と同名の魔法は覚えることができない", () => {
    const hero = createHero();
    const mockAttackMagic = createMockAttackMagic();
    const copiedMockAttackMagic = createMockAttackMagic();

    hero.learnMagic(mockAttackMagic);

    expect(() => hero.learnMagic(copiedMockAttackMagic)).toThrow(
      "this magic already learned",
    );
  });

  test("覚えた魔法を使って攻撃でき、防御力を貫通する", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockAttackMagic = createMockAttackMagic();

    hero.learnMagic(mockAttackMagic);

    hero.act(new MagicAttack(slime, mockAttackMagic));
    expect(slime.hp).toBe(1);
  });

  test("覚えてない魔法は使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockAttackMagic = createMockAttackMagic();

    expect(() => hero.act(new MagicAttack(slime, mockAttackMagic))).toThrow(
      "this magic not learned yet",
    );
  });

  test("回復魔法で回復できる", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockHealMagic = createMockHealMagic();

    hero.act(new BasicAttack(slime));
    expect(slime.hp).toBe(2);

    hero.learnMagic(mockHealMagic);
    hero.act(new Heal(slime, mockHealMagic));
    expect(slime.hp).toBe(5);
  });
});

describe("スキル系", () => {
  test("スキルを覚えることができる", () => {
    const hero = createHero();
    const mockSkill = createMockSkill();

    hero.learnSkill(mockSkill);

    expect(hero.skills.length).toBe(1);
    expect(hero.skills).toContain(mockSkill);
  });

  test("すでに覚えたスキルと同名のスキルは覚えることができない", () => {
    const hero = createHero();
    const mockSkill = createMockSkill();
    const copiedMockSkill = createMockSkill();

    hero.learnSkill(mockSkill);

    expect(() => hero.learnSkill(copiedMockSkill)).toThrow(
      "this skill already learned",
    );
  });

  test("覚えたスキルを使って攻撃でき、防御力を貫通しない", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockSkill = createMockSkill();

    hero.learnSkill(mockSkill);
    slime.learnSkill(mockSkill);

    slime.act(new SkillAttack(hero, mockSkill));
    expect(hero.hp).toBe(20);

    hero.act(new SkillAttack(slime, mockSkill));
    expect(slime.hp).toBe(0);
  });

  test("覚えてないスキルは使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockSkill = createMockSkill();

    expect(() => hero.act(new SkillAttack(slime, mockSkill))).toThrow(
      "this skill not learned yet",
    );
  });
});
