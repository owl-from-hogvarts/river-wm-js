import { BaseCommand } from "./BaseCommand";
import { ICommand } from "./ICommand";

export class SpawnCommand extends BaseCommand implements ICommand {

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
