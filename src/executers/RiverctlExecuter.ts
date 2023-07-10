import { IExecuter } from "./IExecuter";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  River,
  RiverModesDefinition,
  RiverOptions,
} from "../object-model/River";
import {
  MapCommand,
  MapDescription,
  MapPointerCommand,
  MapPointerDescription,
  PointerCommandMap,
} from "./commands/MapCommand";
import { DeclareMode } from "./commands/DeclareModeCommand";
import { EnterModeAction } from "../object-model/actions/EnterMode";
import {
  ALL,
  BaseMode,
  EnterableMode,
  NamedMode,
  SwitchableMode,
} from "../object-model/keyBindings/Mode";
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

const ModeKeyToModeIdMap: {
  [Key in keyof Required<
    RiverModesDefinition<RiverctlFeatures>
  >["specialModes"]]-?: SpecialModeIds;
} = {
  DEFAULT_MODE: SpecialModeIds.NORMAL_MODE,
  LOCK_MODE: SpecialModeIds.NORMAL_MODE,
};

export class RiverctlExecuter implements IExecuter<RiverctlFeatures> {
  private static readonly RIVER_CONFIG_COMMAND = "riverctl";
  private readonly commandMapper = new CommandMapper();
  private readonly execFile = promisify(execFile);
  private readonly definedModes: Set<SpecialModeIds | string> = new Set([
    SpecialModeIds.NORMAL_MODE,
    SpecialModeIds.LOCK_MODE,
  ]);

  constructor(private readonly river: River<RiverctlFeatures>) {}

  private execute(command: BaseCommand): void {
    this.execFile(RiverctlExecuter.RIVER_CONFIG_COMMAND, [
      command.command,
      ...command.args,
    ]);
  }

  private processSetupActions(): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (this.river.startupActions) {
      for (const action of this.river.startupActions) {
        const command = action.getImplementationDetails(this.commandMapper);
        commands.push(command);
      }
    }

    return commands;
  }

  private setupTileManager(): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (this.river.tileManager) {
      commands.push(new DefaultLayout(this.river.tileManager));
    }

    return commands;
  }

  private setupInputDevicesSettings(
    
  ): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (this.river.input) {
      for (const deviceName in this.river.input) {
        const deviceConfigMap = createInputMap(deviceName);
        commands.push(
          ...mapOptionsToCommands(this.river.input[deviceName], deviceConfigMap)
        );
      }
    }

    return commands;
  }

  private executeCommands(commands: BaseCommand[]): void {
    for (const command of commands) {
      // console.log(`executing: ${command.command} ${command.args}`)
      this.execute(command);
    }
  }

  /**
   * Applies configuration right now
   */
  public apply() {
    const commands: BaseCommand[] = [];
    commands.push(...this.processSetupActions());
    commands.push(...this.setupTileManager());
    commands.push(...this.applyOptions(this.river.options));
    commands.push(...this.setupInputDevicesSettings());
    commands.push(...this.defineSpecialModes());
    commands.push(...this.defineOtherModes());
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
          mode: modeId,
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
          shortcut: pointerBinding.shortcut,
          cmd:
            action instanceof BaseAction
              ? action.getImplementationDetails(this.commandMapper)
              : PointerCommandMap[action],
        };

        commands.push(new MapPointerCommand(mapDescription));
      }
    }

    return commands;
  }

  private defineOtherModes(): BaseCommand[] {
    const commands: BaseCommand[] = [];

    for (const mode of this.river.modes.otherModes) {
      if (mode instanceof SwitchableMode) {
        commands.push(...this.defineSwitchableMode(mode));
        continue;
      }

      if (mode instanceof EnterableMode) {
        commands.push(...this.defineEnterableMode(mode))
        continue;
      }
      
    }

    return commands;
  }

  private defineSpecialModes(): BaseCommand[] {
    const commands: BaseCommand[] = [];

    const { specialModes } = this.river.modes;
    for (const modeKeyString in specialModes) {
      const modeKey = <keyof typeof specialModes>modeKeyString;
      const mode = specialModes[modeKey];
      if (mode) {
        commands.push(
          ...this.defineKeyBindingsForSpecialMode(
            mode,
            ModeKeyToModeIdMap[modeKey]
          )
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

  private defineEnterableMode(
    mode: EnterableMode<RiverctlFeatures>
  ): BaseCommand[] {
    const enterModeCommands: MapCommand[] = []

    if (mode.baseModes === ALL) {
      for (const definedMode of this.definedModes) {
        enterModeCommands.push(new MapCommand({
          cmd: new EnterModeAction(mode.name).getImplementationDetails(this.commandMapper),
          mode: definedMode,
          shortcut: mode.enterModeShortcut
        }))
      }
    }

    const keyBindingCommands = this.defineBindingsForMode(mode, mode.name)

    return [...enterModeCommands, ...keyBindingCommands]
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

    const fallbackModeId =
      mode.fallBackMode instanceof NamedMode
        ? mode.fallBackMode.name
        : this.lookupModeIdByMode(mode);

    if (!fallbackModeId) {
      throw new Error(
        `Unknown mode specified as fallback for mode "${mode.name}"`
      );
    }

    const mapEnterMode = new MapCommand({
      mode: fallbackModeId,
      shortcut: mode.toggleModeKeyBinding,
      cmd: new EnterModeAction(mode.name).getImplementationDetails(
        this.commandMapper
      ),
    });

    const mapExitMode = new MapCommand({
      mode: mode.name,
      shortcut: mode.toggleModeKeyBinding,
      cmd: new EnterModeAction(fallbackModeId).getImplementationDetails(
        this.commandMapper
      ),
    });

    const keyBindings = this.defineBindingsForMode(mode, mode.name);

    return [modeDeclaration, ...keyBindings, mapEnterMode, mapExitMode];
  }

  private lookupModeIdByMode(
    mode: BaseMode<RiverctlFeatures>
  ): string | undefined {
    const { specialModes } = this.river.modes;

    for (const modeKeyString in specialModes) {
      const modeKey = <keyof typeof specialModes>modeKeyString;
      const baseMode = specialModes[modeKey];

      if (baseMode && mode.id === baseMode.id) {
        return ModeKeyToModeIdMap[modeKey];
      }
    }
  }
}
