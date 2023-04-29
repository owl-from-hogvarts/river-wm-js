import { BaseCommand } from "./BaseCommand";

export enum SwapDirection {
  PREVIOUS = "previous",
  NEXT = "next"
}

export class SwapCommand extends BaseCommand {
  override command: string = "swap"

  override get args() {
    return [this.direction]
  }
  constructor(private readonly direction: SwapDirection) {
    super()
  }
}