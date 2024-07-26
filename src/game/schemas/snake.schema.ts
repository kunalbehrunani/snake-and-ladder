export class Snake {
  private _head: number;
  private _tail: number;
  private _name: string;

  constructor(head: number, tail: number, name: string) {
    this._head = head;
    this._tail = tail;
    this._name = name;
    return;
  }
}
