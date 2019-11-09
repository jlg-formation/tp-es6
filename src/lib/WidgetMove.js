export class WidgetMove {
  constructor(widget) {
    this.widget = widget;
    console.log('new widgetmove on ', this.widget);
    this.orig = undefined;
  }

  getMoveCallback() {
    return event => {
      console.log('mousedown', this.widget.getType());
      event.preventDefault();
      event.stopPropagation();

      this.orig = this.widget.getOrigin();
      const startX = event.pageX;
      const startY = event.pageY;

      const mousemove = event => {
        this.widget.move(this.orig, { x: event.pageX - startX, y: event.pageY - startY });
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
