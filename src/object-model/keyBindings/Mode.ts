import { KeyBinding } from "./KeyBindings.js";
import { PointerBinding } from "./PointerBindings.js";
import { KeyboardShortcut } from "./Shortcut.js";

type Bindings<T> = {
  keyboard?: KeyBinding<T>[];
  pointer?: PointerBinding<T>[];
};

let debugIdCount = 0;

export abstract class BaseMode<T> {
  public readonly id = Symbol(debugIdCount);

  constructor(public readonly bindings: Bindings<T>) {
    debugIdCount++
  }

  public getImplementationDetails<R>(visitor: ICanProcessModes<R, T>): R {
    return visitor.baseMode(this) 
  }
}

export interface ICanProcessModes<R, T> {
  baseMode(mode: BaseMode<T>): R
  namedMode(mode: NamedMode<T>): R
  switchableMode(mode: SwitchableMode<T>): R
  enterableMode(mode: EnterableMode<T>): R
}

export class NamedMode<T, NAME extends string = string> extends BaseMode<T> {
  constructor(public readonly name: NAME, bindings: Bindings<T>) {
    super(bindings)
  }

  public override getImplementationDetails<R>(visitor: ICanProcessModes<R, T>): R {
    return visitor.namedMode(this)
  }
}

export class SwitchableMode<T> extends NamedMode<T> {
  constructor(
    name: string,
    public readonly toggleModeShortcut: KeyboardShortcut,
    public readonly fallBackMode: NamedMode<T> | BaseMode<T>,
    bindings: Bindings<T>
  ) {
    super(name, bindings);
  }

  public override getImplementationDetails<R>(visitor: ICanProcessModes<R, T>): R {
    return visitor.switchableMode(this)
  }
}

export const ALL = "all"

export class EnterableMode<T, NAME extends string = string> extends NamedMode<T, NAME> {
  /**
   * 
   * @param name 
   * @param enterModeShortcut 
   * @param baseMode array of modes, from which this one will be enterable
   * @param bindings 
   */
  constructor(
    name: NAME,
    public readonly enterModeShortcut: KeyboardShortcut,
    public readonly baseModes: NamedMode<T>[] | typeof ALL,
    bindings: Bindings<T>,
  ) {
    super(name, bindings);
  }

  public override getImplementationDetails<R>(visitor: ICanProcessModes<R, T>): R {
    return visitor.enterableMode(this)
  }
}
