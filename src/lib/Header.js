const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export class Header {
  constructor(selector) {
    this.elt = document.querySelector(selector);
    this.initEffectOnTitle();
  }

  setTitle(title) {
    this.elt.querySelector('.title').innerHTML = title;
  }

  initEffectOnTitle() {
    this.elt.querySelector('.title').addEventListener('click', this.onClick.bind(this));
  }

  async onClick() {
    const titleElt = this.elt.querySelector('.title');
    const title = titleElt.innerHTML;
    console.log('onclick', title);

    for (let i = 0; i <= title.length; i++) {
      await sleep(200);

      const [before, letter, after] = [title.substr(0, i), title.substr(i, 1), title.substr(i + 1)];
      const niceTitle = `${before}<span style="color: red">${letter}</span>${after}`;
      titleElt.innerHTML = niceTitle;
    }
  }
}
