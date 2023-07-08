import { BaseCommand } from "./Command";


export class ToggleFullscreenCommand extends BaseCommand {
  override readonly command: string = "toggle-fullscreen";
  override args: string[] = [];

}
