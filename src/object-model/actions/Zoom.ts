import { BaseAction } from "./BaseAction.js";


export class Zoom extends BaseAction<ICanZoom<unknown>> {
  override getImplementationDetails<R>(visitor: ICanZoom<R>): R {
    return visitor.zoom()
  }

}


export interface ICanZoom<R> {
  zoom(): R
}
