import { BaseCommand } from "./Command";


export class ExitCommand extends BaseCommand {
  override command: string = "exit";
  override args: string[] = [];

}
