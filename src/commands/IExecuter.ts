import { IModifiersFormatter } from "./mapCommand/keyBindings/IModifiersFormatter";
import { ICommand } from "./ICommand";

export interface IExecuter {
  execute(command: ICommand): void;
}
