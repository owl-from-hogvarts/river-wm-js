import { BaseAction } from "./BaseAction";

export enum MoveDirection {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down",
}

export class MoveAction extends BaseAction<ICanMove<unknown>> {
  override getImplementationDetails<R>(visitor: ICanMove<R>): R {
    return visitor.move(this.direction)
  }
  constructor(public readonly direction: MoveDirection, public readonly step: number = 100) {
    super()
  };
}

export interface ICanMove<R> { 
  move(moveDirection: MoveDirection): R
}

