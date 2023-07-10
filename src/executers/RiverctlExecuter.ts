import { IExecuter } from "./IExecuter";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { River, RiverOptions } from "../object-model/River";
import {
  MapCommand,
  MapDescription,
  MapPointerCommand,
  MapPointerDescription,
  PointerCommandMap,
} from "./commands/MapCommand";
import { DeclareMode } from "./commands/DeclareModeCommand";
import { EnterModeAction } from "../object-model/actions/EnterMode";
import { BaseMode, SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseCommand } from "./commands/Command";
import { CommandMapper, RiverctlFeatures } from "./CommandMapper";
import { mapOptionsToCommands, optionsMap } from "./commands/Options";
import { DefaultLayout } from "./commands/DefaultLayoutCommand";
import { createInputMap } from "./input/input";
import { BaseAction } from "../object-model/actions/BaseAction";

enum SpecialModeIds {
  NORMAL_MODE = "normal",
  LOCK_MODE = "lock",
}

export class RiverctlExecuter implements IExecuter<RiverctlFeatures> {
  private static readonly RIVER_CONFIG_COMMAND = "riverctl";
  private readonly commandMapper = new CommandMapper();
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

  private defineSpecialModes(river: River<RiverctlFeatures>): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (river.modes.DEFAULT_MODE) {
      const commands = this.defineKeyBindingsForSpecialMode(
        river.modes.DEFAULT_MODE,
        SpecialModeIds.NORMAL_MODE
      );
      commands.push(...commands);
    }

    if (river.modes.LOCK_MODE) {
      const commands = this.defineKeyBindingsForSpecialMode(
        river.modes.LOCK_MODE,
        SpecialModeIds.LOCK_MODE
      );
      commands.push(...commands);
    }

    return commands;
  }

  private processSetupActions(river: River<RiverctlFeatures>): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (river.startupActions) {
      for (const action of river.startupActions) {
        const command = action.getImplementationDetails(this.commandMapper);
        commands.push(command);
      }
    }

    return commands;
  }

  private setupTileManager(river: River<RiverctlFeatures>): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (river.tileManager) {
      commands.push(new DefaultLayout(river.tileManager));
    }

    return commands;
  }

  private setupInputDevicesSettings(
    river: River<RiverctlFeatures>
  ): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (river.input) {
      for (const deviceName in river.input) {
        const deviceConfigMap = createInputMap(deviceName);
        commands.push(
          ...mapOptionsToCommands(river.input[deviceName], deviceConfigMap)
        );
      }
    }

    return commands;
  }

  private defineOtherModes(river: River<RiverctlFeatures>): BaseCommand[] {
    const commands: BaseCommand[] = [];

    for (const mode of river.modes.otherModes) {
      const modeCommands = this.defineSwitchableMode(mode);
      commands.push(...modeCommands);
    }

    return commands;
  }

  private executeCommands(commands: BaseCommand[]): void {
    for (const command of commands) {
      this.execute(command);
    }
  }

  /**
   * Applies configuration right now
   */
  public apply(river: River<RiverctlFeatures>) {
    const commands: BaseCommand[] = [];
    commands.push(...this.processSetupActions(river));
    commands.push(...this.setupTileManager(river));
    commands.push(...this.applyOptions(river.options));
    commands.push(...this.defineSpecialModes(river));
    commands.push(...this.defineOtherModes(river));
    // left for debugging
    // for (const command of this.commands) {
    //   if (!(command instanceof MapCommand) && !((<any>command).cmd instanceof SendLayoutCmdCommand)) {
    //     continue
    //   }

    //   console.log(command.toCommandString())
    //   const c = (<SendLayoutCmdCommand>(<any>command).cmd)
    //   console.log(c.command, c.args)
    // }
    // console.log(this.commands)

    this.executeCommands(commands);
  }

  private applyOptions(options: RiverOptions): BaseCommand[] {
    const optionsCommands: BaseCommand[] = mapOptionsToCommands(
      options,
      optionsMap
    );

    return optionsCommands;
  }

  private defineBindingsForMode(
    mode: BaseMode<RiverctlFeatures>,
    modeId: string
  ): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (mode.bindings.keyboard) {
      for (const keyBinding of mode.bindings.keyboard) {
        const mapDescription: MapDescription = {
          cmd: keyBinding.action.getImplementationDetails(this.commandMapper),
          modeName: modeId,
          shortcut: keyBinding.shortcut,
        };

        const mapCommand = new MapCommand(mapDescription);

        commands.push(mapCommand);
      }
    }

    if (mode.bindings.pointer) {
      for (const pointerBinding of mode.bindings.pointer) {
        const { action } = pointerBinding;

        const mapDescription: MapPointerDescription = {
          mode: modeId,
          pointerShortcut: pointerBinding.shortcut,
          cmd:
            action instanceof BaseAction
              ? action.getImplementationDetails(this.commandMapper)
              : PointerCommandMap[action],
        };

        commands.push(
          new MapPointerCommand(<Required<MapPointerDescription>>mapDescription)
        );
      }
    }

    return commands;
  }

  private defineKeyBindingsForSpecialMode(
    mode: BaseMode<RiverctlFeatures>,
    specialModeId: SpecialModeIds
  ): BaseCommand[] {
    return this.defineBindingsForMode(mode, specialModeId);
  }

  private defineSwitchableMode(
    mode: SwitchableMode<RiverctlFeatures>
  ): BaseCommand[] {
    // declare mode
    if (this.definedModes.has(mode.name)) {
      throw new Error(
        `mode ${mode.name} is already defined. Can't define same mode twice`
      );
    }

    this.definedModes.add(mode.name);
    const modeDeclaration = new DeclareMode(mode.name);

    const mapEnterMode = new MapCommand({
      modeName: mode.fallBackMode.name,
      shortcut: mode.toggleModeKeyBinding,
      cmd: new EnterModeAction(mode).getImplementationDetails(
        this.commandMapper
      ),
    });

    const mapExitMode = new MapCommand({
      modeName: mode.name,
      shortcut: mode.toggleModeKeyBinding,
      cmd: new EnterModeAction(mode.fallBackMode).getImplementationDetails(
        this.commandMapper
      ),
    });

    const keyBindings = this.defineBindingsForMode(mode, mode.name);

    return [modeDeclaration, ...keyBindings, mapEnterMode, mapExitMode];
  }
}
