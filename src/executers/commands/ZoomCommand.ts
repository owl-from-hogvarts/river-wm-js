import { BaseCommand } from "./Command";


export class ZoomCommand extends BaseCommand {
  override readonly command: string = "zoom";
  override args: string[] = [];

}
