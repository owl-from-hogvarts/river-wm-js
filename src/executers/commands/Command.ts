
const determinant = Symbol()

export abstract class BaseCommand implements ICommand {
  private [determinant]: undefined
  abstract command: string;
  abstract args: string[];

  public toCommandString(): string {
    return [this.command, ...this.args].join(" ")
  }

}

import { BaseAction } from "../../object-model/actions/BaseAction";

interface ICommand {
  readonly command: string;
  readonly args: string[];

  toCommandString(): string;
}

// export interface ICommandFactory {
//   tryBuildFrom(action: BaseAction): BaseCommand | null
// }
