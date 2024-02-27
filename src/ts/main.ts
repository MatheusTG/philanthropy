import SlideConfig from './slide/slide';
import Turmas from './home/Turmas';
import Menu from './home/Menu';
import ScrollAnima from './helper/ScrollAnima';

// Slides dos slide
const slide = new SlideConfig('.slide-container', '.slide', '.slide-controls');
slide.init();
slide.connectControls();

// Turmas no header
const turmas = new Turmas('[data-turma="container"]');
turmas.init();

// Menu do site
const menu = new Menu(
  '[data-menu="abrir"]',
  '[data-menu="fechar"]',
  '[data-menu="container"]'
);
menu.init();

const scrollAnima = new ScrollAnima('[data-anima="scroll"]');
scrollAnima.init();
