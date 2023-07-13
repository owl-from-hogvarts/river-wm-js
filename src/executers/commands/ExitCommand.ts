import { BaseCommand } from "./Command.js";


export class ExitCommand extends BaseCommand {
  override command: string = "exit";
  override args: string[] = [];

}
