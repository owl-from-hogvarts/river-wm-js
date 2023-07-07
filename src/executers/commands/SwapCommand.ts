import { EBaseDirection } from "../../object-model/actions/directions";
import { BaseCommand } from "./Command";
import { BaseDirectionMap } from "./directionMap";

export class SwapCommand extends BaseCommand {
  override readonly command: string = "swap";
  override args: string[];

  constructor(swapDirection: EBaseDirection) {
    super()
    this.args = [BaseDirectionMap[swapDirection]]
  }
}
