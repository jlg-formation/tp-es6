import { SVGUtils, SVGNS } from '../SVGUtils';

export class Line {
  constructor(board) {
    this.board = board;
    this.elt = undefined;
  }

  depose(event) {
    console.log('event: ', event);
    const { x, y } = SVGUtils.getCoordinates(event);
    this.x1 = x;
    this.y1 = y;
    this.x2 = this.x1 + 100;
    this.y2 = this.y1 + 100;

    const line = document.createElementNS(SVGNS, 'line');
    line.setAttribute('x1', this.x1);
    line.setAttribute('x2', this.x2);
    line.setAttribute('y1', this.y1);
    line.setAttribute('y2', this.y2);
    line.setAttribute('stroke', 'black');
    this.board.svg.appendChild(line);
    this.elt = line;
  }
}
