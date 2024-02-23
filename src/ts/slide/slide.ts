import debounce from '../helper/debounce';

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

  index: {
    prev: number | null;
    active: number;
    next: number | null;
  };

  activeClass: string;
  constructor(container: string, slide: string) {
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);

    this.dataSlideMove = {
      startX: 0,
      movement: 0,
      currentPosition: 0,
    };

    this.slideArray = [];
    this.index = {
      prev: 2,
      active: 3,
      next: 4,
    };

    this.activeClass = 'active';
  }

  transition(active: boolean) {
    if (this.slide) {
      if (active) {
        this.slide.style.transition = 'transform 0.5s';
      } else {
        this.slide.style.transition = '';
      }
    }
  }

  addActiveClass(index: number) {
    // Remove a activeClass de todos os slides
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
    });

    // Adiciona a activeClass no slide ativo
    const slideAtivo = this.slideArray[index].element;
    slideAtivo.classList.add(this.activeClass);
  }

  setSlidePosition() {
    if (this.slide) {
      const slides = Array.from(this.slide.children);

      slides.forEach((element, index) => {
        if (element instanceof HTMLElement) {
          const slideMargin =
            (document.documentElement.clientWidth - element.offsetWidth) / 2;
          this.slideArray[index] = {
            element,
            position: slideMargin + element.offsetLeft * -1,
          };
        }
      });
    }
  }

  setSlideIndex(index: number) {
    this.index = {
      prev: index - 1 ? index - 1 : null,
      active: index,
      next: index + 1 <= this.slideArray.length ? index + 1 : null,
    };
  }

  changeSlide(index: number) {
    const position = this.slideArray[index - 1].position;
    this.moveSlide(position);

    // Atualiza a posição atual do slide
    this.dataSlideMove.currentPosition = position;

    // Atualiza os valores de self.index
    this.setSlideIndex(index);

    this.addActiveClass(this.index.active - 1);
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
    this.transition(false);

    if (event instanceof MouseEvent) {
      event.preventDefault();
      this.dataSlideMove.startX = event.clientX;
      window.addEventListener('mouseup', this.onEnd);
    } else if (event instanceof TouchEvent) {
      this.dataSlideMove.startX = event.changedTouches[0].clientX;
      window.addEventListener('touchend', this.onEnd);
    }

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.addEventListener(eventType, this.onMove);
  }

  onEnd(event: Event) {
    this.transition(true);

    this.dataSlideMove.currentPosition += this.dataSlideMove.movement;

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.removeEventListener(eventType, this.onMove);

    if (this.dataSlideMove.movement > 10 || this.dataSlideMove.movement < -10) {
      if (this.dataSlideMove.movement > 120) this.prev();
      else if (this.dataSlideMove.movement < -120) this.next();
      else this.changeSlide(this.index.active);

      this.dataSlideMove.movement = 0;
    }

    window.removeEventListener('mouseup', this.onEnd);
    window.removeEventListener('touchend', this.onEnd);
  }

  prev() {
    if (this.index.prev) {
      this.changeSlide(this.index.prev);
    } else {
      this.changeSlide(this.index.active);
    }
  }

  next() {
    if (this.index.next) {
      this.changeSlide(this.index.next);
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.container?.addEventListener('mousedown', this.onStart);
    this.container?.addEventListener('touchstart', this.onStart);
  }

  onResize() {
    setTimeout(() => {
      this.setSlidePosition();
      this.changeSlide(this.index.active);
    }, 200);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.addResizeEvent();
    this.setSlidePosition();
    this.transition(true);
    this.changeSlide(3);
  }
}
