import { River, RiverModesDefinition } from "../object-model/River";
import { BaseAction } from "../object-model/actions/BaseAction";
import { EnterModeAction } from "../object-model/actions/EnterMode";
import {
  ALL,
  BaseMode,
  EnterableMode,
  ICanProcessModes,
  NamedMode,
  SwitchableMode,
} from "../object-model/keyBindings/Mode";
import { CommandMapper, RiverctlFeatures } from "./CommandMapper";
import { BaseCommand } from "./commands/Command";
import { DeclareModeCommand } from "./commands/DeclareModeCommand";
import {
  MapCommand,
  MapDescription,
  MapPointerCommand,
  MapPointerDescription,
  PointerCommandMap,
} from "./commands/MapCommand";

enum SpecialModeIds {
  NORMAL_MODE = "normal",
  LOCK_MODE = "locked",
}

const ModeKeyToModeIdMap: {
  [Key in keyof Required<
    RiverModesDefinition<RiverctlFeatures>
  >["specialModes"]]-?: SpecialModeIds;
} = {
  DEFAULT_MODE: SpecialModeIds.NORMAL_MODE,
  LOCK_MODE: SpecialModeIds.LOCK_MODE,
};

export class ModesImplementation
  implements ICanProcessModes<BaseCommand[], RiverctlFeatures>
{
  constructor(
    private readonly commandMapper: CommandMapper,
    private readonly riverModes: RiverModesDefinition<RiverctlFeatures>
  ) {
    this.declareModesCommands = this.declareModes(this.riverModes);
  }

  public readonly declareModesCommands;

  private readonly definedModes: Set<SpecialModeIds | string> = new Set([
    SpecialModeIds.NORMAL_MODE,
    SpecialModeIds.LOCK_MODE,
  ]);

  private defineBindingsForMode(
    mode: BaseMode<RiverctlFeatures>,
    modeId: string
  ): BaseCommand[] {
    const commands: BaseCommand[] = [];

    if (mode.bindings.keyboard) {
      for (const keyBinding of mode.bindings.keyboard) {
        const mapDescription: MapDescription = {
          shortcut: keyBinding.shortcut,
          mode: modeId,
          cmd: keyBinding.action.getImplementationDetails(this.commandMapper),
        };

        const mapCommand = new MapCommand(mapDescription);

        commands.push(mapCommand);
      }
    }

    if (mode.bindings.pointer) {
      for (const pointerBinding of mode.bindings.pointer) {
        const { action } = pointerBinding;

        const mapDescription: MapPointerDescription = {
          shortcut: pointerBinding.shortcut,
          mode: modeId,
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

  baseMode(mode: BaseMode<RiverctlFeatures>): BaseCommand[] {
    const modeName = this.lookupModeNameByMode(mode);

    return this.defineBindingsForMode(mode, modeName);
  }

  namedMode(mode: NamedMode<RiverctlFeatures, string>): BaseCommand[] {
    return this.defineBindingsForMode(mode, mode.name);
  }

  switchableMode(mode: SwitchableMode<RiverctlFeatures>): BaseCommand[] {
    const fallbackModeId =
      mode.fallBackMode instanceof NamedMode
        ? mode.fallBackMode.name
        : this.lookupModeNameByMode(mode.fallBackMode);

    const mapEnterMode = new MapCommand({
      mode: fallbackModeId,
      shortcut: mode.toggleModeShortcut,
      cmd: new EnterModeAction(mode.name).getImplementationDetails(
        this.commandMapper
      ),
    });

    const mapExitMode = new MapCommand({
      mode: mode.name,
      shortcut: mode.toggleModeShortcut,
      cmd: new EnterModeAction(fallbackModeId).getImplementationDetails(
        this.commandMapper
      ),
    });

    const definition = this.defineBindingsForMode(mode, mode.name);

    return [...definition, mapEnterMode, mapExitMode];
  }

  enterableMode(mode: EnterableMode<RiverctlFeatures, string>): BaseCommand[] {
    const enterModeCommands: MapCommand[] = [];
    const modeDefinition = this.defineBindingsForMode(mode, mode.name);

    const baseModes =
      mode.baseModes === ALL
        ? this.definedModes
        : mode.baseModes.map((mode) => mode.name);

    for (const baseModeName of baseModes) {
      enterModeCommands.push(
        new MapCommand({
          cmd: new EnterModeAction(mode.name).getImplementationDetails(
            this.commandMapper
          ),
          mode: baseModeName,
          shortcut: mode.enterModeShortcut,
        })
      );
    }

    return [...modeDefinition, ...enterModeCommands];
  }

  private declareModes(
    modes: RiverModesDefinition<RiverctlFeatures>
  ): DeclareModeCommand[] {
    return modes.otherModes.map((mode) => this.declareMode(mode.name));
  }

  private declareMode(name: string): DeclareModeCommand {
    if (this.definedModes.has(name)) {
      throw new Error(
        `mode "${name}" is already defined. Can't define same mode twice`
      );
    }

    this.definedModes.add(name);
    return new DeclareModeCommand(name);
  }

  private lookupModeNameByMode(mode: BaseMode<RiverctlFeatures>): string {
    const { specialModes } = this.riverModes;
    console.log("looking up mode id by mode");

    for (const modeKeyString in specialModes) {
      const modeKey = <keyof typeof specialModes>modeKeyString;
      const baseMode = specialModes[modeKey];

      if (baseMode) {
        console.log(`known mode under key ${modeKey} found`);
        console.log(`known mode id ${baseMode.id.description}`);
        console.log(`current mode id ${mode.id.description}`);
        console.log("-".repeat(30));
      }

      if (baseMode && mode.id === baseMode.id) {
        return ModeKeyToModeIdMap[modeKey];
      }
    }

    throw new Error(`Unknown mode with id "${mode.id.description}"`);
  }
}
