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
import { EBaseDirection, EExtendedDirection } from "./directions.js";

interface BASE_DIRECTION_OUTPUT {
  kind: "base",
  direction: EBaseDirection
}

interface EXTENDED_DIRECTION_OUTPUT {
  kind: "extended",
  direction: EExtendedDirection
}

interface OUTPUT_NAME {
  kind: "output_name",
  name: string
}

export type EFocusOutputDirection = BASE_DIRECTION_OUTPUT | EXTENDED_DIRECTION_OUTPUT | OUTPUT_NAME

export type Output = EFocusOutputDirection

export class FocusOutputAction extends BaseAction<ICanFocusOutput<unknown>> {
  constructor(private readonly output: Output) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanFocusOutput<R>): R {
    return visitor.focusOutput(this.output)
  }

}

export interface ICanFocusOutput<R> {
  focusOutput(output: Output): R
} 


export class SendToOutputAction extends BaseAction<ICanSendToOutput<unknown>> {
  constructor(private readonly output: Output) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanSendToOutput<R>): R {
    return visitor.sendToOutput(this.output)
  }

}

export interface ICanSendToOutput<R> {
  sendToOutput(output: Output): R
}

