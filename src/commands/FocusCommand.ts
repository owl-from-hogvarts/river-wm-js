import { BaseCommand } from "./BaseCommand";

export enum FocusDirection {
  NEXT = "next",
  PREVIOUS = "previous"
};

export class FocusCommand extends BaseCommand {
  override command: string = "focus-view"

  override get args() {
    return [this.direction]
  }

  constructor(private readonly direction: FocusDirection) {
    super()
  }
}