// filters.js

import {createElement} from "../utils";

class Filters {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
      <h2 class="visually-hidden">Filter events</h2>
      ${this._data.map((item) => `
        <div class="trip-filters__filter">
          <input 
            id="filter-${item.name}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${item.name}"
            ${item.isChecked ? `checked=""` : ``}
          >
          <label 
            class="trip-filters__filter-label"
            for="filter-${item.name}"
          >${item.name}
          </label>
        </div>`).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export default Filters;
