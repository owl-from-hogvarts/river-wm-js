import { BaseCommand } from "./Command.js";


export class ZoomCommand extends BaseCommand {
  override readonly command: string = "zoom";
  override args: string[] = [];

}
