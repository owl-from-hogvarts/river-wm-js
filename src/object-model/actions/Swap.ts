import { BaseAction } from "./BaseAction";

export enum SwapDirection {
  PREVIOUS,
  NEXT
}

export class SwapAction extends BaseAction<ICanSwap<unknown>> {
  override getImplementationDetails<R>(visitor: ICanSwap<R>): R {
    return visitor.swap(this.direction)
  }
  constructor(private readonly direction: SwapDirection) {
    super()
  }
}


export interface ICanSwap<R> {
  swap(swapDirection: SwapDirection): R
}
