'use strict';

import { Menu } from "./lib/Menu";

function main() {
  console.log('starting');
  const title = 'SVG Editor';
  document.querySelector('header span.title').innerHTML = title;

  const addLine = () => console.log('addLine');
  const cleanAll = () => console.log('cleanAll');

  const menu = new Menu('aside');
  menu.add('button.addLine', addLine);
  menu.add('button.clean', cleanAll);
}

main();
