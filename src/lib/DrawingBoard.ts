import { Mode, printMode } from './Mode';
import { SVGUtils } from './SVGUtils';
import { EditionPoint } from './EditionPoint';
import { Widget } from './widget/Widget';

export class DrawingBoard {
  elt: HTMLElement;
  svg: SVGSVGElement;
  modeElt: HTMLElement;
  content: SVGGElement;
  selectable: SVGGElement;
  edition: SVGGElement;
  private _mode: string;
  widget: Widget;

  constructor(selector: string) {
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

  set mode(val: string) {
    this._mode = val;
    // trigger class update.
    for (const v of Mode) {
      this.elt.classList.remove(v);
    }
    this.elt.classList.add(val);
    this.modeElt.innerHTML = printMode`Actual Mode is ${this._mode}`;
  }

  get mode() {
    return this._mode;
  }

  prepareForInsert(widget: Widget) {
    this.mode = Mode.WIDGET_INSERT;
    this.widget = widget;
  }

  onClick(event: Event) {
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
    if (this.mode === Mode.WIDGET_EDITING) {
      this.mode = Mode.WIDGET_SELECTED;
      return;
    }
  }

  selectFromClickEvent(widget: Widget) {
    return (event: Event) => {
      // important for not unselecting just after selecting.
      event.stopPropagation();
      this.select(widget);
    };
  }

  select(widget: Widget) {
    this.mode = Mode.WIDGET_SELECTED;
    this.widget = widget;
    this.widget.select();
  }

  addEditionPoint(label: string, x: number, y: number, onClickFn: (evt: Event) => undefined) {
    const group = new EditionPoint(x, y, { label, onMouseDownFn: onClickFn }).group;
    this.edition.appendChild(group);
  }

  removeAllEditionPoint() {
    SVGUtils.removeAllChildren(this.edition);
  }

  getEditionPointElt(label: string) {
    return this.edition.querySelector(`g.${label} circle`);
  }

  clean() {
    this.mode = Mode.DEFAULT;
    SVGUtils.removeAllChildren(this.content);
    SVGUtils.removeAllChildren(this.selectable);
    SVGUtils.removeAllChildren(this.edition);
  }
}
