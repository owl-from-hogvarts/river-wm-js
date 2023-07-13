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

import { BaseAction } from "../actions/BaseAction.js";
import { PointerShortcut } from "./Shortcut.js";

export const BTN_LEFT = "BTN_LEFT"
export const BTN_RIGHT = "BTN_RIGHT"
export const BTN_MIDDLE = "BTN_MIDDLE"

export enum EPointerCommand {
  MOVE_VIEW,
  RESIZE_VIEW
}

export class PointerBinding<T> {
  constructor(
    public readonly action: BaseAction<T> | EPointerCommand,
    public readonly shortcut: PointerShortcut
  ) {}
}

