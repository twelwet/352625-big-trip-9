// trip-info.js

import Component from './component.js';
import moment from 'moment';

class TripInfo extends Component {
  constructor({cities, dates}) {
    super();
    this._cities = cities;
    this._dates = dates;
  }

  getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._cities[0]} — ... — ${this._cities[this._cities.length - 1]}</h1>
        <p class="trip-info__dates">${moment(this._dates[0].start).format(`MMM D`)} — ${moment(this._dates[this._dates.length - 1].end).format(`MMM D`)}</p>
      </div>`;
  }
}

export default TripInfo;
