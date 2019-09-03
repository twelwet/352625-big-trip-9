// trip-info.js

import moment from 'moment';
import {createElement} from "../utils";

class TripInfo {
  constructor({cities, dates}) {
    this._cities = cities;
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._cities[0]} — ... — ${this._cities[this._cities.length - 1]}</h1>
        <p class="trip-info__dates">${moment(this._dates[0].start).format(`MMM D`)} — ${moment(this._dates[this._dates.length - 1].end).format(`MMM D`)}</p>
      </div>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export default TripInfo;
