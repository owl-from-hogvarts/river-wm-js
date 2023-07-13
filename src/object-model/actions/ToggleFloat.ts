import { BaseAction } from "./BaseAction.js";

/** Makes focused view either floating or tiled */
export class ToggleFloatAction extends BaseAction<ICanToggleFloat<unknown>> {
  override getImplementationDetails<R>(visitor: ICanToggleFloat<R>): R {
    return visitor.toggleFloat()
  }
}

export interface ICanToggleFloat<R> {
  toggleFloat(): R
}

