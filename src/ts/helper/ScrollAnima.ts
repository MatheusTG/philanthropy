import debounce from './debounce';

export default class ScrollAnima {
  sections: HTMLElement[];
  sectionsDistance: {
    element: HTMLElement;
    distance: number;
  }[];
  activeClass: string;
  constructor(selectorSections: string, activeClass: string) {
    const sections = document.querySelectorAll(selectorSections);
    this.sections = sections ? <HTMLElement[]>Array.from(sections) : [];

    this.sectionsDistance = [];

    this.activeClass = activeClass;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  getDistance() {
    this.sectionsDistance = this.sections.map((element) => {
      return {
        element,
        distance: element.offsetTop - window.innerHeight * 0.6,
      };
    });
  }

  checkDistance() {
    this.sectionsDistance.forEach((item) => {
      if (!item.element.classList.contains(this.activeClass)) {
        const isSectionVisible = window.scrollY > item.distance;
        if (isSectionVisible) {
          item.element.classList.add(this.activeClass);
        }
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this
  }
}
