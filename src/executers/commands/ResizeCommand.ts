import { EAxis } from "../../object-model/actions/Resize";
import { BaseCommand } from "./Command";

const AxisMap = {
  [EAxis.HORIZONTAL]: "horizontal",
  [EAxis.VERTICAL]: "vertical",
}

export class ResizeCommand extends BaseCommand {
  override readonly command: string = "resize";
  override args: string[] = [];

  constructor(axis: EAxis, step: number) {
    super()
    this.args.push(AxisMap[axis], step.toFixed(0))
  }

}
