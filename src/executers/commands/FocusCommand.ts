import { FocusAction, FocusDirection as EFocusDirection } from "../../object-model/actions/Focus";
import { BaseCommand } from "./Command";

const focusDirectionMap: {
  [Key in EFocusDirection]: string
} = {
  [EFocusDirection.NEXT]: "next",
  [EFocusDirection.PREVIOUS]: "previous"
}

export class FocusCommand extends BaseCommand {
  override readonly command: string = "focus-view";
  override args: string[];

  constructor(direction: EFocusDirection) {
    super()

    this.args = [focusDirectionMap[direction]]
  }
}