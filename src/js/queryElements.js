import DOManipulation from './domanipulation';

class QueryElements extends DOManipulation {
  constructor(selector) {
    super();
    const elements = document.querySelectorAll(selector);
    this.init = 'Class QueryElements has initialized.';
    this.length = elements.length;
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

window.QueryElements = QueryElements;
export default QueryElements;
