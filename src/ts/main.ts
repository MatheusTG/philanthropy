import SlideConfig from './slide/slide';

const slide = new SlideConfig('.slide-container', '.slide', '.slide-controls');
slide.init();
slide.connectControls();

function darOi() {
  console.log('oi')
}