import { BaseCommand } from "../executers/Command";
import { SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseAction, IGeneralCapability } from "./BaseAction";

export class EnterMode extends BaseAction<ICanEnterMode<unknown>> {
  override getImplementationDetails<R>(capability: ICanEnterMode<R>): R {
    return capability.enterMode(this.modeName);
  }
  public readonly modeName: string;

  constructor(mode: SwitchableMode) {
    super();
    this.modeName = mode.name;
  }
}

export interface ICanEnterMode<R> {
  enterMode(enterMode: string): R;
}

const a = {
  enterMode(enterMode: string) {
    return "";
  },
  hui() {return 19},
};

new EnterMode(null as any).getImplementationDetails(a);
