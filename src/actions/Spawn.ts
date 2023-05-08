import { BaseCommand } from "../executers/Command";
import { BaseAction } from "./BaseAction";

export class SpawnCommand extends BaseAction {

  constructor(
    private readonly execCommand: string,
    public readonly name: string,
  ) {
    super()
  }

  override readonly command: string = "spawn"
  get args() {
    return [this.execCommand]
  }
}
