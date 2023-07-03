import { IExecuter } from "./IExecuter";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { River } from "../object-model/River";
import { MapCommand } from "./Map";
import { DeclareMode } from "./DeclareMode";
import { EnterMode } from "../object-model/actions/EnterMode";
import { BaseMode, SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseCommand } from "./Command";
import { CommandMapper, RiverctlFeatures } from "./CommandMapper";


enum SpecialModeIds {
  NORMAL_MODE = "normal",
  LOCK_MODE = "lock",
}

export class RiverctlExecuter implements IExecuter {
  private static readonly RIVER_CONFIG_COMMAND = "riverctl";
  private readonly commandMapper = new CommandMapper();
  private readonly commands: BaseCommand[] = [];
  private readonly execFile = promisify(execFile);
  private readonly definedModes: Set<SpecialModeIds | string> = new Set([
    SpecialModeIds.NORMAL_MODE,
    SpecialModeIds.LOCK_MODE,
  ]);

  private execute(command: BaseCommand): void {
    this.execFile(RiverctlExecuter.RIVER_CONFIG_COMMAND, [
      command.command,
      ...command.args,
    ]);
  }

  /**
   * Applies configuration right now
   */
  public apply(river: River<RiverctlFeatures>) {
    // apply options
    // apply key bindings

  }

  private defineKeybindingsForMode(mode: BaseMode<RiverctlFeatures>, modeId: string): BaseCommand[] {
    const commands: BaseCommand[] = [];

    for (const keyBinding of mode.keyBindings) {
      const mapCommand = new MapCommand(
        modeId,
        keyBinding.shortcut,
        keyBinding.action.getImplementationDetails(this.commandMapper)
      );

      commands.push(mapCommand);
    }

    return commands;
  }

  private setupKeyBindingsForSpecialMode(mode: BaseMode<RiverctlFeatures>, specialModeId: SpecialModeIds): BaseCommand[] {
    return this.defineKeybindingsForMode(mode, specialModeId);
  }


  private defineSwitchableMode(mode: SwitchableMode<RiverctlFeatures>): BaseCommand[] {
    // declare mode
    if (this.definedModes.has(mode.name)) {
      throw new Error(
        `mode ${mode.name} is already defined. Can't define same mode twice`
      );
    }

    this.definedModes.add(mode.name)
    const modeDeclaration = new DeclareMode(mode.name);

    const mapEnterMode = new MapCommand(
      mode.fallBackMode.name,
      mode.toggleModeKeyBinding,
      (new EnterMode(mode)).getImplementationDetails(this.commandMapper)
    );

    const mapExitMode = new MapCommand(
      mode.name,
      mode.toggleModeKeyBinding,
      (new EnterMode(mode.fallBackMode)).getImplementationDetails(this.commandMapper)
    );

    const keyBindings = this.defineKeybindingsForMode(mode, mode.name);

    return [modeDeclaration, ...keyBindings, mapEnterMode, mapExitMode];
  }
}
