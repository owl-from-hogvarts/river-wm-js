import { ICommand } from "./ICommand";

export abstract class BaseCommand implements ICommand {
  abstract command: string;
  abstract args: string[];

  public toCommandString(): string {
    return [this.command, ...this.args].join(" ")
  }

}