export class Ladder {
  private _bottom: number;
  private _top: number;
  private _name: string;

  constructor(bottom: number, top: number, name: string) {
    this._bottom = bottom;
    this._top = top;
    this._name = name;

    if (top <= 0 || bottom < 0 || top <= bottom) {
      throw new Error(
        'Error: Input Validation Failed. Ladder parameters are invalid.',
      );
    }

    return;
  }

  get bottom(): number {
    return this._bottom;
  }

  get top(): number {
    return this._top;
  }
}
