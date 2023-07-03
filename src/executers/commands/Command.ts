
const determinant = Symbol()

export abstract class BaseCommand implements ICommand {
  private [determinant]: undefined
  readonly abstract command: string;
  abstract args: string[];

  public toCommandString(): string {
    return [this.command, ...this.args].join(" ")
  }

}

export class CustomCommand extends BaseCommand {
  override args: string[];
  constructor(override readonly command: string, ...args: string[]) {
    super()
    this.args = args
  }
}

interface ICommand {
  readonly command: string;
  readonly args: string[];

  toCommandString(): string;
}

// export interface ICommandFactory {
//   tryBuildFrom(action: BaseAction): BaseCommand | null
// }
