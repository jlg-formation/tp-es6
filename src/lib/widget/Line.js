import { SVGUtils, SVGNS } from '../SVGUtils';

export class Line {
  constructor(board) {
    this.board = board;
    this.elt = undefined;
    this.selectableElt = undefined;
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
    this.board.content.appendChild(line);
    this.elt = line;

    // selectable
    const selectableLine = document.createElementNS(SVGNS, 'line');
    selectableLine.setAttribute('x1', this.x1);
    selectableLine.setAttribute('x2', this.x2);
    selectableLine.setAttribute('y1', this.y1);
    selectableLine.setAttribute('y2', this.y2);
    selectableLine.setAttribute('stroke', 'transparent');
    selectableLine.setAttribute('stroke-width', '20');
    selectableLine.setAttribute('fill', 'transparent');
    selectableLine.addEventListener(
      'click',
      this.board.selectFromClickEvent(this)
    );
    this.board.selectable.appendChild(selectableLine);
    this.selectableElt = selectableLine;
  }

  select() {
    // add move point to 2 extremities.
    this.board.removeAllEditionPoint();
    this.board.addEditionPoint('start', this.x1, this.y1);
    this.board.addEditionPoint('end', this.x2, this.y2);
  }

  unselect() {
    this.board.removeAllEditionPoint();
  }
}
