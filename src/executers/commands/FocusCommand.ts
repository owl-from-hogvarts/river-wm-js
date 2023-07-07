import { EBaseDirection } from "../../object-model/actions/directions";
import { BaseCommand } from "./Command";
import { BaseDirectionMap } from "./directionMap";

export class FocusCommand extends BaseCommand {
  override readonly command: string = "focus-view";
  override args: string[];

  constructor(direction: EBaseDirection) {
    super()

    this.args = [BaseDirectionMap[direction]]
  }
}