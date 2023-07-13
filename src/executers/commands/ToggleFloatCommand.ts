import { BaseCommand } from "./Command.js";

export class ToggleFloatCommand extends BaseCommand {
  override readonly command: string = "toggle-float";
  override args: string[] = [];
}
