// abstract class
export class Widget {
  constructor() {
    if (new.target === Widget) {
      throw new TypeError('Cannot instantiate Widget (abstract class)');
    }
  }

  depose() {
    throw new Error('To be implemented');
  }

  select() {
    throw new Error('To be implemented');
  }

  unselect() {
    throw new Error('To be implemented');
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
