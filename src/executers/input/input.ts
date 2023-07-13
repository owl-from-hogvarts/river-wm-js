/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import { EAccelProfile } from "../../object-model/input/accelProfiles.js";
import { EClickMethod, EEvents, ETapButtonMap, InputDevice } from "../../object-model/input/input.js";
import { EScrollMethod } from "../../object-model/input/scrollMethod.js";
import { BaseCommand } from "../commands/Command.js";
import { OptionMapperV4 } from "../commands/Options.js";

const DISABLED = "disabled"
const ENABLED = "enabled"

abstract class InputCommand extends BaseCommand {
  override readonly command: string = "input"
  override readonly args: string[];

  constructor(inputDeviceType: string, subCommand: string) {
    super()
    this.args = [inputDeviceType, subCommand]
  }
}


class EnumCommand<T> extends InputCommand {  
  // `extends enum` is not supported in typescript
  /**
   * value map should be of type
   * ```typescript
   * type EnumMap<T> = {
   *   [Key in T]: string
   * }
   * ```
   */
  constructor(deviceName:string, subCommandName: string, valueMap: object, value: T) {
    super(deviceName, subCommandName)
    this.args.push(valueMap[value as keyof object])
  }
}

class SwitchCommand extends InputCommand {
  constructor(deviceName: string, subCommand: string, isEnabled: boolean) {
    super(deviceName, subCommand)
    this.args.push(isEnabled ? ENABLED : DISABLED)
  }
}

class AccelProfileCommand extends InputCommand {
  constructor(deviceName: string, accelProfile: EAccelProfile["kind"]) {
    super(deviceName, "accel-profile")
    this.args.push(accelProfile)
  }
}

class ScrollMethodCommand extends InputCommand {
  constructor(deviceName: string, scrollMethod: EScrollMethod["kind"]) {
    super(deviceName, "scroll-method")
    this.args.push(scrollMethod)
  }
}

class ScrollButtonCommand extends InputCommand {
  constructor(deviceName: string, button: string) {
    super(deviceName, "scroll-button")
    this.args.push(button)
  }
}

class PointerAccelCommand extends InputCommand {
  constructor(deviceName: string, factor: number) {
    super(deviceName, "pointer-accel")
    if (factor > 1 || factor < -1) {
      throw new Error(`Pointer acceleration factor should be within -1.0 to 1.0 range. Got: ${factor}`)
    }
    this.args.push(factor.toString())
  }
}

export function createInputMap(deviceType: string) {
  const device = deviceType
  const inputMap: OptionMapperV4<InputDevice> = {
    events: EnumCommand.bind(null, device, "events", {
      [EEvents.DISABLED]: DISABLED,
      [EEvents.ENABLED]: ENABLED,
      [EEvents.DISABLED_ON_EXTERNAL_MOUSE]: "disabled-on-external-mouse",
    }),
    accelProfile: {
      factor: PointerAccelCommand.bind(null, device),
      kind: AccelProfileCommand.bind(null, device)
    },
    disableWhileTyping: SwitchCommand.bind(null, device, "disable-while-typing"),
    clickMethod: EnumCommand.bind(null, device, "click-method", {
      [EClickMethod.NONE]: "none",
      [EClickMethod.BUTTON_AREA]: "button-area",
      [EClickMethod.CLICK_FINGER]: "click-finger"
    }),
    drag: SwitchCommand.bind(null, device, "drag"),
    dragLock: SwitchCommand.bind(null, device, "drag-lock"),
    leftHand: SwitchCommand.bind(null, device, "left-hand"),
    middleEmulation: SwitchCommand.bind(null, device, "middle-emulation"),
    naturalScroll: SwitchCommand.bind(null, device, "natural-scroll"),
    scrollMethod: {
      kind: ScrollMethodCommand.bind(null, device),
      button: ScrollButtonCommand.bind(null, device)
    },
    tap: SwitchCommand.bind(null, device, "tap"),
    tapButtonMap: EnumCommand.bind(null, device, "tap-button-map", {
      [ETapButtonMap.LEFT_MIDDLE_RIGHT]: "left-middle-right",
      [ETapButtonMap.LEFT_RIGHT_MIDDLE]: "left-right-middle",
    })
  }

  return inputMap
}

