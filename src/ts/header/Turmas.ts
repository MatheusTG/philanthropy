export default class Turmas {
  turmaContainer: HTMLElement | null;
  turmaButtons: HTMLElement[] | null;
  activeClass: string;
  constructor(turmaContainer: string) {
    // Container
    this.turmaContainer = document.querySelector(turmaContainer);

    if (this.turmaContainer) {
      // Buttons do container
      this.turmaButtons = <HTMLElement[]>(
        Array.from(this.turmaContainer?.children)
      );
    } else {
      this.turmaButtons = null;
    }

    this.activeClass = 'active';
  }

  activeButton(index: number) {
    this.turmaButtons?.forEach((button) => {
      button.classList.remove(this.activeClass);
    });
    if (this.turmaButtons) {
      this.turmaButtons[index].classList.add(this.activeClass);
    }
  }

  // Aciona qual uns dos botões for clicado
  onClick(event: Event) {
    if (this.turmaButtons && event) {
      if (event.currentTarget instanceof HTMLElement) {
        const index = this.turmaButtons.indexOf(event.currentTarget);

        // verifica se o botão clicado está ativo no momento
        const isAtivo = this.turmaButtons[index].classList.contains(
          this.activeClass
        );
        if (isAtivo) {
          this.turmaContainer?.classList.toggle(this.activeClass);
        } else {
          this.activeButton(index);
          this.turmaContainer?.classList.remove(this.activeClass);
        }
      }
    }
  }

  addButtonsEvent() {
    this.turmaButtons?.forEach((button) => {
      button.addEventListener('click', this.onClick);
    });
  }

  bindEvents() {
    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.bindEvents();
    this.addButtonsEvent();
    this.activeButton(1);
  }
}
