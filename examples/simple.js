const Observable = require('../index');
//Replace by:
//const Observable = require('observable-lite');

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 2000);
});

const subscription = observable.subscribe({
  next(val) { console.log(val) },
  complete() { console.log() }  
});


setTimeout(() => subscription.unsubscribe(), 1000);
