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

import { InputDevices } from "./input/input.js";
import { ICanEnterMode } from "./actions/EnterMode.js";
import { ICanFocus } from "./actions/Focus.js";
import { ICanMove } from "./actions/Move.js";
import { ICanSendLayoutCmd } from "./actions/SendLayoutCmd.js";
import { ICanSpawn } from "./actions/Spawn.js";
import { ICanSwap } from "./actions/Swap.js";
import { ICanToggleFloat } from "./actions/ToggleFloat.js";
import { Color } from "./Color.js";
import { NamedMode } from "./keyBindings/Mode.js";
import { ICanClose } from "./actions/Close.js";
import { ICanSnap } from "./actions/Snap.js";
import { ICanToggleFullscreen } from "./actions/ToggleFullscreen.js";
import { ICanZoom } from "./actions/Zoom.js";
import { ICanFocusOutput, ICanSendToOutput } from "./actions/Output.js";
import { ICanResize } from "./actions/Resize.js";
import { ICanExit } from "./actions/Exit.js";
import { BaseAction } from "./actions/BaseAction.js";
import { ICanTag } from "./actions/Tags.js";

export type FullFeatures<T> = ICanEnterMode<T> &
  ICanFocus<T> &
  ICanMove<T> &
  ICanSpawn<T> &
  ICanSwap<T> &
  ICanToggleFloat<T> &
  ICanSendLayoutCmd<T> &
  ICanClose<T> &
  ICanSnap<T> &
  ICanToggleFullscreen<T> &
  ICanZoom<T> &
  ICanFocusOutput<T> &
  ICanSendToOutput<T> &
  ICanClose<T> &
  ICanResize<T> &
  ICanExit<T> &
  ICanTag<T>;

export type RiverModesDefinition<T> = {
  specialModes?: {
    DEFAULT_MODE?: NamedMode<T, "normal">;
    LOCK_MODE?: NamedMode<T, "locked">;
  }
  // too complicated to do this the "right" way
  otherModes: (NamedMode<T>)[];
};

export class River<Features> {
  public readonly tileManager?: string
  public readonly input?: InputDevices
  public readonly startupActions?: BaseAction<Features>[]
  
  constructor(
    public readonly modes: RiverModesDefinition<Features>,
    public readonly options: RiverOptions,
    {tileManager, input, startupActions}: {tileManager?: string,
    input?: InputDevices, startupActions?: BaseAction<Features>[]} = {}
  ) {
    this.tileManager = tileManager,
    this.input = input
    this.startupActions = startupActions
  }
}

export enum EAttachMode {
  TOP,
  BOTTOM,
}

export enum EFocusFollowCursor {
  DISABLED,
  NORMAL,
  ALWAYS
}

export type THideCursor = Partial<{
  timeout: number,
  whenTyping: boolean
}>

type Filter = {
  id: string[],
  title: string[]
}

export type RiverOptions = Partial<{
  filter: {
    clientSideDecorations: Filter,
    float: Filter
  }
  attachMode: EAttachMode;
  theme: Partial<{
    borderWidth: number;
    borderColorFocused: Color;
    borderColorUnfocused: Color;
    borderColorUrgent: Color;
    cursor: {
      cursorTheme: string;
      size?: number;
    };
    backgroundColor: Color;
  }>;
  focusFollowsCursor: EFocusFollowCursor;
  /** Hide cursor when typing or after inactivity */
  hideCursor: THideCursor;
  repeat: {
    rate: number;
    delay: number;
  };
}>;
