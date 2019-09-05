// trip.js

import EventsController from "./events";
import TripInfoController from "./trip-info";
import TripControlsController from "./trip-controls";

class TripController {
  constructor(menuData, filtersData, points, pointsInfo) {
    this._menuData = menuData;
    this._filtersData = filtersData;
    this._points = points;
    this._pointsInfo = pointsInfo;
  }

  init() {
    const mainElement = document.querySelector(`.trip-main`);

    const infoElement = mainElement.querySelector(`.trip-info`);
    const controlsElement = mainElement.querySelector(`.trip-controls`);
    const eventsElement = document.querySelector(`.trip-events`);

    const tripInfoController = new TripInfoController(infoElement, this._points, this._pointsInfo);
    const tripControlsController = new TripControlsController(controlsElement, this._menuData, this._filtersData);
    const eventsController = new EventsController(eventsElement, this._points, this._pointsInfo);

    tripInfoController.init();
    tripControlsController.init();
    eventsController.init();
  }
}

export default TripController;
