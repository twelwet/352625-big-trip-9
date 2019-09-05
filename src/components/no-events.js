// no-events.js

import Component from './component.js';

class NoEvents extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}

export default NoEvents;
