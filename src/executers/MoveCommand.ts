import { BaseAction } from "../actions/BaseAction";
import { MoveAction } from "../actions/Move";
import { BaseCommand } from "./Command";

export class MoveCommand extends BaseCommand {
  override command: string = "move";
  override get args(): string[] {
    return [this.moveAction.direction, this.moveAction.step.toString()];
  }

  constructor(private readonly moveAction: MoveAction) {
    super();

  }
  
}

// export class MoveCommandFactory implements ICommandFactory {
//   tryBuildFrom(action: BaseAction): BaseCommand | null {
//     if (action instanceof MoveAction) {
//       return new MoveCommand(action);
//     }
//     return null;
//   }
  
// }

