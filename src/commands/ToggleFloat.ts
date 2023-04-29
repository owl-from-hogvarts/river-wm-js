import { BaseCommand } from "./BaseCommand";

/** Makes focused view either floating or tiled */
export class ToggleFloat extends BaseCommand {
  override command: string = "toggle-float"

  override readonly args: string[] = []
}