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

enum AttachMode {
  TOP,
  BOTTOM,
}

export type RiverOptions = Partial<{
  attachMode: AttachMode;
  theme: Partial<{
    borderWidth: number;
    borderColorFocused: Color;
    borderColorUnfocused: Color;
    borderColorUrgent: Color;
    cursor: {
      cursorTheme: string;
      size: number;
    };
    backgroundColor: string;
  }>;
  focusFollowsCursor: boolean;
  /** Hide cursor when typing or after inactivity */
  hideCursor: boolean;
  repeat: {
    rate: number;
    delay: number;
  };
}>;
