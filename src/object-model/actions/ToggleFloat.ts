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

import { BaseAction } from "./BaseAction.js";

/** Makes focused view either floating or tiled */
export class ToggleFloatAction extends BaseAction<ICanToggleFloat<unknown>> {
  override getImplementationDetails<R>(visitor: ICanToggleFloat<R>): R {
    return visitor.toggleFloat()
  }
}

export interface ICanToggleFloat<R> {
  toggleFloat(): R
}

