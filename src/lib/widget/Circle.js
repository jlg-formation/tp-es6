import { SVGUtils, SVGNS } from '../SVGUtils';
import { WidgetEdit } from '../WidgetEdit';
import { WidgetMove } from '../WidgetMove';
import { Widget } from './Widget';

export class Circle extends Widget {
  constructor(board) {
    super(board);
    this.elt = undefined;
    this.selectableElt = undefined;
  }

  depose(event) {
    console.log('event: ', event);
    const { x, y } = SVGUtils.getCoordinates(event);
    this.cx = x;
    this.cy = y;
    this.r = 50;

    const circle = document.createElementNS(SVGNS, 'circle');
    circle.setAttribute('cx', this.cx);
    circle.setAttribute('cy', this.cy);
    circle.setAttribute('r', this.r);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('fill', 'transparent');
    this.board.content.appendChild(circle);
    this.elt = circle;

    // selectable
    const selectableCircle = document.createElementNS(SVGNS, 'circle');
    selectableCircle.setAttribute('cx', this.cx);
    selectableCircle.setAttribute('cy', this.cy);
    selectableCircle.setAttribute('r', this.r);
    selectableCircle.setAttribute('stroke', 'transparent');
    selectableCircle.setAttribute('stroke-width', '20');
    selectableCircle.setAttribute('fill', 'transparent');
    selectableCircle.addEventListener('click', this.board.selectFromClickEvent(this));
    selectableCircle.addEventListener('mousedown', new WidgetMove(this).getMoveCallback());
    this.board.selectable.appendChild(selectableCircle);
    this.selectableElt = selectableCircle;
  }

  select() {
    // add move point to 2 extremities.
    this.board.removeAllEditionPoint();
    this.board.addEditionPoint('center', this.cx, this.cy, new WidgetEdit(this, 'center').getEditCallback());
    this.board.addEditionPoint('top', this.cx, this.cy - this.r, new WidgetEdit(this, 'top').getEditCallback());
  }

  edit(pointName, orig, delta) {
    console.log('pointName: ', pointName);
    console.log('orig: ', orig);
    console.log('delta: ', delta);
    if (pointName === 'center') {
      // move
      this.cx = delta.x + orig.cx;
      this.cy = delta.y + orig.cy;
      this.elt.setAttribute('cx', this.cx);
      this.elt.setAttribute('cy', this.cy);
      this.selectableElt.setAttribute('cx', this.cx);
      this.selectableElt.setAttribute('cy', this.cy);
      const editionPointElt = this.board.getEditionPointElt('center');
      editionPointElt.setAttribute('cx', this.cx);
      editionPointElt.setAttribute('cy', this.cy);
      const topElt = this.board.getEditionPointElt('top');
      topElt.setAttribute('cx', this.cx);
      topElt.setAttribute('cy', this.cy - this.r);
    }
    if (pointName === 'top') {
      // zoom
      const top = { x: orig.cx + delta.x, y: orig.cy - orig.r + delta.y };

      this.r = Math.sqrt((top.x - orig.cx) ** 2 + (top.y - orig.cy) ** 2);
      this.elt.setAttribute('r', this.r);
      this.selectableElt.setAttribute('r', this.r);
      const topElt = this.board.getEditionPointElt('top');
      topElt.setAttribute('cx', top.x);
      topElt.setAttribute('cy', top.y);
    }
  }

  move(orig, delta) {
    this.unselect();
    console.log('orig: ', orig);
    console.log('delta: ', delta);
    this.cx = delta.x + orig.cx;
    this.cy = delta.y + orig.cy;
    const circle = this.elt;
    circle.setAttribute('cx', this.cx);
    circle.setAttribute('cy', this.cy);
    const scircle = this.selectableElt;
    scircle.setAttribute('cx', this.cx);
    scircle.setAttribute('cy', this.cy);
  }
}
