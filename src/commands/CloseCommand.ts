import { BaseCommand } from "./BaseCommand";
import { ICommand } from "./ICommand";

/** Closes focused window */
export class CloseCommand extends BaseCommand implements ICommand {
  override command = "close" 
  override args: string[] = []
}