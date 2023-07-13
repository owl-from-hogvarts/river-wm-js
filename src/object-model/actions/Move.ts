import { BaseAction } from "./BaseAction.js";
import { EExtendedDirection } from "./directions.js";

export class MoveAction extends BaseAction<ICanMove<unknown>> {
  override getImplementationDetails<R>(visitor: ICanMove<R>): R {
    return visitor.move(this)
  }
  constructor(public readonly direction: EExtendedDirection, public readonly step: number = 100) {
    super()
  };
}

export interface ICanMove<R> { 
  move(moveAction: MoveAction): R
}

