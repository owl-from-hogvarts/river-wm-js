import { BaseCommand } from "../../executers/Command";
import { BaseAction } from "./BaseAction";

export enum FocusDirection {
  NEXT = "next",
  PREVIOUS = "previous"
};

export class FocusCommand extends BaseAction<ICanFocus<unknown>> {
  override getImplementationDetails<R>(visitor: ICanFocus<R>): R {
    return visitor.focus(this.direction)
  }

  constructor(private readonly direction: FocusDirection) {
    super()
  }
}


export interface ICanFocus<R> {
  focus(focusDirection: FocusDirection): R
}
