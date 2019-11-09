import { Mode, printMode } from './Mode';

export class DrawingBoard {
  constructor(selector) {
    this.elt = document.querySelector(selector);

    // we add drawing-board class in order to let the DrawingBoard.css file to be applied.
    this.elt.classList.add('drawing-board');

    // initializing to SVG and mode DIV.
    this.elt.innerHTML = '<svg></svg><div class="mode"></div>';
    this.svg = this.elt.querySelector('svg');

    this.modeElt = this.elt.querySelector('.mode');
    this.mode = Mode.DEFAULT;

    // onclick
    this.svg.addEventListener('click', this.onClick.bind(this));
  }

  set mode(val) {
    this._mode = val;
    // trigger class update.
    for (const v of Mode) {
      this.elt.classList.remove(v);
    }
    this.elt.classList.add(val.description);
    this.modeElt.innerHTML = printMode`Actual Mode is ${this._mode}`;
  }

  get mode() {
    return this._mode;
  }

  prepareForInsert(widget) {
    this.mode = Mode.WIDGET_INSERT;
    this.widget = widget;
  }

  onClick(event) {
    if (this.mode === Mode.WIDGET_INSERT) {
      this.widget.depose(event);
      this.mode = Mode.DEFAULT;
      return;
    }
  }
}
