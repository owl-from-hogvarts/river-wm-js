import { BaseCommand } from "../executers/Command";
import { BaseAction } from "./BaseAction";

export class SpawnCommand extends BaseAction {
  override getImplementationDetails<R>(visitor: ICanSpawn<R>): R {
    return visitor.spawn(this.execCommand, this.args)
  }

  constructor(
    private readonly execCommand: string,
    private readonly args: string[]
  ) {
    super()
  }
}

export interface ICanSpawn<R> {
  spawn(command: string, args: string[]): R
}

