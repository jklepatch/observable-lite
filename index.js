class Subscription {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.isComplete = false;
    this._unsubscribe = undefined;
  }

  execute(subject) {
    const unsubscribe = subject(this);
    if(typeof unsubscribe !== 'undefined' && typeof unsubscribe !== 'function') {
      throw new Error('Subject must return an unsubscribe function or nothing');
      return;
    }
    if(typeof unsubscribe === 'function') {
      this._unsubscribe = unsubscribe;
    }
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
    if(typeof this._unsubscribe === 'function') this._unsubscribe();
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
    subscription.execute(this.subject);
    //this.subject(subscription);
    return subscription;
  }
}

module.exports = Observable;
