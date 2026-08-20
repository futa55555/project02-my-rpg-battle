export class Combatant {
  private _name: string;
  private _hp: number;
  private _strength: number;
  private _defense: number;

  constructor(name: string, hp: number, strength: number, defense: number) {
    if (name.trim() === "") {
      throw new Error("name cannot be empty");
    }
    this._name = name;

    if (hp <= 0) {
      throw new Error("hp must be greater than 0");
    }
    this._hp = hp;

    if (strength < 0) {
      throw new Error("strength cannot be negative");
    }
    this._strength = strength;

    if (defense < 0) {
      throw new Error("defense cannot be negative");
    }
    this._defense = defense;
  }

  get name(): string {
    return this._name;
  }
  get hp(): number {
    return this._hp;
  }
  get strength(): number {
    return this._strength;
  }
  get defense(): number {
    return this._defense;
  }

  attack(target: Combatant): void {
    if (!this.isAlive()) {
      throw new Error("attacker is dead");
    }
    if (!target.isAlive()) {
      throw new Error("target is dead");
    }

    const damage = this._strength;
    target.takeDamage(damage);
  }

  private takeDamage(damage: number): void {
    if (!this.isAlive()) {
      throw new Error("already dead");
    }
    if (damage < 0) {
      throw new Error("damage cannot be negative");
    }

    const defensedDamage = Math.max(damage - this._defense, 0);

    const actualDamage = Math.min(defensedDamage, this._hp);
    this._hp -= actualDamage;
  }

  isAlive(): boolean {
    return this._hp > 0;
  }
}
