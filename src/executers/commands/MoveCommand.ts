import { MoveAction } from "../../object-model/actions/Move.js";
import { BaseCommand } from "./Command.js";
import { ExtendedDirectionMap } from "./directionMap.js";

export class MoveCommand extends BaseCommand {
  override command: string = "move";
  override get args(): string[] {
    return [ExtendedDirectionMap[this.moveAction.direction], this.moveAction.step.toString()];
  }

  constructor(private moveAction: MoveAction) {
    super();

  }
  
}
