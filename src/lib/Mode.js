// Symbol example (in fact it is just to play with them but not required...)
// The Mode must be iterable, so we add the Symbol.iterator method as a generator.

export const Mode = Object.freeze({
  DEFAULT: Symbol('mode-default'),
  WIDGET_INSERT: Symbol('mode-widget-insert'),
  WIDGET_SELECTED: Symbol('mode-widget-selected'),
  WIDGET_EDITING: Symbol('mode-widget-editing'),

  // to transform mode into a generator itself.
  *[Symbol.iterator]() {
    for (const v of Object.values(this)) {
      yield v.description;
    }
  },
});

// custom template
export const printMode = (strings, mode) => {
  return strings[0] + mode.description.toUpperCase();
};
