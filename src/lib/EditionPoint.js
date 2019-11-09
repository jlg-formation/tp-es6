import { SVGNS } from './SVGUtils';

export class EditionPoint {
  // use of parameter context matching
  constructor(x, y, { label = 'tobedefined' }) {
    this.group = document.createElementNS(SVGNS, 'g');
    this.group.setAttribute('class', label);

    const circle = document.createElementNS(SVGNS, 'circle');
    circle.setAttribute('r', 3);
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('fill', 'white');
    circle.setAttribute('stroke', 'black');
    this.group.appendChild(circle);
  }
}
