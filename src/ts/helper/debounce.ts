// Evita que o callback de algum evento seja
// executado diversas vezes
export default function debounce(
  callback: (...args: any[]) => void,
  delay: number
  ) {
  let timer: number | null = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
      timer = null;
    }, delay);
  }
}
