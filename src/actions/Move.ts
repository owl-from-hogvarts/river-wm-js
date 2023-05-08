import { BaseAction } from "./BaseAction";

export enum MoveDirection {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down",
}

export class MoveAction extends BaseAction {
  constructor(public readonly direction: MoveDirection, public readonly step: number = 100) {
    super()
  };
}
