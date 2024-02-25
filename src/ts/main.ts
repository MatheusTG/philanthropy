import SlideConfig from './slide/slide';
import Turmas from './header/Turmas';

const slide = new SlideConfig('.slide-container', '.slide', '.slide-controls');
slide.init();
slide.connectControls();

const turmas = new Turmas('[data-turma="container"]');
turmas.init();
 