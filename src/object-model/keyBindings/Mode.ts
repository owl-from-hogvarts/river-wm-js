import exp from "node:constants";
import { BaseAction } from "../../actions/BaseAction";
import { Shortcut } from "./Shortcut";

export class BaseMode {
  constructor(
    public readonly keyBindings: KeyBinding[],
  ) {}
}

export class SwitchableMode extends BaseMode {
  constructor(
    keyBindings: KeyBinding[],
    public readonly name: string,
    public readonly enterModeKeyBinding: Shortcut,
    public readonly fallBackMode: SwitchableMode
  ) {
    super(keyBindings)
  }
}

export class KeyBinding {
  constructor(
    public readonly action: BaseAction,
    public readonly shortcut: Shortcut
  ) {}
}
