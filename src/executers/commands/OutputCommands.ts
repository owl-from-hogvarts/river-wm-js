/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import { Output } from "../../object-model/actions/Output.js";
import { BaseCommand } from "./Command.js";
import { BaseDirectionMap, ExtendedDirectionMap } from "./directionMap.js";

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
