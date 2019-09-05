// menu.js

import Component from './component.js';

class Menu extends Component {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <h2 class="visually-hidden">Switch trip view</h2>
      ${this._data.map((item) => `
        <a class="trip-tabs__btn ${item.isChecked === true ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>
      `).join(``)}
      </nav>`;
  }
}

export default Menu;
