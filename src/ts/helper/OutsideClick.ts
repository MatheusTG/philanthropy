export default class OutsideClick {
  element: HTMLElement | null;
  events: string[];
  callback: (...args: any[]) => void;
  outside: HTMLElement;
  constructor(
    selectoEelement: string,
    events: string[],
    callback: (...args: any[]) => void
  ) {
    this.element = document.querySelector(selectoEelement);
    this.events = events;
    this.callback = callback;
    this.outside = document.documentElement;
  }

  handleOutsideClick(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (!this.element?.contains(event.target)) {
        this.removeOutsideEvents();
        this.callback();
      }
    }
  }

  addOutsideEvents() {
    this.events.forEach((userEvent) => {
      setTimeout(() =>
        this.outside.addEventListener(userEvent, this.handleOutsideClick)
      );
    });
  }

  removeOutsideEvents() {
    this.events.forEach((userEvent) => {
      this.outside.removeEventListener(userEvent, this.handleOutsideClick);
    });
  }

  init() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.addOutsideEvents();
  }
}
