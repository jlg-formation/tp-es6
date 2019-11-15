// Symbol example (in fact it is just to play with them but not required...)
// The Mode must be iterable, so we add the Symbol.iterator method as a generator.

export class Mode {
  static DEFAULT = 'mode-default';
  static WIDGET_INSERT = 'mode-widget-insert';
  static WIDGET_SELECTED = 'mode-widget-selected';
  static WIDGET_EDITING = 'mode-widget-editing';

  // to transform mode into a generator itself.
  static *[Symbol.iterator]() {
    for (const v of Object.values(Mode)) {
      yield v.description;
    }
  }
};

// custom template
export const printMode = (strings: TemplateStringsArray, mode: string) => {
  return strings[0] + mode.toUpperCase();
};
