import { BaseAction } from "../actions/BaseAction";
import { Shortcut } from "./Shortcut";

export class BaseMode<T> {
  constructor(
    public readonly keyBindings: KeyBinding<T>[]
  ) {}
}

export class SwitchableMode<T> extends BaseMode<T> {
  constructor(
    keyBindings: KeyBinding<T>[],
    public readonly name: string,
    public readonly toggleModeKeyBinding: Shortcut,
    public readonly fallBackMode: SwitchableMode<T>
  ) {
    super(keyBindings);
  }
}

export class KeyBinding<T> {
  constructor(
    public readonly action: BaseAction<T>,
    public readonly shortcut: Shortcut
  ) {}
}
