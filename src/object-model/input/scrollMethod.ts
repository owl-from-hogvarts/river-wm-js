
interface NONE {
  kind: "none"
}

interface TWO_FINGERS {
  kind: "two-finger"
}

interface EDGE {
  kind: "edge"
}

interface BUTTON {
  kind: "button"
  button: string
}

export type EScrollMethod = NONE | TWO_FINGERS | EDGE | BUTTON

