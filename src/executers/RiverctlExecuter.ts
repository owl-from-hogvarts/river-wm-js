import { IExecuter } from "./IExecuter";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { River, RiverOptions } from "../object-model/River";
import { MapCommand } from "./commands/MapCommand";
import { DeclareMode } from "./commands/DeclareModeCommand";
import { EnterModeAction } from "../object-model/actions/EnterMode";
import { BaseMode, SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseCommand } from "./commands/Command";
import { CommandMapper, RiverctlFeatures } from "./CommandMapper";
import { mapOptionsToCommands, optionsMap } from "./commands/Options";
import { DefaultLayout } from "./commands/DefaultLayoutCommand";


enum SpecialModeIds {
  NORMAL_MODE = "normal",
  LOCK_MODE = "lock",
}

export class RiverctlExecuter implements IExecuter<RiverctlFeatures> {
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
    this.commands.push(new DefaultLayout(river.tileManager))
    
    // apply options
    this.commands.push(...this.applyOptions(river.options))
    // apply key bindings

    if (river.modes.DEFAULT_MODE) {
      const commands = this.defineKeyBindingsForSpecialMode(river.modes.DEFAULT_MODE, SpecialModeIds.NORMAL_MODE)
      this.commands.push(...commands)
    }

    if (river.modes.LOCK_MODE) {
      const commands = this.defineKeyBindingsForSpecialMode(river.modes.LOCK_MODE, SpecialModeIds.LOCK_MODE)
      this.commands.push(...commands)
    }

    for (const mode of river.modes.otherModes) {
      const commands = this.defineSwitchableMode(mode)
      this.commands.push(...commands)
    }

    // for (const command of this.commands) {
    //   if (!(command instanceof MapCommand) && !((<any>command).cmd instanceof SendLayoutCmdCommand)) {
    //     continue
    //   }

    //   console.log(command.toCommandString())
    //   const c = (<SendLayoutCmdCommand>(<any>command).cmd)
    //   console.log(c.command, c.args)
    // }
    // console.log(this.commands)

    for (const command of this.commands) {
      this.execute(command)
    }

  }

  private applyOptions(options: RiverOptions): BaseCommand[] {
    const optionsCommands: BaseCommand[] = mapOptionsToCommands(options, optionsMap);

    return optionsCommands;
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

  private defineKeyBindingsForSpecialMode(mode: BaseMode<RiverctlFeatures>, specialModeId: SpecialModeIds): BaseCommand[] {
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
      (new EnterModeAction(mode)).getImplementationDetails(this.commandMapper)
    );

    const mapExitMode = new MapCommand(
      mode.name,
      mode.toggleModeKeyBinding,
      (new EnterModeAction(mode.fallBackMode)).getImplementationDetails(this.commandMapper)
    );

    const keyBindings = this.defineKeybindingsForMode(mode, mode.name);

    return [modeDeclaration, ...keyBindings, mapEnterMode, mapExitMode];
  }
}
