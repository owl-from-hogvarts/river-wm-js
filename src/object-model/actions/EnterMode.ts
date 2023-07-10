import { BaseAction } from "./BaseAction";

export class EnterModeAction extends BaseAction<ICanEnterMode<unknown>> {
  override getImplementationDetails<R>(visitor: ICanEnterMode<R>):R {
    return visitor.enterMode(this.modeName);
  }
  public readonly modeName: string;

  constructor(mode: string) {
    super();
    this.modeName = mode;
  }
}

export interface ICanEnterMode<R> {
  enterMode(enterMode: string): R;
}

