import { Mode } from './Mode';

export class DrawingBoard {
  constructor(selector) {
    this.elt = document.querySelector(selector);
    this.mode = Mode.DEFAULT;

    // we add drawing-board class in order to let the DrawingBoard.css file to be applied.
    this.elt.classList.add('drawing-board');

    // initializing to SVG and mode DIV.
    this.elt.innerHTML = '<svg></svg><div class="mode"></div>';
    this.svg = this.elt.querySelector('svg');
    this.modeElt = this.elt.querySelector('.mode');

    this.refreshMode();
  }

  refreshMode() {
    this.modeElt.innerHTML = this.mode;
  }
}
