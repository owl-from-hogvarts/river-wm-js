import { Modifier } from "./Modifier";

export interface IModifiersFormatter {
  (modifiers: Modifier[]): string
}
