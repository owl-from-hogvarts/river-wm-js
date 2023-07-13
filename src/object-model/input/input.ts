import { EAccelProfile } from "./accelProfiles.js"
import { EScrollMethod } from "./scrollMethod.js"

export enum EEvents {
  ENABLED,
  DISABLED,
  DISABLED_ON_EXTERNAL_MOUSE
}

export enum EClickMethod {
  NONE,
  BUTTON_AREA,
  CLICK_FINGER
}

export enum ETapButtonMap {
  LEFT_RIGHT_MIDDLE,
  LEFT_MIDDLE_RIGHT
}

/** For documentation refer to libinput and riverctl */ 
export type InputDevice = Partial<{
  events: EEvents,
  accelProfile: EAccelProfile,
  clickMethod: EClickMethod,
  drag: boolean,
  dragLock: boolean,
  disableWhileTyping: boolean,
  middleEmulation: boolean,
  naturalScroll: boolean,
  leftHand: boolean,
  tap: boolean,
  tapButtonMap: ETapButtonMap,
  scrollMethod: EScrollMethod,
}>

/** For documentation refer to libinput and riverctl.
 * 
 * key should be id of input device obtained by `riverctl list-inputs`
 */
export type InputDevices = {
  [key: string]: InputDevice
}
