class EventEmitter {

  listeners = {};

  on(event, listener) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener)
    } else {
      this.listeners[event] = [listener]
    }
  }

  emit(event, params?) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((listener) => {
      listener(params)
    })
  }

  addEventListener(event, listener) {
    this.on(event, listener);
  }

  removeAllListeners(event) {
    if (!this.listeners[event]) return;

    delete this.listeners[event];
  }

  removeListeners(event, listener) {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].indexOf(listener);
    this.listeners[event].splice(index, 1)
  }

  once(event, listener) {
    let self = this
    this.on(event, function () {
      let args = Array.prototype.slice.call(arguments);
      listener.apply(null, args);
      self.removeListeners(event, listener)
    })
  }

}

export default EventEmitter