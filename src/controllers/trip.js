// trip.js

import {Position, render} from "../utils";
import TripInfo from "../components/trip-info";
import {filtersData, menuData} from "../components/mock-data";
import TripSort from "../components/trip-sort";
import TripDays from "../components/trip-days";
import TripInfoCost from "../components/trip-info-cost";
import Menu from "../components/menu";
import Filters from "../components/filters";
import EventsController from "./events";

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

    const tripInfoCost = new TripInfoCost(this._pointsInfo);
    const menu = new Menu(menuData);
    const filters = new Filters(filtersData);

    render(infoElement, tripInfoCost.getElement(), Position.BEFOREEND);
    render(controlsElement, menu.getElement(), Position.AFTERBEGIN);
    render(controlsElement, filters.getElement(), Position.BEFOREEND);

    if (this._points.length > 0) {
      const tripInfo = new TripInfo(this._pointsInfo);
      const tripSort = new TripSort();

      render(infoElement, tripInfo.getElement(), Position.AFTERBEGIN);
      render(eventsElement, tripSort.getElement(), Position.BEFOREEND);

      const tripSortElement = eventsElement.querySelector(`.trip-sort`);

      const tripDays = new TripDays(this._pointsInfo);

      render(tripSortElement, tripDays.getElement(), Position.BEFOREEND);

    }

    const eventsController = new EventsController(eventsElement, this._points, this._pointsInfo);
    eventsController.init();
  }
}

export default TripController;
