import { BaseAction } from "./BaseAction";

export class ExitAction extends BaseAction<ICanExit<unknown>> {
  override getImplementationDetails<R>(visitor: ICanExit<R>): R {
    return visitor.exit()
  }

}

export interface ICanExit<R> {
  exit(): R
}

