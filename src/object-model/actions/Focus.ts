import { BaseAction } from "./BaseAction";

export enum FocusDirection {
  NEXT,
  PREVIOUS
};

export class FocusAction extends BaseAction<ICanFocus<unknown>> {
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
