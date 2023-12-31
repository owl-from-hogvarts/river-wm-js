/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import { IExecuter } from "./IExecuter.js";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  River,
  RiverOptions,
} from "../object-model/River.js";
import { BaseCommand } from "./commands/Command.js";
import { CommandMapper, RiverctlFeatures } from "./CommandMapper.js";
import { mapOptionsToCommands, optionsMap } from "./commands/Options.js";
import { DefaultLayout } from "./commands/DefaultLayoutCommand.js";
import { createInputMap } from "./input/input.js";
import { ModesImplementation } from "./ModeCommands.js";


export class RiverctlExecuter implements IExecuter<RiverctlFeatures> {
  private static readonly RIVER_CONFIG_COMMAND = "riverctl";
  private readonly commandMapper = new CommandMapper();
  private readonly execFile = promisify(execFile);
  private readonly modesImplementation


  constructor(private readonly river: River<RiverctlFeatures>) {
    this.modesImplementation = new ModesImplementation(this.commandMapper, this.river.modes)
  }

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
    commands.push(...this.modesImplementation.declareModesCommands)
    commands.push(...this.defineModes());
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


  private defineModes(): BaseCommand[] {
    const commands: BaseCommand[] = [];

    const { specialModes } = this.river.modes
    for (const modeKeyString in specialModes) {
      const modeKey = <keyof typeof specialModes>modeKeyString;
      const mode = specialModes[modeKey]
      if (mode) {
        commands.push(...mode.getImplementationDetails(this.modesImplementation))
      }
    }

    for (const mode of this.river.modes.otherModes) {
      commands.push(...mode.getImplementationDetails(this.modesImplementation))
    }

    return commands;
  }
}
