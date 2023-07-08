import { Output } from "../../object-model/actions/Output";
import { BaseCommand } from "./Command";
import { BaseDirectionMap, ExtendedDirectionMap } from "./directionMap";

function mapOutput(output: Output): string {
  switch (output.kind) {
    case "base": {
      return BaseDirectionMap[output.direction]
    }
    case "extended": {
      return ExtendedDirectionMap[output.direction]
    }
    case "output_name": {
      return output.name
    }
  }
}

export class FocusOutputCommand extends BaseCommand {
  override readonly command: string = "focus-output";
  override args: string[] = [];

  constructor(output: Output) {
    super();
    this.args.push(mapOutput(output))
  }
}

export class SendToOutputCommand extends BaseCommand {
  override readonly command: string = "send-to-output";
  override args: string[] = [];

  constructor(output: Output) {
    super();
    this.args.push(mapOutput(output))
  }
}
