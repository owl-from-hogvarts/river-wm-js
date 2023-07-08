import { EExtendedDirection } from "../../object-model/actions/directions";
import { BaseCommand } from "./Command";
import { ExtendedDirectionMap } from "./directionMap";

export class SnapCommand extends BaseCommand {
  override readonly command: string = "snap";
  override args: string[] = [];
  
  constructor(direction: EExtendedDirection) {
    super()
    this.args.push(ExtendedDirectionMap[direction]);
  }
}
