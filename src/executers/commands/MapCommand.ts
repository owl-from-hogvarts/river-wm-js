import { EKeyBindingFlags, Shortcut } from "../../object-model/keyBindings/KeyBindings";
import { Modifier } from "../../object-model/keyBindings/Modifier";
import { BaseCommand } from "./Command";

type MapDescription = {
  modeName: string,
  shortcut: Shortcut,
  cmd: BaseCommand,
  flag?: EKeyBindingFlags
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
    
    if (this.mapDescription.flag) {
      commandArgs.push(this.mapDescription.flag.kind)

      if (this.mapDescription.flag.kind === "layout") {
        commandArgs.push(this.mapDescription.flag.index.toFixed())
      }
    }

    return [...commandArgs, ...this.baseArguments]
  }

  private formatModifiers(modifiers: Modifier[]): string {
    return modifiers.join("+");
  }
}
