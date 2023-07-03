import { SwitchableMode } from "../keyBindings/Mode";
import { BaseAction } from "./BaseAction";

export class EnterModeAction extends BaseAction<ICanEnterMode<unknown>> {
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

