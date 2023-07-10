import { EKeyBindingFlags, Shortcut } from "../../object-model/keyBindings/KeyBindings";
import { Modifier } from "../../object-model/keyBindings/Modifier";
import { BaseCommand } from "./Command";

export type MapDescription = {
  modeName: string,
  shortcut: Shortcut,
  cmd: BaseCommand,
}

export class MapCommand extends BaseCommand {
  override command = "map";
  private readonly baseArguments; 

  constructor(private readonly mapDescription: MapDescription) {
    super();
    this.formatModifiers = this.formatModifiers.bind(this);

    this.baseArguments = [
      this.mapDescription.modeName,
      this.mapDescription.shortcut.getModifiersFormatted(this.formatModifiers),
      this.mapDescription.shortcut.key,
      this.mapDescription.cmd.command,
      ...this.mapDescription.cmd.args
    ];
  }


  override get args(): string[] {
    const commandArgs = []
    
    const { shortcut } = this.mapDescription;

    if (shortcut.flag) {
      commandArgs.push(shortcut.flag.kind)

      if (shortcut.flag.kind === "layout") {
        commandArgs.push(shortcut.flag.index.toFixed())
      }
    }

    return [...commandArgs, ...this.baseArguments]
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
