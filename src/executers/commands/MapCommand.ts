import { Shortcut } from "../../object-model/keyBindings/KeyBindings";
import { Modifier } from "../../object-model/keyBindings/Modifier";
import {
  EPointerCommand,
  PointerShortcut,
} from "../../object-model/keyBindings/PointerBindings";
import { BaseCommand } from "./Command";

export type MapDescription = {
  modeName: string;
  shortcut: Shortcut;
  cmd: BaseCommand;
};

function formatModifiers(modifiers: Modifier[]): string {
  return modifiers.join("+");
}

export class MapCommand extends BaseCommand {
  override command = "map";
  private readonly baseArguments;

  constructor(private readonly mapDescription: MapDescription) {
    super();
    this.baseArguments = [
      this.mapDescription.modeName,
      this.mapDescription.shortcut.getModifiersFormatted(formatModifiers),
      this.mapDescription.shortcut.key,
      this.mapDescription.cmd.command,
      ...this.mapDescription.cmd.args,
    ];
  }

  override get args(): string[] {
    const commandArgs = [];

    const { shortcut } = this.mapDescription;

    if (shortcut.flag) {
      commandArgs.push(shortcut.flag.kind);

      if (shortcut.flag.kind === "layout") {
        commandArgs.push(shortcut.flag.index.toFixed());
      }
    }

    return [...commandArgs, ...this.baseArguments];
  }
}

export const PointerCommandMap = {
  [EPointerCommand.MOVE_VIEW]: "move-view",
  [EPointerCommand.RESIZE_VIEW]: "resize-view",
};

export type MapPointerDescription = {
  mode: string;
  pointerShortcut: PointerShortcut;
  cmd: BaseCommand | string;
};

export class MapPointerCommand extends BaseCommand {
  override readonly command: string = "map-pointer";
  override readonly args: string[] = [];

  constructor(description: MapPointerDescription) {
    super();
    const modifiers = formatModifiers(description.pointerShortcut.modifiers);
    this.args.push(
      description.mode,
      modifiers,
      description.pointerShortcut.button
    );

    if (typeof description.cmd === "string") {
      this.args.push(description.cmd);
      return;
    }

    this.args.push(description.cmd.command, ...description.cmd.args);
  }
}
