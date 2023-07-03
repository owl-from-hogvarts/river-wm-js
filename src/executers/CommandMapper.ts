import { FocusDirection } from "../object-model/actions/Focus";
import { MoveDirection } from "../object-model/actions/Move";
import { SwapDirection } from "../object-model/actions/Swap";
import { FullFeatures } from "../object-model/River";
import { BaseCommand } from "./commands/Command";

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
  enterMode(enterMode: string): FeatureReturn {
    throw new Error("Method not implemented.");
  }
  focus(focusDirection: FocusDirection): FeatureReturn {
    throw new Error("Method not implemented.");
  }
  move(moveDirection: MoveDirection): FeatureReturn {
    throw new Error("Method not implemented.");
  }
  spawn(command: string, args: string[]): FeatureReturn {
    throw new Error("Method not implemented.");
  }
  swap(swapDirection: SwapDirection): FeatureReturn {
    throw new Error("Method not implemented.");
  }
  toggleFloat(): FeatureReturn {
    throw new Error("Method not implemented.");
  }

}
