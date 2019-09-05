// component.js

import {createElement} from "../utils";

class Component {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

}

export default Component;
