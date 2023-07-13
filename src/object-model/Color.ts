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



const colorRegex = /0x[0-9a-f]{6}/ui

export class Color {
  public readonly color: string;

  constructor(color: string) {
    if (!colorRegex.test(color)) {
      throw new Error(`wrong color string! expected something like "0x11aAFf" Got ${color}`)
    }

    this.color = color
  }
}

