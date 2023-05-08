

const colorRegex = /0x[0-9a-f]{6}/ui

export class Color {
  public readonly color: string;

  constructor(color: string) {
    if (!colorRegex.test(color)) {
      throw new Error(`wrong color string! expected something like "0x11aAFf" Got ${color}`)
    }

    this.color = color
  }
}

