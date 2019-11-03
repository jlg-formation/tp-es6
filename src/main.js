'use strict';

import { Menu } from "./lib/Menu";
import { Header } from "./lib/Header";
import { DrawingBoard } from "./lib/DrawingBoard";

function main() {
  console.log('starting');
  new Header().setTitle('The SVG Editor');

  const board = new DrawingBoard('main');

  const addLine = () => console.log('addLine');
  const cleanAll = () => console.log('cleanAll');

  const menu = new Menu('aside');
  menu.add('button.addLine', addLine);
  menu.add('button.clean', cleanAll);


}

main();
