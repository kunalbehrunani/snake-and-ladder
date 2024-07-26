export class Snake {
  private _head: number;
  private _tail: number;
  private _name: string;

  constructor(head: number, tail: number, name: string) {
    this._head = head;
    this._tail = tail;
    this._name = name;

    if (head <= tail) {
      throw new Error(
        'Error: Input Validation Failed. Snake parameters are invalid.',
      );
    }

    return;
  }

  get head(): number {
    return this.head;
  }

  get tail(): number {
    return this.tail;
  }
}
