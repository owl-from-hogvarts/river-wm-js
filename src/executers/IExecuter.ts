import { River } from "../object-model/River.js";

export interface IExecuter<T> {
  apply(config: River<T>): void;
}
