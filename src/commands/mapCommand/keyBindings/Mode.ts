import { ICommand } from "../../ICommand";
import { Shortcut } from "./KeyBinding";

export class Mode {
  public static readonly DEFAULT_MODE: string = "normal";

  constructor(
    public readonly keyBindings: KeyBinding[],
    public readonly name: string = Mode.DEFAULT_MODE,
    public readonly enterModeKeyBinding: Shortcut
  ) {}
}

export class KeyBinding {
  constructor(
    public readonly command: ICommand,
    public readonly shortcut: Shortcut
  ) {}
}
