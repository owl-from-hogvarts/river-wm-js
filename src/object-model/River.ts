import { InputDevices } from "./input/input";
import { ICanEnterMode } from "./actions/EnterMode";
import { ICanFocus } from "./actions/Focus";
import { ICanMove } from "./actions/Move";
import { ICanSendLayoutCmd } from "./actions/SendLayoutCmd";
import { ICanSpawn } from "./actions/Spawn";
import { ICanSwap } from "./actions/Swap";
import { ICanToggleFloat } from "./actions/ToggleFloat";
import { Color } from "./Color";
import { BaseMode, SwitchableMode } from "./keyBindings/Mode";
import { ICanClose } from "./actions/Close";
import { ICanSnap } from "./actions/Snap";
import { ICanToggleFullscreen } from "./actions/ToggleFullscreen";
import { ICanZoom } from "./actions/Zoom";
import { ICanFocusOutput, ICanSendToOutput } from "./actions/Output";
import { ICanResize } from "./actions/Resize";
import { ICanExit } from "./actions/Exit";
import { BaseAction } from "./actions/BaseAction";

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
  ICanExit<T>;

export type RiverModesDefinition<T> = {
  DEFAULT_MODE?: BaseMode<T>;
  LOCK_MODE?: BaseMode<T>;
  otherModes: SwitchableMode<T>[];
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
