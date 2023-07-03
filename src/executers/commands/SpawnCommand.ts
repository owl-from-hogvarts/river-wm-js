import { BaseCommand } from "./Command";

export class SpawnCommand extends BaseCommand {
  override command: string = "spawn";
  override args: string[];

  constructor(execCommand: string, args: string[]) {
    super()
    // pass into execFile as single argument
    const commandString = [execCommand, ...args].join(" ")
    this.args = [commandString]
  }
}
