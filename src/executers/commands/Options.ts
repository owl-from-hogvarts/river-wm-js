import { Color } from "../../object-model/Color";
import {
  EAttachMode,
  EFocusFollowCursor,
  RiverOptions,
  THideCursor,
} from "../../object-model/River";
import { BaseCommand } from "./Command";

// T - actual river options, V - mapped functions
type OptionMapper<T> = {
  [Key in keyof T]: T[Key] extends
    | Color
    | number
    | string
    | THideCursor
    | undefined
    ? (arg: T[Key]) => BaseCommand
    : OptionMapper<T[Key]>;
};

// if key of T is present in D, then it is not substituted with function
type OptionMapperV2<T, D extends Partial<T>> = {
  [Key in keyof T]: Key extends keyof D
    ? D[Key] extends object
      ? OptionMapperV2<T[Key], D[Key]>
      : new (arg: T[Key]) => BaseCommand
    : new (arg: T[Key]) => BaseCommand;
};

type OptionMapperV3<T> = {
  [Key in keyof T]: Exclude<T[Key], undefined | null> extends {}
    ? OptionMapperV3<T[Key]> | ((arg: T[Key]) => BaseCommand)
    : (arg: T[Key]) => BaseCommand;
};

type helper<T, Recurse, R> = T extends object ? (T extends any[] ? (new (arg: T[number]) => R) : Recurse | (new (arg: T) => R)) : (new (arg: T) => R);

export type OptionMapperV4<T extends object> = {
   [Key in keyof T]-?: helper<Exclude<T[Key], undefined | null>, OptionMapperV4<Exclude<T[Key], undefined | null>>, BaseCommand>
};

export function mapOptionsToCommands<T extends {[key: string]: any}>(options: T, commandMap: OptionMapperV4<T>) {
  const commands: BaseCommand[] = []
  
  for (const key in options) {
    const maybeConstructor = commandMap[key]

    if (options[key] === null || options[key] === undefined) {
      continue;
    }

    if (typeof maybeConstructor === "function") {
      const CommandConstructor = <new (arg: T[keyof T]) => BaseCommand>maybeConstructor;
      commands.push(new CommandConstructor(options[key]))
      continue
    } 
    
    if (typeof options[key] === "object") {
      commands.push(...mapOptionsToCommands(options[key], <OptionMapperV4<typeof options[typeof key]>>commandMap[key]))
    }
  }

  return commands
}

const AttachModeMap: {
  [key in EAttachMode]: string;
} = {
  [EAttachMode.TOP]: "top",
  [EAttachMode.BOTTOM]: "bottom",
};

export class AttachMode extends BaseCommand {
  override command: string = "attach-mode";
  override args: string[];

  constructor(attachMode: EAttachMode) {
    super();
    // failsafe
    this.args = [AttachModeMap[attachMode] ?? "bottom"];
  }
}

export class BorderWidth extends BaseCommand {
  override command: string = "border-width";
  override args: string[];

  /** width in pixels */
  constructor(width: number) {
    super();
    this.args = [width.toFixed(0)];
  }
}

function borderColorVariant(variant: string) {
  const borderColorCommandPrefix = "border-color";
  return borderColorCommandPrefix + "-" + variant;
}

export class BorderColorFocused extends BaseCommand {
  override readonly command: string = borderColorVariant("focused");
  override args: string[];

  constructor(color: Color) {
    super();
    this.args = [color.color];
  }
}

export class BorderColorUnfocused extends BaseCommand {
  override readonly command: string = borderColorVariant("unfocused");
  override args: string[];

  constructor(color: Color) {
    super();
    this.args = [color.color];
  }
}

export class BorderColorUrgent extends BaseCommand {
  override readonly command: string = borderColorVariant("urgent");
  override args: string[];

  constructor(color: Color) {
    super();
    this.args = [color.color];
  }
}

export class CursorTheme extends BaseCommand {
  override readonly command: string = "xcursor-theme";
  override args: string[];

  constructor({cursorTheme, size}: {cursorTheme: string, size?: number}) {
    super();
    this.args = [cursorTheme];

    if (size) {
      this.args.push(size.toFixed(0));
    }
  }
}

export class BackgroundColor extends BaseCommand {
  override readonly command: string = "background-color";
  override args: string[];

  constructor(color: Color) {
    super();
    this.args = [color.color];
  }
}

const FocusFollowsCursorMap: {
  [key in EFocusFollowCursor]: string;
} = {
  [EFocusFollowCursor.ALWAYS]: "always",
  [EFocusFollowCursor.DISABLED]: "disabled",
  [EFocusFollowCursor.NORMAL]: "normal",
};

export class FocusFollowsCursor extends BaseCommand {
  override readonly command: string = "focus-follows-cursor";
  override args: string[];

  constructor(focusFollowsCursor: EFocusFollowCursor) {
    super();
    this.args = [FocusFollowsCursorMap[focusFollowsCursor] ?? "disabled"];
  }
}

export class HideCursor extends BaseCommand {
  override readonly command: string = "hide-cursor";
  override args: string[];

  constructor(hideCursor: number | boolean) {
    super();
    if (typeof hideCursor === "number") {
      this.args = ["timeout", hideCursor.toFixed(0)];
    }

    this.args = ["when-typing", hideCursor ? "enabled" : "disabled"];
  }
}

export class Repeat extends BaseCommand {
  override readonly command: string = "set-repeat";
  override args: string[];

  /** @param delay in milliseconds */
  constructor({rate, delay}: {rate: number, delay: number}) {
    super();
    this.args = [rate.toFixed(0), delay.toFixed(0)];
  }
}

enum EFilterType {
  APP_ID = "app-id",
  TITLE = "title"
}

export class FilterCommand extends BaseCommand {
  override readonly args: string[] = [];

  constructor(override readonly command: string, filterType: EFilterType, pattern: string) {
    super()
    this.args.push(filterType, pattern)
  }
}

// csd stands for client side decorations
const CSD_FILTER = "csd-filter-add"
const FLOAT_FILTER = "float-filter-add"

export const optionsMap: OptionMapperV4<RiverOptions> = {
  filter: {
    /** Force Client Side Decorations on specified views */
    clientSideDecorations: {
      id: FilterCommand.bind(null, CSD_FILTER, EFilterType.APP_ID),
      title: FilterCommand.bind(null, CSD_FILTER, EFilterType.TITLE)
    },
    float: {
      id: FilterCommand.bind(null, FLOAT_FILTER, EFilterType.APP_ID),
      title: FilterCommand.bind(null, FLOAT_FILTER, EFilterType.TITLE)
    }
  },
  theme: {
    backgroundColor: BackgroundColor,
    borderColorFocused: BorderColorFocused,
    borderColorUnfocused: BorderColorUnfocused,
    borderColorUrgent: BorderColorUrgent,
    borderWidth: BorderWidth,
    cursor: CursorTheme
  },
  attachMode: AttachMode,
  focusFollowsCursor: FocusFollowsCursor,
  hideCursor: {
    timeout: HideCursor,
    whenTyping: HideCursor,
  },
  repeat: Repeat
}
