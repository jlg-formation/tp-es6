import { Mode, printMode } from './Mode';
import { SVGUtils } from './SVGUtils';
import { EditionPoint } from './EditionPoint';

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

    // adding 3 groups for the editor :
    this.content = SVGUtils.addGroup(this.svg, 'content'); // where the real SVG stuff are
    this.selectable = SVGUtils.addGroup(this.svg, 'selectable'); // the selection areas
    this.edition = SVGUtils.addGroup(this.svg, 'edition'); // where the edition points will be
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
    if (this.mode === Mode.WIDGET_SELECTED) {
      this.widget.unselect();
      this.mode = Mode.DEFAULT;
      return;
    }
  }

  selectFromClickEvent(widget) {
    return event => {
      // important for not unselecting just after selecting.
      event.stopPropagation();
      this.select(widget);
    };
  }

  select(widget) {
    this.mode = Mode.WIDGET_SELECTED;
    this.widget = widget;
    this.widget.select();
  }

  addEditionPoint(label, x, y) {
    const group = new EditionPoint(x, y, { label }).group;
    this.edition.appendChild(group);
  }

  removeAllEditionPoint() {
    SVGUtils.removeAllChildren(this.edition);
  }
}
