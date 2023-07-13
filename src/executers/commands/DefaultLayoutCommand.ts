import { BaseCommand } from "./Command.js";

export class DefaultLayout extends BaseCommand {
  override readonly command: string = "default-layout";
  override args: string[];

  constructor(tileManager: string) {
    super()
    this.args = [tileManager]
  }
}
