// trip-info-cost.js

import Component from './component.js';

class TripInfoCost extends Component {
  constructor(points, {getTotalPrice}) {
    super();
    this._totalPrice = getTotalPrice(points);
  }

  getTemplate() {
    return `<p class="trip-info__cost">
        Total: &euro; <span class="trip-info__cost-value">${this._totalPrice}</span>
      </p>`;
  }
}

export default TripInfoCost;
