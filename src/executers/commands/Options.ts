import { Color } from "../../object-model/Color";
import { EAttachMode, EFocusFollowCursor, THideCursor } from "../../object-model/River";
import { BaseCommand } from "./Command";

const AttachModeMap: {
  [key in EAttachMode]: string
} = {
  [EAttachMode.TOP]: "top",
  [EAttachMode.BOTTOM]: "bottom"
}

export class AttachMode extends BaseCommand {
  override command: string = "attach-mode";
  override args: string[];

  constructor(attachMode: EAttachMode) {
    super()
    // failsafe
    this.args = [AttachModeMap[attachMode] ?? "bottom"]
  }
}

export class BorderWidth extends BaseCommand {
  override command: string = "border-width";
  override args: string[];

  /** width in pixels */
  constructor(width: number) {
    super()
    this.args = [width.toFixed(0)]
  }
}


function borderColorVariant(variant: string) {
  const borderColorCommandPrefix = "border-color"
  return borderColorCommandPrefix + "-" + variant
}

export class BorderColorFocused extends BaseCommand {
  override readonly command: string = borderColorVariant("focused");
  override args: string[];

  constructor(color: Color) {
    super()
    this.args = [color.color]
  }
}

export class BorderColorUnfocused extends BaseCommand {
  override readonly command: string = borderColorVariant("unfocused");
  override args: string[];

  constructor(color: Color) {
    super()
    this.args = [color.color]
  }
}


export class BorderColorUrgent extends BaseCommand {
  override readonly command: string = borderColorVariant("urgent");
  override args: string[];

  constructor(color: Color) {
    super()
    this.args = [color.color]
  }
}

export class CursorTheme extends BaseCommand {
  override readonly command: string = "xcursor-theme";
  override args: string[];

  constructor(cursorTheme: string, size?: number) {
    super()
    this.args = [cursorTheme]

    if (size) {
      this.args.push(size.toFixed(0))
    }
  }
}

export class BackgroundColor extends BaseCommand {
  override readonly command: string = "background-color";
  override args: string[];

  constructor(color: Color) {
    super()
    this.args = [color.color];
  }
}

const FocusFollowsCursorMap: {
  [key in EFocusFollowCursor]: string
} = {
  [EFocusFollowCursor.ALWAYS]: "always",
  [EFocusFollowCursor.DISABLED]: "disabled",
  [EFocusFollowCursor.NORMAL]: "normal"
}

export class FocusFollowsCursor extends BaseCommand {
  override readonly command: string = "focus-follows-cursor";
  override args: string[];

  constructor(focusFollowsCursor: EFocusFollowCursor) {
    super()
    this.args = [FocusFollowsCursorMap[focusFollowsCursor] ?? "disabled"]
  }
}

export class HideCursor extends BaseCommand {
  override readonly command: string = "hide-cursor";
  override args: string[];

  constructor(hideCursor: number|boolean) {
    super()
    if (typeof hideCursor === "number") {
      this.args = ["timeout", hideCursor.toFixed(0)]
    }

    this.args = ["when-typing", hideCursor ? "enabled" : "disabled"]
  }
}

export class Repeat extends BaseCommand {
  override readonly command: string = "set-repeat";
  override args: string[];

  /** @param delay in milliseconds */
  constructor(rate: number, delay: number) {
    super()
    this.args = [rate.toFixed(0), delay.toFixed(0)]
  }
}

