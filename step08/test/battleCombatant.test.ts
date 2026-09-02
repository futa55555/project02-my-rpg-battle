import { BasicAttack, Heal, MagicAttack, SkillAttack } from "../src/action";
import { BattleCombatant } from "../src/battleCombatant";
import { Combatant } from "../src/combatant";
import { Armor, Weapon } from "../src/equipment";
import { AttackMagic, HealMagic } from "../src/magic";
import { Skill } from "../src/skill";
import { BaseStats, BonusStats } from "../src/stats";
import { createMockCharacter } from "./character.test";
import { createMockCombatant } from "./combatant.test";

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

describe("作成系", () => {
  test("combatantからバトル戦闘キャラを作成できる", () => {
    const mockCombatant = createMockCombatant();
    const mockBattleCombatant = new BattleCombatant(mockCombatant);

    expect(mockBattleCombatant).toBeInstanceOf(BattleCombatant);
    expect(mockBattleCombatant.name).toBe(mockCombatant.name);
    expect(mockBattleCombatant.calculatedStats).toBe(
      mockCombatant.calculatedStats,
    );
    expect(mockBattleCombatant.resources).toBe(mockCombatant.resources);
    expect(mockBattleCombatant.magics).toBe(mockCombatant.magics);
    expect(mockBattleCombatant.skills).toBe(mockCombatant.skills);
  });

  test("characterからバトル戦闘キャラを作成できる", () => {
    const mockCharacter = createMockCharacter();
    const mockBattleCombatant = new BattleCombatant(mockCharacter);

    expect(mockBattleCombatant).toBeInstanceOf(BattleCombatant);
    expect(mockBattleCombatant.name).toBe(mockCharacter.name);
    expect(mockBattleCombatant.calculatedStats).toEqual(
      mockCharacter.calculatedStats,
    );
    expect(mockBattleCombatant.resources).toBe(mockCharacter.resources);
    expect(mockBattleCombatant.magics).toBe(mockCharacter.magics);
    expect(mockBattleCombatant.skills).toBe(mockCharacter.skills);
  });
});

describe("通常攻撃系", () => {
  test("通常攻撃できる", () => {
    const hero = createHero();
    const slime = createSlime();
    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new BasicAttack(battleSlime));
    expect(battleSlime.resources.hp).toBe(2);
  });

  test("攻撃を受けてもhpは0を下回らない", () => {
    const hero = createHero();
    const slime = createSlime();
    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new BasicAttack(battleSlime));
    expect(slime.resources.hp).toBe(2);
    battleHero.act(new BasicAttack(battleSlime));
    expect(slime.resources.hp).toBe(0);
  });

  test("hpが0の戦闘キャラは行動できない", () => {
    const hero = createHero();
    const slime = createSlime();
    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new BasicAttack(battleSlime));
    battleHero.act(new BasicAttack(battleSlime));
    expect(slime.resources.hp).toBe(0);

    expect(() => battleSlime.act(new BasicAttack(battleHero))).toThrow(
      "dead combatant cannot act",
    );
  });

  test("hpが0の戦闘キャラを攻撃できない", () => {
    const hero = createHero();
    const slime = createSlime();
    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new BasicAttack(battleSlime));
    battleHero.act(new BasicAttack(battleSlime));
    expect(slime.resources.hp).toBe(0);

    expect(() => battleHero.act(new BasicAttack(battleSlime))).toThrow(
      "target combatant is dead",
    );
  });

  test("防御力が相手の攻撃力より高いとき、ダメージを受けない", () => {
    const hero = createHero();
    const slime = createSlime();
    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    expect(battleHero.resources.hp).toBe(20);
    battleSlime.act(new BasicAttack(battleHero));
    expect(battleHero.resources.hp).toBe(20);
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

    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new MagicAttack(battleSlime, mockAttackMagic));
    expect(battleSlime.resources.hp).toBe(1);
  });

  test("覚えてない魔法は使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockAttackMagic = createMockAttackMagic();

    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    expect(() =>
      battleHero.act(new MagicAttack(battleSlime, mockAttackMagic)),
    ).toThrow("this magic not learned yet");
  });

  test("回復魔法で回復できる", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockHealMagic = createMockHealMagic();

    hero.learnMagic(mockHealMagic);

    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleHero.act(new BasicAttack(battleSlime));
    expect(battleSlime.resources.hp).toBe(2);

    battleHero.act(new Heal(battleSlime, mockHealMagic));
    expect(battleSlime.resources.hp).toBe(5);
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

    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    battleSlime.act(new SkillAttack(battleHero, mockSkill));
    expect(battleHero.resources.hp).toBe(20);

    battleHero.act(new SkillAttack(battleSlime, mockSkill));
    expect(battleSlime.resources.hp).toBe(0);
  });

  test("覚えてないスキルは使うことができない", () => {
    const hero = createHero();
    const slime = createSlime();
    const mockSkill = createMockSkill();

    const battleHero = new BattleCombatant(hero);
    const battleSlime = new BattleCombatant(slime);

    expect(() =>
      battleHero.act(new SkillAttack(battleSlime, mockSkill)),
    ).toThrow("this skill not learned yet");
  });
});

