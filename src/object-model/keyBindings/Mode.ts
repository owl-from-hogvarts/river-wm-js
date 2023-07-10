import { KeyBinding } from "./KeyBindings";
import { PointerBinding } from "./PointerBindings";
import { KeyboardShortcut } from "./Shortcut";

type Bindings<T> = {
  keyboard?: KeyBinding<T>[];
  pointer?: PointerBinding<T>[];
};

export class BaseMode<T> {
  public readonly id = Symbol();

  constructor(public readonly bindings: Bindings<T>) {}
}

export abstract class NamedMode<T> extends BaseMode<T> {
  constructor(public readonly name: string, bindings: Bindings<T>) {
    super(bindings)
  }
}

export class SwitchableMode<T> extends NamedMode<T> {
  constructor(
    name: string,
    public readonly toggleModeKeyBinding: KeyboardShortcut,
    public readonly fallBackMode: NamedMode<T> | BaseMode<T>,
    bindings: Bindings<T>
  ) {
    super(name, bindings);
  }
}

