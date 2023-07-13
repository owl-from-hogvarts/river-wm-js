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

import { BaseCommand } from "./Command.js";

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
