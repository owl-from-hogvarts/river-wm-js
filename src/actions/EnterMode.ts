import { SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseAction } from "./BaseAction";

export class EnterMode extends BaseAction<ICanEnterMode<unknown>> {
  override getImplementationDetails<R>(visitor: ICanEnterMode<R>):R {
    return visitor.enterMode(this.modeName);
  }
  public readonly modeName: string;

  constructor(mode: SwitchableMode<ICanEnterMode<unknown>>) {
    super();
    this.modeName = mode.name;
  }
}

export interface ICanEnterMode<R> {
  enterMode(enterMode: string): R;
}

class A implements ICanEnterMode<string> {
  enterMode(enterMode: string) {
    return "";
  }

  hui() {return 19}
};

new EnterMode(null as any).getImplementationDetails(new A());
