import { ICommand } from "./ICommand";

export class SpawnCommand implements ICommand {

  constructor(
    private readonly execCommand: string,
    public readonly name: string,
  ) {}

  readonly command: string = "spawn"
  get args() {
    return [this.execCommand]
  }
}
