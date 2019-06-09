class Subscription {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.isComplete = false;
  }

  next(val) {
    if(this.isComplete === false && typeof this.callbacks.next === 'function') {
      this.callbacks.next(val);
    }
  }
  
  error(val) {
    if(this.isComplete === false && typeof this.callbacks.error === 'function') {
      this.callbacks.error(val);
    }
  }

  complete() {
    if(this.isComplete === false && typeof this.callbacks.complete === 'function') {
      this.isComplete = true;
      this.callbacks.complete();
    }
  }

  unsubscribe() {
    this.isComplete = true;
  }
}

class Observable {
  constructor(subject) {
    if (typeof subject !== 'function') throw new Error('subject must be a function');
    this.subject = subject;
  }

  subscribe(callbacks) {
    if (typeof callbacks !== 'object') throw new Error('callbacks must be an object');
    const subscription = new Subscription(callbacks);
    this.subject(subscription);
    return subscription;
  }
}

module.exports = Observable;