describe("装備系", () => {
  test("装備による攻撃力上昇が物理攻撃に反映される", () => {
    const mockCharacter = createMockCharacter();
    const mockOpponentCharacter = createMockCharacter("モック敵キャラクター");

    const mockWeapon = createMockWeapon();
    mockCharacter.equip(mockWeapon);

    const mockSkill = createMockSkill();
    mockCharacter.learnSkill(mockSkill);

    const mockBattleCharacter = new BattleCombatant(mockCharacter);
    const mockOpponentBattleCharacter = new BattleCombatant(
      mockOpponentCharacter,
    );

    mockBattleCharacter.act(new BasicAttack(mockOpponentBattleCharacter));
    expect(mockOpponentBattleCharacter.resources.hp).toBe(19);

    mockBattleCharacter.act(
      new SkillAttack(mockOpponentBattleCharacter, mockSkill),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(16);
  });

  test("装備による防御力上昇が物理ダメージに反映される", () => {
    const mockCharacter = createMockCharacter();
    const mockOpponentCharacter = createMockCharacter("モック敵キャラクター");

    const mockArmor = createMockArmor();
    mockOpponentCharacter.equip(mockArmor);

    const mockSkill = createMockSkill();
    mockCharacter.learnSkill(mockSkill);

    const mockBattleCharacter = new BattleCombatant(mockCharacter);
    const mockOpponentBattleCharacter = new BattleCombatant(
      mockOpponentCharacter,
    );

    mockBattleCharacter.act(new BasicAttack(mockOpponentBattleCharacter));
    expect(mockOpponentBattleCharacter.resources.hp).toBe(20);

    mockBattleCharacter.act(
      new SkillAttack(mockOpponentBattleCharacter, mockSkill),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(19);
  });

  test("装備による攻撃魔力上昇が魔法攻撃に反映される", () => {
    const mockCharacter = createMockCharacter();
    const mockOpponentCharacter = createMockCharacter("モック敵キャラクター");

    const mockWeapon = createMockWeapon();
    mockCharacter.equip(mockWeapon);

    const mockAttackMagic = createMockAttackMagic();
    mockCharacter.learnMagic(mockAttackMagic);

    const mockBattleCharacter = new BattleCombatant(mockCharacter);
    const mockOpponentBattleCharacter = new BattleCombatant(
      mockOpponentCharacter,
    );

    mockBattleCharacter.act(
      new MagicAttack(mockOpponentBattleCharacter, mockAttackMagic),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(15);
  });

  test("装備による回復魔力上昇が回復魔法に反映される", () => {
    const mockCharacter = createMockCharacter();
    const mockOpponentCharacter = createMockCharacter("モック敵キャラクター");

    const mockAttackMagic = createMockAttackMagic();
    mockCharacter.learnMagic(mockAttackMagic);

    const mockWeapon = createMockWeapon();
    mockCharacter.equip(mockWeapon);

    const mockHealMagic = createMockHealMagic();
    mockCharacter.learnMagic(mockHealMagic);

    const mockBattleCharacter = new BattleCombatant(mockCharacter);
    const mockOpponentBattleCharacter = new BattleCombatant(
      mockOpponentCharacter,
    );

    mockBattleCharacter.act(
      new MagicAttack(mockOpponentBattleCharacter, mockAttackMagic),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(15);

    mockBattleCharacter.act(
      new MagicAttack(mockOpponentBattleCharacter, mockAttackMagic),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(10);

    mockBattleCharacter.act(
      new Heal(mockOpponentBattleCharacter, mockHealMagic),
    );
    expect(mockOpponentBattleCharacter.resources.hp).toBe(15);
  });
});
