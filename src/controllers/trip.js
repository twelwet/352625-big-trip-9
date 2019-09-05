// trip.js

import TripEvent from "../components/trip-event";
import TripEventEdit from "../components/trip-event-edit";
import {Position, render} from "../utils";
import TripInfo from "../components/trip-info";
import {filtersData, menuData} from "../components/mock-data";
import TripSort from "../components/trip-sort";
import TripDays from "../components/trip-days";
import TripInfoCost from "../components/trip-info-cost";
import Menu from "../components/menu";
import Filters from "../components/filters";
import NoEvents from "../components/no-events";

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

      const dayLists = document.querySelectorAll(`.trip-events__list`);

      const pointsByDays = Object.values(this._pointsInfo.getDaysToPoints());

      [...dayLists].forEach((dayList, index) => {
        pointsByDays[index].forEach((dayPoint) => this._renderTripEvent(dayList, dayPoint, this._pointsInfo));
      });

    } else {
      const renderNoEvents = (container) => {
        const noEvents = new NoEvents();
        render(container, noEvents.getElement(), Position.BEFOREEND);
      };

      renderNoEvents(eventsElement);
    }
  }

  _renderTripEvent(container, point, info) {
    const tripEvent = new TripEvent(point, info);
    const tripEventEdit = new TripEventEdit(point, info);

    const onEscPress = (evt) => {
      if (evt.keyCode === 27) {
        container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
      }
    };

    tripEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    tripEventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
      document.removeEventListener(`keydown`, onEscPress);
      container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
    });

    render(container, tripEvent.getElement(), Position.BEFOREEND);
  }
}

export default TripController;
