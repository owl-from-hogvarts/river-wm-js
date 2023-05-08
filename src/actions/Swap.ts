import { BaseAction } from "./BaseAction";

export enum SwapDirection {
  PREVIOUS = "previous",
  NEXT = "next"
}

export class SwapCommand extends BaseAction {
  override command: string = "swap"

  override get args() {
    return [this.direction]
  }
  constructor(private readonly direction: SwapDirection) {
    super()
  }
}