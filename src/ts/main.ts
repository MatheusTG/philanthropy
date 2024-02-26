import SlideConfig from './slide/slide';
import Turmas from './header/Turmas';
import Menu from './header/Menu';

const slide = new SlideConfig('.slide-container', '.slide', '.slide-controls');
slide.init();
slide.connectControls();

const turmas = new Turmas('[data-turma="container"]');
turmas.init();

const menu = new Menu(
  '[data-menu="abrir"]',
  '[data-menu="fechar"]',
  '[data-menu="container"]'
);
menu.init();
