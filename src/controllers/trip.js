// trip.js

import {Position, render} from "../utils";
import {filtersData, menuData} from "../components/mock-data";
import TripSort from "../components/trip-sort";
import TripDays from "../components/trip-days";
import Menu from "../components/menu";
import Filters from "../components/filters";
import EventsController from "./events";
import TripInfoController from "./trip-info";

class TripController {
  constructor(points, pointsInfo) {
    this._points = points;
    this._pointsInfo = pointsInfo;
  }

  init() {
    const mainElement = document.querySelector(`.trip-main`);
    const infoElement = mainElement.querySelector(`.trip-info`);
    const controlsElement = mainElement.querySelector(`.trip-controls`);
    const eventsElement = document.querySelector(`.trip-events`);

    const menu = new Menu(menuData);
    const filters = new Filters(filtersData);

    render(controlsElement, menu.getElement(), Position.AFTERBEGIN);
    render(controlsElement, filters.getElement(), Position.BEFOREEND);

    const tripInfoController = new TripInfoController(infoElement, this._points, this._pointsInfo);
    tripInfoController.init();

    const eventsController = new EventsController(eventsElement, this._points, this._pointsInfo);
    eventsController.init();
  }
}

export default TripController;
