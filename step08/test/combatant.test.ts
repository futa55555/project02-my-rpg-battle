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

export function createMockCombatant(
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
