import { SpawnCommand } from "../../SpawnCommand";
import { ICommand } from "../../ICommand";
import { Modifier, Shift } from "./Modifier";
import { IModifiersFormatter } from "./IModifiersFormatter";

export class Shortcut {
  constructor(
    public readonly modifiers: Modifier[],
    public readonly key: string
  ) {}

  getModifiersFormatted(format: IModifiersFormatter): string {
    return format(this.modifiers);
  }
}

