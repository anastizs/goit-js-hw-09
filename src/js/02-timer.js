// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');
const button = document.querySelector('[data-start]');

// button.disabled = false;

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timeData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    timeData = selectedDates[0].getTime();

    if (timeData < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      button.setAttribute('disabled', true);
      return;
    }
    button.removeAttribute('disabled');
  },
};
flatpickr(input, options);

button.setAttribute('disabled', true);
button.addEventListener('click', onStart);

function onStart() {
  timerId = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();

    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    }
    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);

  button.setAttribute('disabled', true);
}

function updateClockInfo({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
