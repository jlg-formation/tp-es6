export class Header {
  constructor(selector) {
    this.elt = document.querySelector(selector);
  }

  setTitle(title) {
    this.elt.querySelector('.title').innerHTML = title;
  }
}
