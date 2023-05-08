import { Color } from "./Color";
import { BaseMode, SwitchableMode } from "./keyBindings/Mode";

export type RiverModesDefinition = {
  DEFAULT_MODE?: BaseMode;
  LOCK_MODE?: BaseMode;
  otherModes: SwitchableMode[]
};

export class River {
  constructor(
    public readonly modes: RiverModesDefinition,
    public readonly options: RiverOptions
  ) {}
}

enum AttachMode {
  TOP,
  BOTTOM,
}

type RiverOptions = Partial<{
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
