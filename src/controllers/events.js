// events.js

import TripEvent from "../components/trip-event";
import TripEventEdit from "../components/trip-event-edit";
import {Position, render} from "../utils";
import NoEvents from "../components/no-events";
import TripSort from "../components/trip-sort";
import TripDays from "../components/trip-days";

class EventsController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
  }

  init() {
    if (this._points.length > 0) {
      const tripSort = new TripSort();

      render(this._container, tripSort.getElement(), Position.BEFOREEND);

      const tripSortElement = this._container.querySelector(`.trip-sort`);

      const tripDays = new TripDays(this._pointsInfo);

      render(tripSortElement, tripDays.getElement(), Position.BEFOREEND);

      const dayLists = document.querySelectorAll(`.trip-events__list`);

      const pointsByDays = Object.values(this._pointsInfo.getDaysToPoints());

      [...dayLists].forEach((dayList, index) => {
        pointsByDays[index].forEach((dayPoint) => this._renderTripEvent(dayList, dayPoint, this._pointsInfo));
      });

    } else {
      this._renderNoEvents(this._container);
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

  _renderNoEvents(container) {
    const noEvents = new NoEvents();
    render(container, noEvents.getElement(), Position.BEFOREEND);
  }
}

export default EventsController;
