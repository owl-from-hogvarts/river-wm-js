import { MoveAction } from "../../object-model/actions/Move";
import { BaseCommand } from "./Command";
import { ExtendedDirectionMap } from "./directionMap";

export class MoveCommand extends BaseCommand {
  override command: string = "move";
  override get args(): string[] {
    return [ExtendedDirectionMap[this.moveAction.direction], this.moveAction.step.toString()];
  }

  constructor(private moveAction: MoveAction) {
    super();

  }
  
}
