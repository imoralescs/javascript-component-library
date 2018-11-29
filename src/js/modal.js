import GetElement from './getElement';

class Modal {
  constructor(selectorsObject) {
    const keys = Object.keys(selectorsObject);
    for (const key of keys) {
      this[key] = new GetElement(selectorsObject[key]);
    }

    this.length = Object.keys(selectorsObject).length;
  }
}

window.Modal = Modal;
export { Modal as default };
