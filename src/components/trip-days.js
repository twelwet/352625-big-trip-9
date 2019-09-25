// trip-days.js

import moment from 'moment';
import Component from './component.js';
import {pointsInfo} from "./mock-data";

class TripDays extends Component {
  constructor(points) {
    super();
    this._points = points;
    this._daysToPoints = pointsInfo.getDaysToPoints;
  }

  getTemplate() {
    return `<ul class="trip-days">
      ${Object.keys(this._daysToPoints(this._points))
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
