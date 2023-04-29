import { BaseCommand } from "./BaseCommand";
import { ICommand } from "./ICommand";
import { Mode } from "./mapCommand/keyBindings/Mode";

export class EnterMode extends BaseCommand implements ICommand {
  override readonly command: string = "enter-mode"
  private readonly modeName;

  override get args(): string[] {
    return [this.modeName]
  }

  /** Use `Mode` when possible not just plain string */
  constructor(mode: Mode | string) {
    super()
    if (typeof mode === "string") {
      this.modeName = mode
      return;
    } 

    this.modeName = mode.name;
  }
}