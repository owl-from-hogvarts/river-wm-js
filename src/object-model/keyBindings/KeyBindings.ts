import { BaseAction } from "../actions/BaseAction";
import { KeyboardShortcut } from "./Shortcut";

export class KeyBinding<T> {
  constructor(
    public readonly action: BaseAction<T>,
    public readonly shortcut: KeyboardShortcut,
  ) {}
}

