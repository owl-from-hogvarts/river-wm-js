import { Modifier } from "./Modifier";
import { IModifiersFormatter } from "./IModifiersFormatter";
import { BaseAction } from "../actions/BaseAction";


export class KeyBinding<T> {
  constructor(
    public readonly action: BaseAction<T>,
    public readonly shortcut: Shortcut
  ) {}
}

export class Shortcut {
  constructor(
    public readonly modifiers: Modifier[],
    public readonly key: string
  ) {}

  getModifiersFormatted(format: IModifiersFormatter): string {
    return format(this.modifiers);
  }
}

