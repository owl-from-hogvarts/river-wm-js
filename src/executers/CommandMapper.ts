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

import { EBaseDirection, EExtendedDirection } from "../object-model/actions/directions.js";
import { MoveAction } from "../object-model/actions/Move.js";
import { Output } from "../object-model/actions/Output.js";
import { EAxis } from "../object-model/actions/Resize.js";
import { FullFeatures } from "../object-model/River.js";
import { ETagAction, ETagActionScope } from "../object-model/actions/Tags.js";
import { CloseCommand } from "./commands/CloseCommand.js";
import { BaseCommand } from "./commands/Command.js";
import { EnterModeCommand } from "./commands/EnterModeCommand.js";
import { ExitCommand } from "./commands/ExitCommand.js";
import { FocusCommand } from "./commands/FocusCommand.js";
import { MoveCommand } from "./commands/MoveCommand.js";
import { FocusOutputCommand, SendToOutputCommand } from "./commands/OutputCommands.js";
import { ResizeCommand } from "./commands/ResizeCommand.js";
import { SendLayoutCmdCommand } from "./commands/SendLayoutCmd.js";
import { SnapCommand } from "./commands/SnapCommand.js";
import { SpawnCommand } from "./commands/SpawnCommand.js";
import { SwapCommand } from "./commands/SwapCommand.js";
import { TagCommad } from "./commands/TagCommand.js";
import { ToggleFloatCommand } from "./commands/ToggleFloatCommand.js";
import { ToggleFullscreenCommand } from "./commands/ToggleFullscreenCommand.js";
import { ZoomCommand } from "./commands/ZoomCommand.js";

// all commands should be registered here
// const map = new Set<ICommandFactory>()

// ok so there are actions which need to be mapped to commands
// actions know nothing about commands, since they belongs to 
// object model, while commands know about actions
// action is passed to command as instance of BaseAction
// so command decides how to transform action to command

// the map itself can't hold references to concrete instances of 
// actions. This is the problem. 
// May use Object.getPrototypeOf

// or better adopt approach of xstream converters
// i.e. make array of command classes (commandFactory) with static methods
// one method would test if command can convert instance of 
// action into itself
// the other one would build command from action


// lets move commands back to object model
// they would replace actions.
// commands need to be divided into two groups: registerable and other
// registerable may be registered for shortcuts while other not

// then object model builds set of high level commands
// we take these commands and pass to executer
// executer call execute(this) for each command
// execute() calls methods like `RegisterShortcut` on executer (command receiver)
// method of executer returns low level command for registerable 
// high level commands while one or multiple low level commands for
// single high level command of other commands set

// but then how to apply object model for declarative executer/applier?
// declarative applier still needs to map high level actions assigned 
// to shortcut to low level ones
// but this is hard to accomplish: because action/command becomes black box
// so execute(this) needs to return low level command which
// corresponds to high level command.

// allow actions to know something about implementation.
// That is know implementation's capabilities. So let's declare several
// interfaces witch would describe capabilities of appliers
// Each action should have method which asks implementation 
// to provide something relevant. Result of such call
// are just returned back from the method.

// May just use visitor pattern. Yeah, each action would require
// separate method, but but so would other approaches

// aggregate interfaces defined by actions
// into single type. Implementation then provides
// something which complies the interface.
// So, when new action is added:
// 1. action itself is created (mostly data)
// 2. interface with visitor method is created
// 3. interface is added to aggregated type
// 4. implementations are updated to comply new interface


export type FeatureReturn = BaseCommand
export type RiverctlFeatures = FullFeatures<FeatureReturn>;

export class CommandMapper implements RiverctlFeatures {
  tag(action: ETagAction, scope: ETagActionScope, tag: number): BaseCommand {
    return new TagCommad(action, scope, tag)
  }
  exit(): BaseCommand {
    return new ExitCommand()
  }
  resize(axis: EAxis, step: number): BaseCommand {
    return new ResizeCommand(axis, step)
  }
  snap(direction: EExtendedDirection): BaseCommand {
    return new SnapCommand(direction)
  }
  toggleFullscreen(): BaseCommand {
    return new ToggleFullscreenCommand
  }
  zoom(): BaseCommand {
    return new ZoomCommand()
  }
  focusOutput(output: Output): BaseCommand {
    return new FocusOutputCommand(output)
  }
  sendToOutput(output: Output): BaseCommand {
    return new SendToOutputCommand(output)
  }
  close(): BaseCommand {
    return new CloseCommand()
  }
  sendLayoutCmd(tileManager: string, args: string[]): BaseCommand {
    return new SendLayoutCmdCommand(tileManager, args)
  }
  enterMode(enterMode: string): FeatureReturn {
    return new EnterModeCommand(enterMode)
  }
  focus(focusDirection: EBaseDirection): FeatureReturn {
    return new FocusCommand(focusDirection)
  }
  move(moveAction: MoveAction): FeatureReturn {
    return new MoveCommand(moveAction)
  }
  spawn(command: string, args: string[]): FeatureReturn {
    return new SpawnCommand(command, args)
  }
  swap(swapDirection: EBaseDirection): FeatureReturn {
    return new SwapCommand(swapDirection)
  }
  toggleFloat(): FeatureReturn {
    return new ToggleFloatCommand()
  }

}
