export type MagicKind = "attack" | "heal";

export abstract class Magic {
  abstract readonly kind: MagicKind;
  private _name: string;
  private _power: number;

  constructor(name: string, power: number) {
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
    return (
      this.kind === magic.kind &&
      this._name === magic.name &&
      this._power === magic.power
    );
  }
}

export class AttackMagic extends Magic {
  readonly kind = "attack";
}

export class HealMagic extends Magic {
  readonly kind = "heal";
}
