
interface NONE {
  kind: "none"
}

interface FLAT {
  kind: "flat"
}

interface ADAPTIVE {
  kind: "adaptive"
  factor: number
}

export type EAccelProfile = NONE | FLAT | ADAPTIVE

