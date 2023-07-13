/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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

