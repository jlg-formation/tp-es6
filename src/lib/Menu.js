export class Menu {
  constructor(selector) {
    this.elt = document.querySelector(selector);
  }

  add(selector, callback) {
    this.elt.querySelector(selector).addEventListener('click', callback);
  }
}
