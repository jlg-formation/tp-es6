// abstract class
export class Widget {
  constructor(board) {
    if (new.target === Widget) {
      throw new TypeError('Cannot instantiate Widget (abstract class)');
    }
    this.board = board;
  }

  depose() {
    throw new Error('To be implemented');
  }

  select() {
    throw new Error('To be implemented');
  }

  unselect() {
    this.board.removeAllEditionPoint();
  }

  edit(pointName, orig, delta) {
    throw new Error('To be implemented');
  }

  getType() {
    return this.constructor.name;
  }

  getOrigin() {
    return { ...this };
  }

  move(orig, delta) {
    throw new Error('To be implemented');
  }
}
