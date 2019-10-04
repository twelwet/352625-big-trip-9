// trip-info.js

import Component from './component.js';

class TripInfo extends Component {
  constructor(points, {getCitiesInfo, getDatesInfo}) {
    super();
    this._getCitiesInfo = getCitiesInfo(points);
    this._getDatesInfo = getDatesInfo(points);
  }

  getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._getCitiesInfo}</h1>
        <p class="trip-info__dates">${this._getDatesInfo}</p>
      </div>`;
  }
}

export default TripInfo;
