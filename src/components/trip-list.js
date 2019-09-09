// trip-list.js

import Component from './component.js';

class TripList extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days">
        <li class="trip-days__item  day">
          <div class="day__info"></div>
          <ul class="trip-events__list"></ul>  
      </ul>`;
  }

}

export default TripList;
