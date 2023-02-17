// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeData = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    timeData = selectedDates[0].getTime();

    if (timeData < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

refs.btnStart.addEventListener('click', startButton);

function startButton() {
  timerId = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();

    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    }

    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);

  refs.btnStart.disabled = true;
}

function updateClockInfo({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
