import { Character } from "./character";

export class Party {
  private _characters: Character[];
  private _balance: number;

  constructor(initialCharacter: Character) {
    this._characters = [initialCharacter];
    this._balance = 0;
  }

  get characters(): Character[] {
    return this._characters;
  }
  get balance(): number {
    return this._balance;
  }

  gainMoney(value: number): void {
    if (value <= 0) {
      throw new Error("cannot gain non-positive money");
    }
    this._balance += value;
  }

  spendMoney(value: number): void {
    if (value <= 0) {
      throw new Error("cannot spend non-positive money");
    }
    if (value > this._balance) {
      throw new Error("cannot spend money more than you have");
    }

    this._balance -= value;
  }
}
