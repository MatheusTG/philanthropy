import SlideConfig from './slide/slide';
import Turmas from './home/Turmas';
import Menu from './home/Menu';
import ScrollAnima from './helper/ScrollAnima';
import FocusVideo from './home/FocusVideo';
import ProvasControls from './home/ProvasControls';
import LoginCadastroTool from './accounts/LoginCadastroTool';

import { inject } from '@vercel/analytics';

// Conta os números de visitors no site
inject();

// Slides dos slide
const slide = new SlideConfig('.slide-container', '.slide', '.slide-controls');
slide.init();
slide.connectControls();

// Turmas no header
const turmas = new Turmas('[data-turma="container"]');
turmas.init();

// Menu do site
const menu = new Menu(
  '[data-menu="abrir"]',
  '[data-menu="fechar"]',
  '[data-menu="container"]'
);
menu.init();

const focusVideo = new FocusVideo(
  '[data-video-cultural]',
  '.cultural-videos-button'
);
focusVideo.init();

const provasControls = new ProvasControls(
  '[data-prova-controls="container"] li',
  '[data-prova-gincana="container"]'
);
provasControls.init();

const loginTool = new LoginCadastroTool(
  '[data-accounts="openLogin"]', // botões para abrir o login
  '[data-accounts="openCadastro"]', // botões para abrir o cadastro
  '[data-accounts="close"]', // Botão de fechar no canto
  '[data-accounts="container"]', // Container do furmulário
  '[data-accounts="loginContent"]', // Content de login
  '[data-accounts="cadastroContent"]' // Content de Cadastro
);
loginTool.init();

// Executa segundos após a página ser carregada
setTimeout(() => {
  // Adiciona animação ao scroll
  const scrollAnima = new ScrollAnima('[data-anima="scroll"]', 'active');
  scrollAnima.init();

  // Remove as messages
  const messagesContainer = document.querySelector('.messages-container');
  if (messagesContainer instanceof HTMLElement) {
    messagesContainer.style.display = 'none';
  }
}, 1000);
