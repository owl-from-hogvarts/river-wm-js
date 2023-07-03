import { BaseCommand } from "./Command";

export class ToggleFloatCommand extends BaseCommand {
  override readonly command: string = "toggle-float";
  override args: string[] = [];
}
