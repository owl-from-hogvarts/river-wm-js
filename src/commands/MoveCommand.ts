import { BaseCommand } from "./BaseCommand";

export enum MoveDirection {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down",
}

export class MoveCommand extends BaseCommand {
  override command: string = "move";

  override get args(): string[] {
    return [this.direction, this.step.toString()]
  }

  constructor(private readonly direction: MoveDirection, private readonly step: number = 100) {
    super()
  };
}
