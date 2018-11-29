import DOManipulation from './domanipulation';

class GetElement extends DOManipulation {
  constructor(selector) {
    super(selector);
    let elements;
    if (selector.startsWith('#')) {
      elements = document.getElementById(selector.substr(1));
    }
    else if (selector.startsWith('.')) {
      elements = document.getElementsByClassName(selector.substr(1));
    }
    else {
      elements = {};
    }
    this[0] = elements;
    this.init = 'Class GetElement has initialized.';
    this.length = 1;
    Object.assign(this, elements);
  }

  each(callback) {
    super.each(callback);
  }

  addClass(className) {
    super.addClass(className);
  }

  removeClass(className) {
    super.removeClass(className);
  }

  hasClass(className) {
    super.hasClass(className);
  }

  on(event, callback) {
    super.on(event, callback);
  }

  checkInit() {
    return this.init;
  }
}

window.GetElement = GetElement;
export { GetElement as default };
