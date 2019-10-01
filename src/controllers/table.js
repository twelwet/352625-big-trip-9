// table.js

import TripFiltersController from "./trip-filters.js";
import EventsController from "./events";
import NewEventController from '../controllers/event-new.js';

class TableController {
  constructor(headerElement, mainElement, filtersData, points, pointsInfo) {
    this._controlsElement = headerElement.querySelector(`.trip-controls`);
    this._eventsElement = mainElement.querySelector(`.trip-events`);
    this._tripFiltersController = new TripFiltersController(this._controlsElement, filtersData);
    this._eventsController = new EventsController(this._eventsElement, points, pointsInfo);
  }

  _initNewEvent() {
    this._sortElement = this._eventsElement.querySelector(`.trip-sort`);
    this._newEventController = new NewEventController(this._sortElement, this._eventsController);
    this._newEventController.init();
  }

  init() {
    this._tripFiltersController.init();
    this._eventsController.init();
    this._initNewEvent();
  }

  hide() {
    this._tripFiltersController.hide();
    this._eventsElement.classList.add(`visually-hidden`);
  }

  show() {
    this._tripFiltersController.show();
    this._eventsElement.classList.remove(`visually-hidden`);
  }

}

export default TableController;
