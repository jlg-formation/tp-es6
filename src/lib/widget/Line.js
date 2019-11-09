import { SVGUtils, SVGNS } from '../SVGUtils';
import { WidgetEdit } from '../WidgetEdit';
import { WidgetMove } from '../WidgetMove';
import { Widget } from './Widget';

export class Line extends Widget {
  constructor(board) {
    super(board);
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
    selectableLine.addEventListener('click', this.board.selectFromClickEvent(this));
    selectableLine.addEventListener('mousedown', new WidgetMove(this).getMoveCallback());
    this.board.selectable.appendChild(selectableLine);
    this.selectableElt = selectableLine;
  }

  select() {
    // add move point to 2 extremities.
    this.board.removeAllEditionPoint();
    this.board.addEditionPoint('start', this.x1, this.y1, new WidgetEdit(this, 'start').getEditCallback());
    this.board.addEditionPoint('end', this.x2, this.y2, new WidgetEdit(this, 'end').getEditCallback());
  }

  edit(pointName, orig, delta) {
    console.log('pointName: ', pointName);
    console.log('orig: ', orig);
    console.log('delta: ', delta);
    if (pointName === 'start') {
      this.x1 = delta.x + orig.x1;
      this.y1 = delta.y + orig.y1;
      this.elt.setAttribute('x1', this.x1);
      this.elt.setAttribute('y1', this.y1);
      this.selectableElt.setAttribute('x1', this.x1);
      this.selectableElt.setAttribute('y1', this.y1);
      const editionPointElt = this.board.getEditionPointElt(pointName);
      editionPointElt.setAttribute('cx', this.x1);
      editionPointElt.setAttribute('cy', this.y1);
    }
    if (pointName === 'end') {
      this.x2 = delta.x + orig.x2;
      this.y2 = delta.y + orig.y2;
      this.elt.setAttribute('x2', this.x2);
      this.elt.setAttribute('y2', this.y2);
      this.selectableElt.setAttribute('x2', this.x2);
      this.selectableElt.setAttribute('y2', this.y2);
      const editionPointElt = this.board.getEditionPointElt(pointName);
      editionPointElt.setAttribute('cx', this.x2);
      editionPointElt.setAttribute('cy', this.y2);
    }
  }

  move(orig, delta) {
    this.unselect();
    console.log('orig: ', orig);
    console.log('delta: ', delta);
    this.x1 = delta.x + orig.x1;
    this.y1 = delta.y + orig.y1;
    this.x2 = delta.x + orig.x2;
    this.y2 = delta.y + orig.y2;
    const line = this.elt;
    line.setAttribute('x1', this.x1);
    line.setAttribute('y1', this.y1);
    line.setAttribute('x2', this.x2);
    line.setAttribute('y2', this.y2);
    const sline = this.selectableElt;
    sline.setAttribute('x1', this.x1);
    sline.setAttribute('y1', this.y1);
    sline.setAttribute('x2', this.x2);
    sline.setAttribute('y2', this.y2);
  }
}
