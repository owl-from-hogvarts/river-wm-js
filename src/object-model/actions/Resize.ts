import { BaseAction } from "./BaseAction.js";

export enum EAxis {
  HORIZONTAL,
  VERTICAL
}

export class ResizeAction extends BaseAction<ICanResize<unknown>> {
  constructor(private readonly axis: EAxis, private readonly step: number) {
    super()
  }
  
  override getImplementationDetails<R>(visitor: ICanResize<R>): R {
    return visitor.resize(this.axis, this.step)
  }

}

export interface ICanResize<R> {
  resize(direction: EAxis, step: number): R
}

