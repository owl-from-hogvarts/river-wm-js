import { BaseCommand } from "./BaseCommand";

export class SendLayoutCmdCommand extends BaseCommand {
  override command: string = "send-layout-cmd"

  override get args(): string[] {
    return [this.layoutName, this.layoutCommand]
  }

  constructor(private readonly layoutName: string, private readonly layoutCommand: string) {
    super()
  }
}