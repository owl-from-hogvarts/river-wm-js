import { BaseAction } from "../actions/BaseAction.js";
import { PointerShortcut } from "./Shortcut.js";

export const BTN_LEFT = "BTN_LEFT"
export const BTN_RIGHT = "BTN_RIGHT"
export const BTN_MIDDLE = "BTN_MIDDLE"

export enum EPointerCommand {
  MOVE_VIEW,
  RESIZE_VIEW
}

export class PointerBinding<T> {
  constructor(
    public readonly action: BaseAction<T> | EPointerCommand,
    public readonly shortcut: PointerShortcut
  ) {}
}

