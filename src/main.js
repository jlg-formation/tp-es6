import { Menu } from './lib/Menu';
import { Header } from './lib/Header';
import { DrawingBoard } from './lib/DrawingBoard';
import { Line } from './lib/widget/Line';

function main() {
  console.log('starting');
  new Header('header').setTitle('The SVG Editor');

  const board = new DrawingBoard('main');
  console.log('board: ', board);

  const addLine = () => board.prepareForInsert(new Line(board));
  const cleanAll = board.clean.bind(board);

  const menu = new Menu('aside');
  menu.add('button.addLine', addLine);
  menu.add('button.clean', cleanAll);
}

main();
