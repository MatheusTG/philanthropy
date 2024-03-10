import OutsideClick from '../helper/OutsideClick';

export default class LoginCadastroTool {
  buttonOpenLogin: HTMLElement[];
  buttonOpenCadastro: HTMLElement[];
  buttonClose: HTMLElement | null;
  container: HTMLElement | null;
  loginContent: HTMLElement | null;
  cadastroContent: HTMLElement | null;
  userEvents: string[];
  activeClass: 'active';
  outsideClick: OutsideClick;
  constructor(
    selectorButtonOpenLogin: string,
    selectorButtonOpenCadastro: string,
    selectorButtonClose: string,
    selectorContainer: string,
    selectorLoginContainer: string,
    selectorCadastroContainer: string
  ) {
    // Botões para abrir login
    const buttonOpenLogin = document.querySelectorAll<HTMLElement>(
      selectorButtonOpenLogin
    );
    this.buttonOpenLogin = Array.from(buttonOpenLogin);

    // Botões para abrir Cadastro
    const buttonOpenCadastro = document.querySelectorAll<HTMLElement>(
      selectorButtonOpenCadastro
    );
    this.buttonOpenCadastro = Array.from(buttonOpenCadastro);

    // Button de fechar no canto
    this.buttonClose = document.querySelector<HTMLElement>(selectorButtonClose);

    // Container de login e cadastro
    this.container = document.querySelector<HTMLElement>(selectorContainer);

    // Content de login
    this.loginContent = document.querySelector<HTMLElement>(
      selectorLoginContainer
    );

    // Content de Cadastro
    this.cadastroContent = document.querySelector<HTMLElement>(
      selectorCadastroContainer
    );

    this.userEvents = ['click', 'touchstart'];

    this.activeClass = 'active';

    this.outsideClick = new OutsideClick(
      selectorContainer,
      this.userEvents,
      () => this.closeLoginCadastro()
    );
  }

  addBlur(active: boolean) {
    if (active) document.body.classList.add('blur');
    else document.body.classList.remove('blur');
  }

  activeContainer(event: Event) {
    event.preventDefault();

    // Remove os evendo de outSideClick caso existam e adiciona novos
    this.outsideClick.removeOutsideEvents();
    this.outsideClick.init();

    // Borrando o fundo para destacar o formulário
    this.addBlur(true);

    if (this.container) this.container.classList.add(this.activeClass);

    const contentElement = event.currentTarget;
    if (contentElement instanceof HTMLElement) {
      if (contentElement.dataset.accounts === 'openLogin') {
        this.activeLogin();
      }
      if (contentElement.dataset.accounts === 'openCadastro') {
        this.activeCadastro();
      }
    }
  }

  activeLogin() {
    if (this.loginContent && this.cadastroContent) {
      history.pushState(null, '', '/accounts/login/');
      this.cadastroContent.classList.remove(this.activeClass);
      this.loginContent.classList.add(this.activeClass);
    }
  }

  activeCadastro() {
    if (this.loginContent && this.cadastroContent) {
      history.pushState(null, '', '/accounts/cadastro/');
      this.loginContent.classList.remove(this.activeClass);
      this.cadastroContent.classList.add(this.activeClass);
    }
  }

  closeLoginCadastro() {
    this.addBlur(false);

    this.outsideClick.removeOutsideEvents();

    if (this.container) this.container.classList.remove(this.activeClass);

    history.pushState(null, '', '/');
  }

  addLoginCadastroToolEvents() {
    this.userEvents.forEach((userEvent) => {
      this.buttonOpenLogin.forEach((button) => {
        button.addEventListener(userEvent, this.activeContainer);
      });
      this.buttonOpenCadastro.forEach((button) => {
        button.addEventListener(userEvent, this.activeContainer);
      });

      this.buttonClose?.addEventListener(userEvent, this.closeLoginCadastro);
    });
  }

  bindEvents() {
    this.activeContainer = this.activeContainer.bind(this);
    this.closeLoginCadastro = this.closeLoginCadastro.bind(this);
  }

  init() {
    this.bindEvents();
    this.addLoginCadastroToolEvents();

    return this;
  }
}
