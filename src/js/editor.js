import GetElement from './getElement';

class Editor {
  constructor(selectorsObject) {
    const keys = Object.keys(selectorsObject);
    for (const key of keys) {
      this[key] = new GetElement(selectorsObject[key]);
    }

    this.length = Object.keys(selectorsObject).length;
  }
}

window.Editor = Editor;
export { Editor as default };
