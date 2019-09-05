// trip-days.js

import Component from './component.js';
import moment from 'moment';

class TripDays extends Component {
  constructor({getDaysToPoints}) {
    super();
    this._daysToPoints = getDaysToPoints();
  }

  getTemplate() {
    return `<ul class="trip-days">
      ${Object.keys(this._daysToPoints)
        .sort((a, b) => moment(a) - moment(b))
      .map((day, index) => `
        <li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${day}">${day}</time>
          </div>
          <ul class="trip-events__list"></ul>  
        </li>`).join(``)}
      </ul>`;
  }
}

export default TripDays;
