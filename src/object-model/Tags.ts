import { BaseAction } from "./actions/BaseAction";
import { KeyBinding, Shortcut } from "./keyBindings/KeyBindings";
import { Modifier } from "./keyBindings/Modifier";

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
    tagKeyBindings.push(new KeyBinding(new TagActionConstructor(tag), new Shortcut(modifiers, keySum)));
  }

  return tagKeyBindings
}
