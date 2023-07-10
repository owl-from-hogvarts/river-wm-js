import { RiverctlFeatures } from "./executers/CommandMapper";
import { RiverctlExecuter } from "./executers/RiverctlExecuter";
import { Color } from "./object-model/Color";
import { EAttachMode, EFocusFollowCursor, River, RiverModesDefinition, RiverOptions } from "./object-model/River";
import { ETagAction, ETagActionScope, TagAction, mapTags } from "./object-model/Tags";
import { CloseAction } from "./object-model/actions/Close";
import { ExitAction } from "./object-model/actions/Exit";
import { FocusAction } from "./object-model/actions/Focus";
import { MoveAction } from "./object-model/actions/Move";
import { EAxis, ResizeAction } from "./object-model/actions/Resize";
import { SendLayoutCmd } from "./object-model/actions/SendLayoutCmd";
import { SpawnAction } from "./object-model/actions/Spawn";
import { SwapAction } from "./object-model/actions/Swap";
import { ToggleFloatAction } from "./object-model/actions/ToggleFloat";
import { ToggleFullscreen } from "./object-model/actions/ToggleFullscreen";
import { Zoom } from "./object-model/actions/Zoom";
import { EBaseDirection, EExtendedDirection } from "./object-model/actions/directions";
import { EEvents, ETapButtonMap, InputDevices } from "./object-model/input/input";
import { KeyBinding, Shortcut } from "./object-model/keyBindings/KeyBindings";
import { BaseMode } from "./object-model/keyBindings/Mode";
import { Alt, Ctrl, Shift, Super } from "./object-model/keyBindings/Modifier";
import { BTN_LEFT, BTN_RIGHT, EPointerCommand, PointerBinding, PointerShortcut } from "./object-model/keyBindings/PointerBindings";

const tileManager = "rivertile"

const tagKeySums = {
  "1": 0b1,
  "2": 0b10,
  "3": 0b100,
  "4": 0b1000,
  "5": 0b10000,
  "6": 0b100000,
}

function mapTagKeySum(keySum: string) {
  return tagKeySums[keySum as keyof typeof tagKeySums]
}

const defaultModeKeyBindings: KeyBinding<RiverctlFeatures>[] = [
  new KeyBinding(new FocusAction(EBaseDirection.PREVIOUS), new Shortcut([Super], "J")),
  new KeyBinding(new FocusAction(EBaseDirection.NEXT), new Shortcut([Super], "K")),
  new KeyBinding(new SwapAction(EBaseDirection.PREVIOUS), new Shortcut([Super, Shift], "J")),
  new KeyBinding(new SwapAction(EBaseDirection.NEXT), new Shortcut([Super, Shift], "K")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-ratio", "-0.02"]), new Shortcut([Super], "H")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-ratio", "+0.02"]), new Shortcut([Super], "L")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-count", "+1"]), new Shortcut([Super, Shift], "H")),
  new KeyBinding(new SendLayoutCmd(tileManager, ["main-count", "-1"]), new Shortcut([Super, Shift], "L")),
  new KeyBinding(new CloseAction(), new Shortcut([Super], "W")),
  new KeyBinding(new ToggleFullscreen(), new Shortcut([Super], "F")),
  new KeyBinding(new ToggleFloatAction(), new Shortcut([Super, Shift], "F"),),
  new KeyBinding(new SpawnAction("rofi", ["-show", "run"]), new Shortcut([Super], "R")),
  new KeyBinding(new SpawnAction("rofi", ["-show", "drun"]), new Shortcut([Super], "D")),
  new KeyBinding(new Zoom(), new Shortcut([Super], "Z")),
  new KeyBinding(new MoveAction(EExtendedDirection.LEFT), new Shortcut([Super, Alt], "H")),
  new KeyBinding(new MoveAction(EExtendedDirection.DOWN), new Shortcut([Super, Alt], "J")),
  new KeyBinding(new MoveAction(EExtendedDirection.UP), new Shortcut([Super, Alt], "K")),
  new KeyBinding(new MoveAction(EExtendedDirection.RIGHT), new Shortcut([Super, Alt], "L")),
  new KeyBinding(new ResizeAction(EAxis.HORIZONTAL, -100), new Shortcut([Super, Ctrl], "H")),
  new KeyBinding(new ResizeAction(EAxis.VERTICAL, -100), new Shortcut([Super, Ctrl], "J")),
  new KeyBinding(new ResizeAction(EAxis.VERTICAL, +100), new Shortcut([Super, Ctrl], "K")),
  new KeyBinding(new ResizeAction(EAxis.HORIZONTAL, +100), new Shortcut([Super, Ctrl], "L")),
  new KeyBinding(new SpawnAction("konsole", []), new Shortcut([Ctrl, Alt], "T")),
  new KeyBinding(new ExitAction(), new Shortcut([Super, Shift], "Q")),
  new KeyBinding(new CloseAction(), new Shortcut([Super], "W")),
  ...mapTags([Super], Object.getOwnPropertyNames(tagKeySums), TagAction.bind(null, ETagAction.SET, ETagActionScope.FOCUSED), mapTagKeySum),
  ...mapTags([Super, Ctrl], Object.getOwnPropertyNames(tagKeySums), TagAction.bind(null, ETagAction.SET, ETagActionScope.VIEW), mapTagKeySum),
  ...mapTags([Super, Shift], Object.getOwnPropertyNames(tagKeySums), TagAction.bind(null, ETagAction.TOGGLE, ETagActionScope.FOCUSED), mapTagKeySum),
  ...mapTags([Super, Alt], Object.getOwnPropertyNames(tagKeySums), TagAction.bind(null, ETagAction.TOGGLE, ETagActionScope.VIEW), mapTagKeySum),
]

const defaultModePointerBindings: PointerBinding<RiverctlFeatures>[] = [
  new PointerBinding(EPointerCommand.MOVE_VIEW, new PointerShortcut([Super], BTN_LEFT)),
  new PointerBinding(EPointerCommand.RESIZE_VIEW, new PointerShortcut([Super], BTN_RIGHT)),
]

const modes: RiverModesDefinition<RiverctlFeatures> = {
  specialModes: {
    DEFAULT_MODE: new BaseMode({keyboard: defaultModeKeyBindings, pointer: defaultModePointerBindings}),
    LOCK_MODE: new BaseMode({}),
  },
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
  tileManager,
  startupActions: [
    new SpawnAction("dbus-update-activation-environment", ["--systemd", "WAYLAND_DISPLAY", "XDG_CURRENT_DESKTOP=river", `XDG_CONFIG_DIRS`]),
    new SpawnAction("systemctl", ["--user", "import-environment", "WAYLAND_DISPLAY", "XDG_CONFIG_DIRS"]),
    new SpawnAction("systemctl", ["--user", "set-environment", "XDG_CURRENT_DESKTOP=river", /* `XDG_CONFIG_DIRS=${process.env["XDG_CONFIG_DIRS"]}:/etc/xdg` */])
  ]
})

const riverctl = new RiverctlExecuter();
riverctl.apply(river)


