import { BaseAction } from "./BaseAction";

/** Closes focused window */
export class CloseAction extends BaseAction<ICanClose<unknown>> {
  override getImplementationDetails<R>(visitor: ICanClose<R>): R {
    return visitor.close()
  }

}

export interface ICanClose<R> {
  close(): R
}
