import { EBaseDirection, EExtendedDirection } from "../../object-model/actions/directions";

export const BaseDirectionMap = {
  [EBaseDirection.PREVIOUS]: "previous",
  [EBaseDirection.NEXT]: "next"
}

export const ExtendedDirectionMap = {
  [EExtendedDirection.DOWN]: "down",
  [EExtendedDirection.LEFT]: "left",
  [EExtendedDirection.RIGHT]: "right",
  [EExtendedDirection.UP]: "up"
}
