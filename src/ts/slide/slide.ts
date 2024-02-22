export default class Slide {
  container: HTMLElement | null;
  slide: HTMLElement | null;

  dataSlideMove: {
    startX: number; // Posição inicial do clique
    movement: number; // Movimento total do mouse pós clique
    currentPosition: number; // Translate atual do slide
  };

  slideArray: {
    element: HTMLElement;
    position: number;
  }[];
  constructor(container: string, slide: string) {
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);

    this.dataSlideMove = {
      startX: 0,
      movement: 0,
      currentPosition: 0,
    };

    this.slideArray = [];
  }

  findSlidePosition() {
    if (this.slide) {
      const slides = Array.from(this.slide.children);

      slides.forEach((element) => {
        if (element instanceof HTMLElement) {
          const slideMargin =
            (document.documentElement.clientWidth - element.offsetWidth) / 2;
          this.slideArray.push({
            element,
            position: slideMargin + element.offsetLeft * -1,
          });
        }
      });
    }
  }

  changeSlide(index: number) {
    const position = this.slideArray[index - 1].position;
    this.moveSlide(position);
    this.dataSlideMove.currentPosition = position;
  }

  moveSlide(distX: number) {
    this.slide!.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onMove(event: Event) {
    let pointerPosition;
    if (event instanceof MouseEvent) pointerPosition = event.clientX;
    if (event instanceof TouchEvent) {
      pointerPosition = event.changedTouches[0].clientX;
    }

    this.dataSlideMove.movement =
      (this.dataSlideMove.startX - pointerPosition!) * -1.6;
    this.moveSlide(
      this.dataSlideMove.currentPosition + this.dataSlideMove.movement
    );
  }

  onStart(event: Event) {
    if (event instanceof MouseEvent) {
      event.preventDefault();
      this.dataSlideMove.startX = event.clientX;
    } else if (event instanceof TouchEvent) {
      this.dataSlideMove.startX = event.changedTouches[0].clientX;
    }

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.addEventListener(eventType, this.onMove);
  }

  onEnd(event: Event) {
    this.dataSlideMove.currentPosition += this.dataSlideMove.movement;

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.removeEventListener(eventType, this.onMove);
  }

  addSlideEvents() {
    this.container?.addEventListener('mousedown', this.onStart);
    this.container?.addEventListener('touchstart', this.onStart);
    this.container?.addEventListener('mouseup', this.onEnd);
    this.container?.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.findSlidePosition();
    this.changeSlide(3);
  }
}
