import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(value =>
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: ' #fff',
        backgroundColor: '#008000',
        position: 'topRight',
      })
    )
    .catch(value => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: ' #fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(state);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
