import { BaseCommand } from "./Command";

export class EnterModeCommand extends BaseCommand {
  override readonly command: string = "enter-mode";
  private readonly modeName;

  override get args(): string[] {
    return [this.modeName];
  }

  /** Use `Mode` when possible not just plain string */
  constructor(mode: string) {
    super();
    this.modeName = mode;
    return;
  }
}
