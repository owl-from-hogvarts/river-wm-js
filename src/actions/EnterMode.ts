import { SwitchableMode } from "../object-model/keyBindings/Mode";
import { BaseAction } from "./BaseAction";

export class EnterMode extends BaseAction {
  public readonly modeName;

  constructor(mode: SwitchableMode) {
    super()
    this.modeName = mode.name;
  }
}