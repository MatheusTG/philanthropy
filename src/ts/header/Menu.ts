import OutsideClick from '../helper/OutsideClick';

export default class Menu {
  buttonOpen: HTMLElement | null;
  buttonClose: HTMLElement | null;
  menuContainer: HTMLElement | null;
  activeClass: string;
  outsideClick: OutsideClick;
  events: string[];
  constructor(
    selectorOpen: string,
    selectorClose: string,
    selectorContainer: string
  ) {
    this.buttonOpen = document.querySelector(selectorOpen);
    this.buttonClose = document.querySelector(selectorClose);
    this.menuContainer = document.querySelector(selectorContainer);
    this.activeClass = 'active';
    this.events = ['click', 'touchstart'];

    this.outsideClick = new OutsideClick(selectorContainer, this.events, () => {
      this.closeMenu();
    });
  }

  activeMenu() {
    this.menuContainer?.classList.add(this.activeClass);
    console.log(this.menuContainer?.classList);
  }

  closeMenu(event?: Event) {
    // O if executa se o buttonClose for clicado
    if (event) {
      this.outsideClick.removeOutsideEvents();
      this.events.forEach((userEvent) => {
        this.buttonClose?.removeEventListener(userEvent, this.closeMenu);
      });
    }
    this.menuContainer?.classList.remove(this.activeClass);
  }

  openMenu(event: Event) {
    event.preventDefault();
    // O if faz com que o menu feche se o buttonOpen for
    // clicado com o menu aberto
    if (!this.menuContainer?.classList.contains(this.activeClass)) {
      this.activeMenu();
      if (this.menuContainer) {
        this.outsideClick.addOutsideEvents();
      }
      // Adiciona evento click ao buttonClose para fechar o menu
      this.events.forEach((userEvent) => {
        this.buttonClose?.addEventListener(userEvent, this.closeMenu);
      });
    }
  }

  addMenuEvents() {
    this.events.forEach((userEvent) => {
      this.buttonOpen?.addEventListener(userEvent, this.openMenu);
    });
  }

  bindEvents() {
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  init() {
    this.bindEvents();
    this.addMenuEvents();
  }
}
