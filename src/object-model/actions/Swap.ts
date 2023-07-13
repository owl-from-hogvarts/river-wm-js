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
import { EBaseDirection } from "./directions.js";

export class SwapAction extends BaseAction<ICanSwap<unknown>> {
  override getImplementationDetails<R>(visitor: ICanSwap<R>): R {
    return visitor.swap(this.direction)
  }
  constructor(private readonly direction: EBaseDirection) {
    super()
  }
}


export interface ICanSwap<R> {
  swap(swapDirection: EBaseDirection): R
}
