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

export enum EAxis {
  HORIZONTAL,
  VERTICAL
}

export class ResizeAction extends BaseAction<ICanResize<unknown>> {
  constructor(private readonly axis: EAxis, private readonly step: number) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanResize<R>): R {
    return visitor.resize(this.axis, this.step)
  }

}

export interface ICanResize<R> {
  resize(direction: EAxis, step: number): R
}

