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

import { EBaseDirection, EExtendedDirection } from "../../object-model/actions/directions.js";

export const BaseDirectionMap = {
  [EBaseDirection.PREVIOUS]: "previous",
  [EBaseDirection.NEXT]: "next"
}

export const ExtendedDirectionMap = {
  [EExtendedDirection.DOWN]: "down",
  [EExtendedDirection.LEFT]: "left",
  [EExtendedDirection.RIGHT]: "right",
  [EExtendedDirection.UP]: "up"
}
