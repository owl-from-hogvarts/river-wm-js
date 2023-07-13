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

import { Modifier } from "../../object-model/keyBindings/Modifier.js";
import {
  EPointerCommand,
} from "../../object-model/keyBindings/PointerBindings.js";
import { KeyboardShortcut, PointerShortcut } from "../../object-model/keyBindings/Shortcut.js";
import { BaseCommand } from "./Command.js";

export type MapDescription = {
  mode: string;
  shortcut: KeyboardShortcut;
  cmd: BaseCommand;
};

function formatModifiers(modifiers: Modifier[]): string {
  return modifiers.join("+");
}

export class MapCommand extends BaseCommand {
  override readonly command: string = "map";
  private readonly baseArguments;

  constructor(private readonly mapDescription: MapDescription) {
    super();
    this.baseArguments = [
      this.mapDescription.mode,
      this.mapDescription.shortcut.getModifiersFormatted(formatModifiers),
      this.mapDescription.shortcut.key,
      this.mapDescription.cmd.command,
      ...this.mapDescription.cmd.args,
    ];
  }

  override get args(): string[] {
    const commandArgs = [];

    const { shortcut } = this.mapDescription;

    if (shortcut.flag) {
      commandArgs.push(shortcut.flag.kind);

      if (shortcut.flag.kind === "layout") {
        commandArgs.push(shortcut.flag.index.toFixed());
      }
    }

    return [...commandArgs, ...this.baseArguments];
  }
}

export const PointerCommandMap = {
  [EPointerCommand.MOVE_VIEW]: "move-view",
  [EPointerCommand.RESIZE_VIEW]: "resize-view",
};

export type MapPointerDescription = {
  mode: string;
  shortcut: PointerShortcut;
  cmd: BaseCommand | string;
};

export class MapPointerCommand extends BaseCommand {
  override readonly command: string = "map-pointer";
  override readonly args: string[] = [];

  constructor(description: MapPointerDescription) {
    super();
    const modifiers = formatModifiers(description.shortcut.modifiers);
    this.args.push(
      description.mode,
      modifiers,
      description.shortcut.key
    );

    if (typeof description.cmd === "string") {
      this.args.push(description.cmd);
      return;
    }

    this.args.push(description.cmd.command, ...description.cmd.args);
  }
}
