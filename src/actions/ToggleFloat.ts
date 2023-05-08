import { BaseAction } from "./BaseAction";

/** Makes focused view either floating or tiled */
export class ToggleFloat extends BaseAction {
  override command: string = "toggle-float"

  override readonly args: string[] = []
}