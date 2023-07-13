import { Modifier } from "./Modifier.js";

export interface IModifiersFormatter {
  (modifiers: Modifier[]): string;
}
