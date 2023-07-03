import { River } from "../object-model/River";

export interface IExecuter<T> {
  apply(config: River<T>): void;
}
