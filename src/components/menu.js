// menu.js

import {createElement} from "../utils";

class Menu {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <h2 class="visually-hidden">Switch trip view</h2>
      ${this._data.map((item) => `
        <a class="trip-tabs__btn ${item.isChecked === true ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>
      `).join(``)}
      </nav>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export default Menu;
