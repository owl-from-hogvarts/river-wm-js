import { ICanEnterMode } from "./actions/EnterMode";
import { ICanFocus } from "./actions/Focus";
import { ICanMove } from "./actions/Move";
import { ICanSpawn } from "./actions/Spawn";
import { ICanSwap } from "./actions/Swap";
import { ICanToggleFloat } from "./actions/ToggleFloat";
import { Color } from "./Color";
import { BaseMode, SwitchableMode } from "./keyBindings/Mode";

export type FullFeatures<T> = ICanEnterMode<T> &
  ICanFocus<T> &
  ICanMove<T> &
  ICanSpawn<T> &
  ICanSwap<T> &
  ICanToggleFloat<T>;

export type RiverModesDefinition<T> = {
  DEFAULT_MODE?: BaseMode<T>;
  LOCK_MODE?: BaseMode<T>;
  otherModes: SwitchableMode<T>[];
};

export class River<Features> {
  constructor(
    public readonly modes: RiverModesDefinition<Features>,
    public readonly options: RiverOptions
  ) {}
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

export type RiverOptions = Partial<{
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
