import { KeyBinding } from "./keyBindings/KeyBinding";
import { Modifier } from "./keyBindings/Modifier";
import { BaseCommand } from "../BaseCommand";
import { Mode } from "./keyBindings/Mode";
import { ICommand } from "../ICommand";
import { DeclareMode } from "../DeclareMode";

export class MapCommand extends BaseCommand {
  command = "map";

  static commandsForMode(mode: Mode) {
    const commands: ICommand[] = []
    const modeDeclaration = new DeclareMode(mode.name)

    commands.push(modeDeclaration)

    for (const keyBinding of mode.keyBindings) {
      const mapCommand = new MapCommand(mode.name, keyBinding);

      commands.push(mapCommand)
    }

    return commands;
  }

  private constructor(
    private readonly modeName: string,
    private readonly keyBinding: KeyBinding
  ) {
    super();
    this.formatModifiers = this.formatModifiers.bind(this);
  }

  get args(): string[] {
    return [
      this.modeName,
      this.keyBinding.getModifiersFormatted(this.formatModifiers),
      this.keyBinding.key,
      this.keyBinding.command.toString(),
    ];
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
