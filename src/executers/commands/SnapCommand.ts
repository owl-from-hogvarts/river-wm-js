import { EExtendedDirection } from "../../object-model/actions/directions.js";
import { BaseCommand } from "./Command.js";
import { ExtendedDirectionMap } from "./directionMap.js";

export class SnapCommand extends BaseCommand {
  override readonly command: string = "snap";
  override args: string[] = [];
  
  constructor(direction: EExtendedDirection) {
    super()
    this.args.push(ExtendedDirectionMap[direction]);
  }
}
