import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const getForm = document.querySelector('.form');
const getDelay = getForm.querySelector('input[name = "delay"]');
getForm.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const getFulfilledValue = getForm.querySelector(
    'input[name="state"]:checked'
  );
  const delay = Number(getDelay.value);
  const createMessage = setTimeout(() => {
    const prom = new Promise((resolve, reject) => {
      if (getFulfilledValue.value === 'fulfilled') {
        resolve('Fulfilled');
      } else {
        reject('Rejected');
      }
    });

    prom
      .then(value =>
        iziToast.show({
          message: `${value} promise in ${delay}ms`,
          messageColor: ' #fff',
          backgroundColor: '#008000',
          position: 'topRight',
        })
      )

      .catch(value => {
        iziToast.show({
          message: `${value} promise in ${delay}ms`,
          messageColor: ' #fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
      });
  }, delay);
}
