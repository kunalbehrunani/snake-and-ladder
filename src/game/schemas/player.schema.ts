export class Player {
  private _firstName: string;
  private _lastName: string;
  private _userName: string;

  constructor(firstName: string, lastName: string, userName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._userName = userName;
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
}
