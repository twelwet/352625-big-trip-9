// events.js

import {Position, render, unrender} from '../utils';
import NoEvents from '../components/no-events';
import TripSort from '../components/trip-sort';
import TripDays from '../components/trip-days';
import TripList from '../components/trip-list.js';
import EventController from './event.js';

const Sort = {EVENT: `event`, TIME: `time`, PRICE: `price`};

class EventsController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
    this._tripSort = new TripSort();
    this._tripDays = new TripDays(this._points);
    this._tripList = new TripList();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    if (this._points.length > 0) {
      render(this._container, this._tripSort.getElement(), Position.BEFOREEND);

      this._tripSort.getElement()
        .addEventListener(`click`, this._onSortClick.bind(this));

      this._sortByType(this._getSortType());

    } else {
      this._renderNoEvents(this._container);
    }
  }

  _renderNoEvents(container) {
    const noEvents = new NoEvents();
    render(container, noEvents.getElement(), Position.BEFOREEND);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const index = this._points.findIndex((it) => it.id === oldData.id);
    this._subscriptions = [];

    switch (newData) {
      case null:
        this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];
        break;
      default:
        this._points[index] = newData;
        break;
    }

    this._unrenderBoard();
    this._sortByType(this._getSortType());
  }

  _sortByType(type) {
    this._getNamesToSorts()[type].call(this);
  }

  _onSortClick(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._unrenderBoard();

    this._sortByType(evt.target.dataset.sortType);
  }

  _sortByDays() {
    this._tripDays = new TripDays(this._points);
    render(this._container, this._tripDays.getElement(), Position.BEFOREEND);

    const dayLists = this._tripDays.getElement()
      .querySelectorAll(`.trip-events__list`);

    const pointsByDays = Object.values(this._pointsInfo.getDaysToPoints(this._points));

    [...dayLists].forEach((dayList, index) => {
      pointsByDays[index].forEach((dayPoint) => {
        const eventController = new EventController(dayList, dayPoint, this._onDataChange, this._onChangeView);
        this._subscriptions.push(eventController.setDefaultView.bind(eventController));
      });
    });
  }

  _sortByTime() {
    this._tripList = new TripList();

    render(this._container, this._tripList.getElement(), Position.BEFOREEND);

    const idsToPeriods = this._pointsInfo.getIdsToPeriods(this._points);

    const sortedPeriods = Object.entries(idsToPeriods).sort((a, b) => Number(a[1]) - Number(b[1]));

    const sortedPoints = sortedPeriods.map((entry) => this._points.find((point) => point.id === entry[0]));

    sortedPoints
      .forEach((point) => {
        const eventController = new EventController(this._tripList.getElement()
          .querySelector(`.trip-events__list`), point, this._onDataChange, this._onChangeView);
        this._subscriptions.push(eventController.setDefaultView.bind(eventController));
      });
  }

  _sortByPrice() {
    this._tripList = new TripList();

    render(this._container, this._tripList.getElement(), Position.BEFOREEND);

    const sortedPrices = this._points.map((point) => [point.price, point.id]).sort((a, b) => Number(a[0]) - Number(b[0]));

    const sortedPoints = sortedPrices.map(([, id]) => this._points.find((point) => point.id === id));

    sortedPoints
      .forEach((point) => {
        const eventController = new EventController(this._tripList.getElement()
          .querySelector(`.trip-events__list`), point, this._onDataChange, this._onChangeView);
        this._subscriptions.push(eventController.setDefaultView.bind(eventController));
      });
  }

  _getSortType() {
    return [...this._tripSort.getElement().querySelectorAll(`INPUT`)]
      .find((it) => it.checked).dataset.sortType;
  }

  _getNamesToSorts() {
    return {
      [Sort.EVENT]: this._sortByDays,
      [Sort.TIME]: this._sortByTime,
      [Sort.PRICE]: this._sortByPrice
    };
  }

  _unrenderBoard() {
    unrender(this._tripDays.getElement());
    unrender(this._tripList.getElement());
  }
}

export default EventsController;
