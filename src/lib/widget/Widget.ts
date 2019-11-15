import { DrawingBoard } from '../DrawingBoard';
import { Vector } from '../interface/Vector';

// abstract class
export abstract class Widget {
  constructor(protected board: DrawingBoard) {}

  depose(event: Event) {
    throw new Error('To be implemented');
  }

  select() {
    throw new Error('To be implemented');
  }

  unselect() {
    this.board.removeAllEditionPoint();
  }

  edit(pointName: string, orig: any, delta: Vector) {
    throw new Error('To be implemented');
  }

  getType() {
    return this.constructor.name;
  }

  getOrigin() {
    return { ...this };
  }

  move(orig: any, delta: Vector) {
    throw new Error('To be implemented');
  }
}
