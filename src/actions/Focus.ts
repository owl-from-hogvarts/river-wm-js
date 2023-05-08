import { BaseCommand } from "../executers/Command";
import { BaseAction } from "./BaseAction";

export enum FocusDirection {
  NEXT = "next",
  PREVIOUS = "previous"
};

export class FocusCommand extends BaseAction {
  override command: string = "focus-view"

  override get args() {
    return [this.direction]
  }

  constructor(private readonly direction: FocusDirection) {
    super()
  }
}