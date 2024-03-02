export default class FocusVideo {
  videos: HTMLElement[];
  button: HTMLButtonElement | null;
  activeClass: string;
  constructor(SelectorVideos: string, SelectorButton: string) {
    const videos = document.querySelectorAll<HTMLElement>(SelectorVideos);
    this.videos = Array.from(videos);

    const button = document.querySelector(SelectorButton);
    button instanceof HTMLButtonElement
      ? (this.button = button)
      : (this.button = null);

    this.activeClass = 'active';
  }

  focusVideo() {
    if (this.button?.classList.contains(this.activeClass)) {
      this.videos.forEach((video) => (video.style.opacity = '1'));
    } else {
      this.videos.forEach((video) => (video.style.opacity = '0.6'));
    }
  }

  activeVideo(element: HTMLElement, active: boolean) {
    const video = element.querySelector('video');
    if (
      video instanceof HTMLVideoElement &&
      this.button?.classList.contains(this.activeClass)
    ) {
      if (active) {
        video.play();
        element.style.zIndex = '2';
        element.style.transform = 'scale(2)';
      } else {
        video.pause();
        element.style.zIndex = 'initial';
        element.style.transform = 'initial';
      }
    }
  }

  onMouseLeave(event: MouseEvent) {
    const element = event.currentTarget;
    if (element instanceof HTMLElement) {
      this.activeVideo(element, false);
    }
  }

  onMouseOver(event: MouseEvent) {
    const element = event.currentTarget;
    if (document.documentElement.offsetWidth > 900) {
      if (element instanceof HTMLElement) {
        this.activeVideo(element, true);
        element.addEventListener('mouseleave', this.onMouseLeave);
      }
    }
  }

  onButtonClick() {
    this.button?.classList.toggle(this.activeClass);
    this.focusVideo();
  }

  addVideoEvent() {
    this.videos.forEach((video) => {
      video.addEventListener('mouseover', this.onMouseOver);
    });
    this.button?.addEventListener('click', this.onButtonClick);
  }

  bindEvents() {
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  init() {
    this.bindEvents();
    this.addVideoEvent();
    this.focusVideo();
    
    return this
  }
}
