export class Header {
  constructor(selector) {
    this.elt = document.querySelector('header');
  }

  setTitle(title) {
    this.elt.querySelector('.title').innerHTML = title;
  }
}
