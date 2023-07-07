import { RiverctlFeatures } from "./executers/CommandMapper";
import { RiverctlExecuter } from "./executers/RiverctlExecuter";
import { Color } from "./object-model/Color";
import { EAttachMode, EFocusFollowCursor, River, RiverModesDefinition, RiverOptions } from "./object-model/River";
import { FocusAction, FocusDirection } from "./object-model/actions/Focus";
import { SendLayoutCmd } from "./object-model/actions/SendLayoutCmd";
import { SpawnAction } from "./object-model/actions/Spawn";
import { SwapAction, SwapDirection } from "./object-model/actions/Swap";
import { ToggleFloatAction } from "./object-model/actions/ToggleFloat";
import { EEvents, ETapButtonMap, InputDevices } from "./object-model/input/input";
import { KeyBinding, Shortcut } from "./object-model/keyBindings/KeyBindings";
import { BaseMode } from "./object-model/keyBindings/Mode";
import { Shift, Super } from "./object-model/keyBindings/Modifier";

const tileManager = "rivertile"

const defaultModeKeyBindings: KeyBinding<RiverctlFeatures>[] = [
  new KeyBinding(new FocusAction(FocusDirection.PREVIOUS), new Shortcut([Super], "J")),
  new KeyBinding(new FocusAction(FocusDirection.NEXT), new Shortcut([Super], "K")),
  new KeyBinding(new SwapAction(SwapDirection.PREVIOUS), new Shortcut([Super, Shift], "J")),
  new KeyBinding(new SwapAction(SwapDirection.NEXT), new Shortcut([Super, Shift], "K")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-ratio", "-0.02"]), new Shortcut([Super], "H")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-ratio", "+0.02"]), new Shortcut([Super], "L")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-count", "+1"]), new Shortcut([Super, Shift], "H")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-count", "-1"]), new Shortcut([Super, Shift], "L")),
  new KeyBinding(new ToggleFloatAction(), new Shortcut([Super], "Space"),),
  new KeyBinding(new SpawnAction("rofi", ["-show", "run"]), new Shortcut([Super], "D")),
]

const modes: RiverModesDefinition<RiverctlFeatures> = {
  DEFAULT_MODE: new BaseMode(defaultModeKeyBindings),
  LOCK_MODE: new BaseMode([]),
  otherModes: []
}

const options: RiverOptions = {
  theme: {
    borderWidth: 2,
    borderColorFocused: new Color("0xeceff4"),
    borderColorUnfocused: new Color("0x81a1c1"),
    borderColorUrgent: new Color("0xbf616a"),
    backgroundColor: new Color("0x2e3440")
  },
  focusFollowsCursor: EFocusFollowCursor.NORMAL,
  attachMode: EAttachMode.BOTTOM,
}

const inputDevices: InputDevices = {
  "pointer-1267-12608-MSFT0001:01_04F3:3140_Touchpad": {
    events: EEvents.DISABLED_ON_EXTERNAL_MOUSE,
    drag: true,
    tap: true,
    tapButtonMap: ETapButtonMap.LEFT_RIGHT_MIDDLE,
    disableWhileTyping: true,
    scrollMethod: {kind: "two-finger"}
  }
}

const river = new River(modes, options, {
  input: inputDevices,
  tileManager
})

const riverctl = new RiverctlExecuter();
riverctl.apply(river)


