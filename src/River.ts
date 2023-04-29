import { ICommand } from "./commands/ICommand";
import { IExecuter } from "./commands/IExecuter";
import { MapCommand } from "./commands/mapCommand/MapCommand";
import { Mode } from "./commands/mapCommand/keyBindings/Mode";

class River {
  private readonly commands: ICommand[] = [];

  constructor(private readonly executer: IExecuter, modes: Mode[]) {
    this.buildKeyBindingCommands(modes);
  }

  private buildKeyBindingCommands(modes: Mode[]) {
    const commands: ICommand[] = [];

    for (const mode of modes) {
      commands.push(...MapCommand.commandsForMode(mode));
    }
  }

  /**
   * Applies configuration right now
   */
  public apply() {
    for (const command of this.commands) {
      this.executer.execute(command);
    }
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
