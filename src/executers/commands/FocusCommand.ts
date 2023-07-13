import { EBaseDirection } from "../../object-model/actions/directions.js";
import { BaseCommand } from "./Command.js";
import { BaseDirectionMap } from "./directionMap.js";

export class FocusCommand extends BaseCommand {
  override readonly command: string = "focus-view";
  override args: string[];

  constructor(direction: EBaseDirection) {
    super()

    this.args = [BaseDirectionMap[direction]]
  }
}