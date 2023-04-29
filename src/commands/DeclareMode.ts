import { BaseCommand } from "./BaseCommand";

export class DeclareMode extends BaseCommand {
  override command: string = "declare-mode"
  constructor(private readonly modeName: string) {
    super()
  }

  override get args(): string[] {
    return [this.modeName]
  }
}