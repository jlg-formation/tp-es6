import { SVGNS } from './SVGUtils';

export class EditionPoint {
  // use of parameter context matching
  constructor(x, y, { label = 'tobedefined', onMouseDownFn = evt => {} }) {
    this.group = document.createElementNS(SVGNS, 'g');
    this.group.setAttribute('class', label);

    const circle = document.createElementNS(SVGNS, 'circle');
    circle.setAttribute('r', 3);
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('fill', 'white');
    circle.setAttribute('stroke', 'black');
    this.group.appendChild(circle);

    const clickableArea = document.createElementNS(SVGNS, 'circle');
    clickableArea.setAttribute('r', 10);
    clickableArea.setAttribute('cx', x);
    clickableArea.setAttribute('cy', y);
    clickableArea.setAttribute('fill', 'transparent');
    clickableArea.setAttribute('stroke', 'transparent');
    clickableArea.setAttribute('class', 'clickable');
    clickableArea.addEventListener('mousedown', event => {
      event.stopPropagation();
      onMouseDownFn(event);
    });
    this.group.appendChild(clickableArea);
  }
}
