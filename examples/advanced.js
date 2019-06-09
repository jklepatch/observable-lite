const Observable = require('../index');
//Replace by:
//const Observable = require('observable-lite');

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  let i = 3;
  const interval = setInterval(() => {
    i++;
    subscriber.next(i);
    if(i === 10) {
      subscriber.complete();
      clearInterval(interval);
    }
  }, 1000);
  return () => {
    clearInterval(interval);
  }
});

const subscription = observable.subscribe({
  next(val) { console.log(val) },
  complete() { console.log() }  
});


setTimeout(() => subscription.unsubscribe(), 3000);
