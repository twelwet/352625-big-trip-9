// trip-days.js

import {createElement} from '../utils.js';

class TripDays {
  constructor({daysToPoints}) {
    this._daysToPoints = daysToPoints;
    this._element = null;
  }

  getTemplate() {
    return `<ul class="trip-days">
      ${Object.keys(this._daysToPoints).map((day, index) => `
        <li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${day}">${day}</time>
          </div>
          <ul class="trip-events__list"></ul>  
        </li>`).join(``)}
      </ul>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export default TripDays;
