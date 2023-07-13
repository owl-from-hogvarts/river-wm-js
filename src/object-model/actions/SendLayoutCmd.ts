import { BaseAction } from "./BaseAction.js";

export class SendLayoutCmd extends BaseAction<ICanSendLayoutCmd<unknown>> {
  constructor(private readonly tileManager: string, private readonly args: string[]) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanSendLayoutCmd<R>): R {
    return visitor.sendLayoutCmd(this.tileManager, this.args)
  }

}

export interface ICanSendLayoutCmd<R> {
  sendLayoutCmd(tileManager: string, args: string[]): R
}

