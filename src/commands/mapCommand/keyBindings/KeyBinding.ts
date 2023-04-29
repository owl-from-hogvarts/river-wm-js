import { SpawnCommand } from "../../SpawnCommand";
import { ICommand } from "../../ICommand";
import { Modifier, Shift } from "./Modifier";
import { IModifiersFormatter } from "./IModifiersFormatter";

export class KeyBinding {
  
  constructor(public readonly name: string, public readonly command: ICommand, public readonly modifiers: Modifier[], public readonly key: string) {
  }

  getModifiersFormatted(format: IModifiersFormatter): string {
    return format(this.modifiers)
  }
}

