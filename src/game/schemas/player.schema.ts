export class Player {
  private _firstName: string;
  private _lastName: string;
  private _userName: string;
  private _position: number;

  constructor(firstName: string, lastName: string, userName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._userName = userName;
    this._position = 0;
    return;
  }

  get userName(): string {
    return this._userName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get position() {
    return this._position;
  }

  set position(newPosition: number) {
    this._position = newPosition;
    return;
  }
}
