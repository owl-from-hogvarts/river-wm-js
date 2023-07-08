import { BaseAction } from "./BaseAction";
import { EExtendedDirection } from "./directions";

export class Snap extends BaseAction<ICanSnap<unknown>> {
  constructor(private readonly direction: EExtendedDirection) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanSnap<R>): R {
    return visitor.snap(this.direction)
  }

}

export interface ICanSnap<R> {
  snap(direction: EExtendedDirection): R
}
