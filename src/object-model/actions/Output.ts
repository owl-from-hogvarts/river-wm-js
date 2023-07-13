import { BaseAction } from "./BaseAction.js";
import { EBaseDirection, EExtendedDirection } from "./directions.js";

interface BASE_DIRECTION_OUTPUT {
  kind: "base",
  direction: EBaseDirection
}

interface EXTENDED_DIRECTION_OUTPUT {
  kind: "extended",
  direction: EExtendedDirection
}

interface OUTPUT_NAME {
  kind: "output_name",
  name: string
}

export type EFocusOutputDirection = BASE_DIRECTION_OUTPUT | EXTENDED_DIRECTION_OUTPUT | OUTPUT_NAME

export type Output = EFocusOutputDirection

export class FocusOutputAction extends BaseAction<ICanFocusOutput<unknown>> {
  constructor(private readonly output: Output) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanFocusOutput<R>): R {
    return visitor.focusOutput(this.output)
  }

}

export interface ICanFocusOutput<R> {
  focusOutput(output: Output): R
} 


export class SendToOutputAction extends BaseAction<ICanSendToOutput<unknown>> {
  constructor(private readonly output: Output) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanSendToOutput<R>): R {
    return visitor.sendToOutput(this.output)
  }

}

export interface ICanSendToOutput<R> {
  sendToOutput(output: Output): R
}

