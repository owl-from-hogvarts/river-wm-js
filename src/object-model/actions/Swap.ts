import { BaseAction } from "./BaseAction";
import { EBaseDirection } from "./directions";

export class SwapAction extends BaseAction<ICanSwap<unknown>> {
  override getImplementationDetails<R>(visitor: ICanSwap<R>): R {
    return visitor.swap(this.direction)
  }
  constructor(private readonly direction: EBaseDirection) {
    super()
  }
}


export interface ICanSwap<R> {
  swap(swapDirection: EBaseDirection): R
}
