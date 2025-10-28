import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const getStartBtn = document.querySelector('.start-btn');
const getTimer = document.querySelectorAll('.value');
const getInput = document.querySelector('.date-input');
getStartBtn.addEventListener('click', handlerTimer);
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getStartBtn.disabled = true;

    if (selectedDates[0] - Date.now() <= 0) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: ' #fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      return;
    }
    getStartBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handlerTimer(event) {
  getStartBtn.disabled = true;
  getInput.disabled = true;

  const TimerId = setInterval(() => {
    const createTime = userSelectedDate.getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(createTime);
    (getTimer[0].textContent = days),
      (getTimer[1].textContent = hours),
      (getTimer[2].textContent = minutes),
      (getTimer[3].textContent = seconds);

    if (createTime <= 0) {
      clearInterval(TimerId);
      getStartBtn.disabled = false;
      getInput.disabled = false;
      getTimer.forEach(el => (el.textContent = '00'));
      iziToast.show({
        message: 'Time is up!',
        messageColor: ' #fff',
        backgroundColor: '#008000',
        position: 'topRight',
      });
    }
  }, 1000);
}
