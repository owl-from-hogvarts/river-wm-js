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


const determinant = Symbol()

export abstract class BaseCommand implements ICommand {
  private [determinant]: undefined
  readonly abstract command: string;
  abstract args: string[];

  public toCommandString(): string {
    return [this.command, ...this.args].join(" ")
  }

}

export class CustomCommand extends BaseCommand {
  override args: string[];
  constructor(override readonly command: string, ...args: string[]) {
    super()
    this.args = args
  }
}

interface ICommand {
  readonly command: string;
  readonly args: string[];

  toCommandString(): string;
}

// export interface ICommandFactory {
//   tryBuildFrom(action: BaseAction): BaseCommand | null
// }
