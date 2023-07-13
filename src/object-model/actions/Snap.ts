import { BaseAction } from "./BaseAction.js";
import { EExtendedDirection } from "./directions.js";

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
