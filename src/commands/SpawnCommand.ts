import { ICommand } from "./ICommand";
import * as cp from "node:child_process"
import {promisify} from "node:util"

export class SpawnCommand implements ICommand {
  public readonly name?: string; // useful for debugging

  constructor(name: string | null, public readonly exec: string, public readonly args: string[]) {
    this.name = name ?? exec
  }

  toCommandString(): string {
    return `${this.exec} ${this.args.join(" ")}`
  }
}