import { EBaseDirection } from "../../object-model/actions/directions.js";
import { BaseCommand } from "./Command.js";
import { BaseDirectionMap } from "./directionMap.js";

export class SwapCommand extends BaseCommand {
  override readonly command: string = "swap";
  override args: string[];

  constructor(swapDirection: EBaseDirection) {
    super()
    this.args = [BaseDirectionMap[swapDirection]]
  }
}
