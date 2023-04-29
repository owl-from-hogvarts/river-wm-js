import { IExecuter } from "./IExecuter";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { ICommand } from "./ICommand";
import { IModifiersFormatter } from "./mapCommand/keyBindings/IModifiersFormatter";
import { Modifier } from "./mapCommand/keyBindings/Modifier";

export class RiverctlExecuter implements IExecuter {
  private static readonly RIVER_CONFIG_COMMAND = 'riverctl'

  execute(command: ICommand): void {
    promisify(execFile)(RiverctlExecuter.RIVER_CONFIG_COMMAND, [command.command, ...command.args])
  }

}