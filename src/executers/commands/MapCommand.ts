import { Shortcut } from "../../object-model/keyBindings/KeyBindings";
import { Modifier } from "../../object-model/keyBindings/Modifier";
import { BaseCommand } from "./Command";

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
      this.cmd.command,
      ...this.cmd.args
    ];
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
