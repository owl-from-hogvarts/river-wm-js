import { Modifier } from "./Modifier";
import { IModifiersFormatter } from "./IModifiersFormatter";
import { BaseAction } from "../actions/BaseAction";


interface RELEASE {
  kind: "release"
}

interface REPEAT {
  kind: "repeat"
}

interface LAYOUT {
  kind: "layout",
  index: number
}

export type EKeyBindingFlags = RELEASE | REPEAT | LAYOUT

export class KeyBinding<T> {
  constructor(
    public readonly action: BaseAction<T>,
    public readonly shortcut: Shortcut,
  ) {}
}

export class Shortcut {
  constructor(
    public readonly modifiers: Modifier[],
    public readonly key: string,
    public readonly flag?: EKeyBindingFlags,
  ) {}

  getModifiersFormatted(format: IModifiersFormatter): string {
    return format(this.modifiers);
  }
}

