import { KeyBinding, Shortcut } from "./KeyBindings";
import { PointerBinding } from "./PointerBindings";

type Bindings<T> = {
  keyboard?: KeyBinding<T>[],
  pointer?: PointerBinding<T>[]
}

export class BaseMode<T> {
  constructor(
    public readonly bindings: Bindings<T>
    
  ) {}
}

export class SwitchableMode<T> extends BaseMode<T> {
  constructor(
    public readonly name: string,
    public readonly toggleModeKeyBinding: Shortcut,
    public readonly fallBackMode: SwitchableMode<T>,
    bindings: Bindings<T>
  ) {
    super(bindings);
  }
}

