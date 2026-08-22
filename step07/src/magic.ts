export abstract class Magic {
  private _name: string;
  private _power: number;

  protected constructor(name: string, power: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (power <= 0) {
      throw new Error("power must be greater than 0");
    }
    this._power = power;
  }

  get name(): string {
    return this._name;
  }
  get power(): number {
    return this._power;
  }

  isSameMagic(magic: Magic): boolean {
    return this._name === magic.name;
  }
}

export class AttackMagic extends Magic {
  constructor(name: string, power: number) {
    super(name, power);
  }
}

export class HealMagic extends Magic {
  constructor(name: string, power: number) {
    super(name, power);
  }
}
