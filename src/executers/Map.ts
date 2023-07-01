import { Modifier } from "../object-model/keyBindings/Modifier";
import { BaseCommand } from "./Command";
import { KeyBinding } from "../object-model/keyBindings/Mode";
import { Shortcut } from "../object-model/keyBindings/Shortcut";

export class MapCommand extends BaseCommand {
  override command = "map";

  constructor(
    private readonly modeName: string,
    private readonly shortcut: Shortcut,
    private readonly cmd: BaseCommand
  ) {
    super();
    this.formatModifiers = this.formatModifiers.bind(this);
  }

  override get args(): string[] {
    return [
      this.modeName,
      this.shortcut.getModifiersFormatted(this.formatModifiers),
      this.shortcut.key,
      this.cmd.toCommandString()
    ];
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
