export interface ICommand {
  readonly command: string;
  readonly args: string[];

  toCommandString(): string;
}
