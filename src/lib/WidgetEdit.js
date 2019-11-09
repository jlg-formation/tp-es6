import { Mode } from './Mode';

export class WidgetEdit {
  constructor(widget, pointName) {
    this.widget = widget;
    this.pointName = pointName;
    console.log('new widgetedit on ', this.widget, this.pointName);
    this.orig = undefined;
  }

  getEditCallback() {
    return event => {
      console.log('mousedown', this.widget.getType());
      event.preventDefault();
      event.stopPropagation();

      this.orig = this.widget.getOrigin();
      const startX = event.pageX;
      const startY = event.pageY;

      const mousemove = event => {
        this.widget.edit(this.pointName, this.orig, { x: event.pageX - startX, y: event.pageY - startY });
        this.widget.board.mode = Mode.WIDGET_EDITING;
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);

      function mouseup() {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      }
    };
  }
}
