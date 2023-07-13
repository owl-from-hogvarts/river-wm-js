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

import { BaseAction } from "./BaseAction.js";
import { KeyBinding } from "../keyBindings/KeyBindings.js";
import { Modifier } from "../keyBindings/Modifier.js";
import { KeyboardShortcut } from "../keyBindings/Shortcut.js";

export type Tag = number;

export enum ETagAction {
  SET,
  TOGGLE,
}

export enum ETagActionScope {
  FOCUSED,
  VIEW,
}


export class TagAction extends BaseAction<ICanTag<unknown>> {
  constructor(
    private readonly action: ETagAction,
    private readonly scope: ETagActionScope,
    private readonly tag: Tag
  ) {
    super();
  }

  override getImplementationDetails<R>(visitor: ICanTag<R>): R {
    return visitor.tag(this.action, this.scope, this.tag);
  }
}

export interface ICanTag<R> {
  tag(action: ETagAction, scope: ETagActionScope, tag: Tag): R;
}

// using U+2800 at the begging of the padded strings so padding won't be removed
/**
 * Usage example, as usual, in `example.ts`
 * 
 * @param modifiers 
 * @param keySums 
 * @param TagActionConstructor you should bind `action` and `scope` parameters of TagActionConstructor/
 * 
 * ```typescript
 * mapTags(modifiers, 
 *⠀       keySum, 
 *⠀       TagAction.bind(null, 
 *⠀                      ETagAction.TOGGLE, 
 *⠀                      ETagActionScope.VIEW))
 * ```
 * @param tagFunction 
 */
export function mapTags(
  modifiers: Modifier[],
  keySums: string[],
  TagActionConstructor: new (tag: Tag) => TagAction,
  tagFunction: (keySymArg: string) => Tag
): KeyBinding<ICanTag<unknown>>[] {
  const tagKeyBindings: KeyBinding<ICanTag<unknown>>[] = []

  for (const keySum of keySums) {
    const tag = tagFunction(keySum);
    tagKeyBindings.push(new KeyBinding(new TagActionConstructor(tag), new KeyboardShortcut(modifiers, keySum)));
  }

  return tagKeyBindings
}
