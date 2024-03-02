export default class ProvasControls {
  controls: HTMLElement[];
  provas: HTMLElement[];
  activeClass: string;
  constructor(SelectorControls: string, SelectorProvas: string) {
    const controls = document.querySelectorAll<HTMLElement>(SelectorControls);
    this.controls = Array.from(controls);

    const provas = document.querySelectorAll<HTMLElement>(SelectorProvas);
    this.provas = Array.from(provas);

    this.activeClass = 'active';
  }

  activeProva(index: number) {
    this.provas.forEach((prova, index) => {
      prova.classList.remove(this.activeClass);
      this.controls[index].classList.remove(this.activeClass);
    });
    this.provas[index].classList.add(this.activeClass);

    this.controls[index].classList.add(this.activeClass);
  }

  onClick(event: Event) {
    if (event.currentTarget instanceof HTMLElement) {
      const index = this.controls.indexOf(event.currentTarget);
      this.activeProva(index);
    }
  }

  addControlsEvent() {
    this.controls.forEach((control) => {
      control.addEventListener('click', this.onClick);
      control.addEventListener('touchstart', this.onClick);
    });
  }

  init() {
    this.onClick = this.onClick.bind(this);
    this.addControlsEvent();
    this.activeProva(3);
  }
}
