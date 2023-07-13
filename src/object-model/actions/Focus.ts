import { BaseAction } from "./BaseAction.js";
import { EBaseDirection } from "./directions.js";

export class FocusAction extends BaseAction<ICanFocus<unknown>> {
  override getImplementationDetails<R>(visitor: ICanFocus<R>): R {
    return visitor.focus(this.direction)
  }

  constructor(private readonly direction: EBaseDirection) {
    super()
  }
}


export interface ICanFocus<R> {
  focus(focusDirection: EBaseDirection): R
}
