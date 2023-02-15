const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
startBtn.addEventListener('click', onClick);

function onClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
}

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled', 'disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
