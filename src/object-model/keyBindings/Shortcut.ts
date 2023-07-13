import { IModifiersFormatter } from "./IModifiersFormatter.js";
import { Modifier } from "./Modifier.js";

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

export type EShortcutFlags = RELEASE | REPEAT | LAYOUT


class Shortcut {
  constructor(
    public readonly modifiers: Modifier[],
    public readonly key: string,
  ) {}
}

class FlaggedShortcut extends Shortcut {
  constructor(
    modifiers: Modifier[],
    key: string,
    public readonly flag?: EShortcutFlags,
  ) {
    super(modifiers, key)
  }

  getModifiersFormatted(format: IModifiersFormatter): string {
    return format(this.modifiers);
  }
}

export class KeyboardShortcut extends FlaggedShortcut {}
export class PointerShortcut extends Shortcut {}

