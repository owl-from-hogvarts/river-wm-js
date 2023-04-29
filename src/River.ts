import { DeclareMode } from "./commands/DeclareMode";
import { EnterMode } from "./commands/EnterMode";
import { ICommand } from "./commands/ICommand";
import { IExecuter } from "./commands/IExecuter";
import { RiverctlExecuter } from "./commands/RiverctlExecuter";
import { MapCommand } from "./commands/mapCommand/MapCommand";
import { Shortcut } from "./commands/mapCommand/keyBindings/KeyBinding";
import { Mode } from "./commands/mapCommand/keyBindings/Mode";

class River {
  private readonly commands: ICommand[] = [];

  constructor(
    modes: Mode[],
    private readonly executer: IExecuter = new RiverctlExecuter()
  ) {
    this.buildKeyBindingCommands(modes);
  }

  private buildKeyBindingCommands(modes: Mode[]): ICommand[] {
    const commands: ICommand[] = [];

    for (const mode of modes) {
      commands.push(...this.defineKeybindingsMode(mode));
    }

    return commands;
  }

  /**
   * Applies configuration right now
   */
  public apply() {
    for (const command of this.commands) {
      this.executer.execute(command);
    }
  }

  private defineKeybindingsMode(mode: Mode) {
    const commands: ICommand[] = [];
    commands.push(...this.defineMode(mode));

    for (const keyBinding of mode.keyBindings) {
      const mapCommand = new MapCommand(
        mode.name,
        keyBinding.shortcut,
        keyBinding.command
      );

      commands.push(mapCommand);
    }

    return commands;
  }

  private defineMode(mode: Mode): ICommand[] {
    // declare mode
    const modeDeclaration = new DeclareMode(mode.name);

    const mapEnterMode = new MapCommand(
      Mode.DEFAULT_MODE,
      mode.enterModeKeyBinding,
      new EnterMode(mode)
    );

    const mapExitMode = new MapCommand(
      mode.name,
      mode.enterModeKeyBinding,
      new EnterMode(Mode.DEFAULT_MODE)
    );

    return [modeDeclaration, mapEnterMode, mapExitMode];
  }
}

enum AttachMode {
  TOP,
  BOTTOM,
}

type RiverOptions = Partial<{
  attachMode: AttachMode;
  theme: Partial<{
    borderWidth: number;
    borderColorFocused: string;
    borderColorUnfocused: string;
    borderColorUrgent: string;
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
