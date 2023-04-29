import { ICommand } from "../../ICommand";
import { MapCommand } from "../MapCommand";
import { KeyBinding } from "./KeyBinding";

export class Mode {
  constructor(public readonly keyBindings: KeyBinding[], public readonly name: string = 'normal') {}
}