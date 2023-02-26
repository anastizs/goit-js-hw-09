import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// const delay = form.querySelector('[name="delay"]');
// const step = form.querySelector('[name="step"]');
// const amount = form.querySelector('[name="amount"]');


form.addEventListener('submit', createPromiseBtn);

function createPromiseBtn(e) {
  e.preventDefault();

  const delayValue = Number(e.currentTarget.delay.value);
  const stepValue = Number(e.currentTarget.step.value);
  const amountValue = Number(e.currentTarget.amount.value);

  createPromiseAction(delayValue, stepValue, amountValue);
};

function createPromiseAction(delay, step, amount) {
  for (let position = 1; position <= amount; position += 1) {

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    delay += step;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const data = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      }
    }, delay);
  });
};



