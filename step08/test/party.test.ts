import { Party } from "../src/party";
import { createMockCharacter } from "./character.test";

describe("作成系", () => {
  test("初期キャラを入れて作成できる", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.characters[0]).toEqual(mockCharacter);
    expect(mockParty.balance).toBe(0);
  });
});

describe("お金系", () => {
  test("正の値のお金を獲得できる", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.balance).toBe(0);

    mockParty.gainMoney(100);
    expect(mockParty.balance).toBe(100);
  });

  test("0以下のお金は獲得できない", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.balance).toBe(0);

    expect(() => mockParty.gainMoney(0)).toThrow(
      "cannot gain non-positive money",
    );
    expect(() => mockParty.gainMoney(-100)).toThrow(
      "cannot gain non-positive money",
    );
  });

  test("正の値のお金を消費できる", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.balance).toBe(0);
    mockParty.gainMoney(100);
    expect(mockParty.balance).toBe(100);

    mockParty.spendMoney(70);
    expect(mockParty.balance).toBe(30);
  });

  test("0以下のお金は消費できない", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.balance).toBe(0);
    mockParty.gainMoney(100);
    expect(mockParty.balance).toBe(100);

    expect(() => mockParty.spendMoney(0)).toThrow(
      "cannot spend non-positive money",
    );
    expect(() => mockParty.spendMoney(-70)).toThrow(
      "cannot spend non-positive money",
    );
  });

  test("所持金を超えるお金は消費できない", () => {
    const mockCharacter = createMockCharacter();
    const mockParty = new Party(mockCharacter);
    expect(mockParty.balance).toBe(0);
    mockParty.gainMoney(100);
    expect(mockParty.balance).toBe(100);

    expect(() => mockParty.spendMoney(200)).toThrow(
      "cannot spend money more than you have",
    );
  });
});
