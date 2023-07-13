import { BaseAction } from "../actions/BaseAction.js";
import { KeyboardShortcut } from "./Shortcut.js";

export class KeyBinding<T> {
  constructor(
    public readonly action: BaseAction<T>,
    public readonly shortcut: KeyboardShortcut,
  ) {}
}

