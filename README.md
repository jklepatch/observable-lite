# Observable lite

Super simple implementation of Observable in Nodejs. Inspired by RxJS.

## Getting started

Add this to your `package.json`:

```
...
"dependencies": {
  observable-lite": "git+https://github.com/jklepatch/observable-lite.git",
  ...
},
...
```

Then run `npm install`

## Example

```
const Observable = require('observable-lite');

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

/**
 * Will print:
 * 1
 * 2
 * 3
 */
```

