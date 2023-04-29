import { ICommand } from "./commands/ICommand";
import { IExecuter } from "./commands/IExecuter";
import { MapCommand } from "./commands/mapCommand/MapCommand";
import { Mode } from "./commands/mapCommand/keyBindings/Mode";

class River {
  private readonly commands: ICommand[] = []
  
  constructor(private readonly executer: IExecuter, modes: Mode[]) {
    this.buildKeyBindingCommands(modes)
  }

  private buildKeyBindingCommands(modes: Mode[]) {
    const commands: ICommand[] = []
    
    for (const mode of modes) {
      commands.push(...MapCommand.commandsForMode(mode))
    }
  }

  /**
   * Applies configuration right now
   */
  public apply() {
    for (const command of this.commands) {
      this.executer.execute(command)
    }
  }
}