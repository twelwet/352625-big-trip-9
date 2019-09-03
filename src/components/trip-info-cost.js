// trip-info-cost.js

import {createElement} from "../utils";

class TripInfoCost {
  constructor({totalPrice}) {
    this._totalPrice = totalPrice;
    this._element = null;
  }

  getTemplate() {
    return `<p class="trip-info__cost">
        Total: &euro; <span class="trip-info__cost-value">${this._totalPrice}</span>
      </p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

}

export default TripInfoCost;
