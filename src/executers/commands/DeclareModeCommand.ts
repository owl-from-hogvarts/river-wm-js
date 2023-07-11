import { BaseCommand } from "./Command";

export class DeclareModeCommand extends BaseCommand {
  override command: string = "declare-mode"
  constructor(private readonly modeName: string) {
    super()
  }

  override get args(): string[] {
    return [this.modeName]
  }
}