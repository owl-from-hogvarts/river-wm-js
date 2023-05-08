import { River } from "../object-model/River";

export interface IExecuter {
  apply(config: River): void;
}
