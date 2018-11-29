class DOManipulation {
  constructor() {
    this.init = 'Class DOManipulation has initialized.';
  }

  each(callback) {
    // convert this to Array to use for...of
    for (const el of Array.from(this)) {
      callback.call(el);
    }

    // return this for chaining
    return this;
  }

  addClass(className) {
    return this.each(function addClass() {
      this.classList.add(className);
    });
  }

  removeClass(className) {
    return this.each(function removeClass() {
      this.classList.remove(className);
    });
  }

  hasClass(className) {
    return this[0].classList.contains(className);
  }

  on(event, callback) {
    return this.each(function on() {
      this.addEventListener(event, callback, false);
    });
  }

  checkInit() {
    return this.init;
  }
}

export default DOManipulation;
