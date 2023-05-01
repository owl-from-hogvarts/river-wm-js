import { Shortcut } from "./keyBindings/Shortcut";
import { Modifier } from "./keyBindings/Modifier";
import { BaseCommand } from "../BaseCommand";
import { ICommand } from "../ICommand";

export class MapCommand extends BaseCommand {
  override command = "map";

  constructor(
    private readonly modeName: string,
    private readonly keyBinding: Shortcut,
    private readonly bindCommand: ICommand,
  ) {
    super();
    this.formatModifiers = this.formatModifiers.bind(this);
  }

  override get args(): string[] {
    return [
      this.modeName,
      this.keyBinding.getModifiersFormatted(this.formatModifiers),
      this.keyBinding.key,
      this.bindCommand.toCommandString()
    ];
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
