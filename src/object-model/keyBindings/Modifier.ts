class ModifierInternal {
  constructor(private readonly modifierSymbol: string) {}
  toString() {
    return this.modifierSymbol
  }
}

export type Modifier = ModifierInternal;

export const Shift = new ModifierInternal("Shift");
export const Alt = new ModifierInternal("Alt");
export const Super = new ModifierInternal("Super");
