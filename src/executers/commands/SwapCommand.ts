import { SwapDirection as ESwapDirection } from "../../object-model/actions/Swap";
import { BaseCommand } from "./Command";

const swapDirectionMap: {
  [Key in ESwapDirection]: string
} = {
  [ESwapDirection.NEXT]: "next",
  [ESwapDirection.PREVIOUS]: "previous"
}

export class SwapCommand extends BaseCommand {
  override readonly command: string = "swap";
  override args: string[];

  constructor(swapDirection: ESwapDirection) {
    super()
    this.args = [swapDirectionMap[swapDirection]]
  }
}
