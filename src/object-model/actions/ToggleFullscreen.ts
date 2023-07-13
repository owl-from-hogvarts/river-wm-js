import { BaseAction } from "./BaseAction.js";

export class ToggleFullscreen extends BaseAction<ICanToggleFullscreen<unknown>> {
  override getImplementationDetails<R>(visitor: ICanToggleFullscreen<R>): R {
    return visitor.toggleFullscreen()
  }

}

export interface ICanToggleFullscreen<R> {
  toggleFullscreen(): R
}

