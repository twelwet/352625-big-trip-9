// events.js

import moment from 'moment';
import TripEvent from "../components/trip-event";
import TripEventEdit from "../components/trip-event-edit";
import {Position, render, unrender} from "../utils";
import NoEvents from "../components/no-events";
import TripSort from "../components/trip-sort";
import TripDays from "../components/trip-days";
import TripList from "../components/trip-list.js";

const Sort = {EVENT: `event`, TIME: `time`, PRICE: `price`};
const FORM_OPTION_MASK = `event-offer-`;

const getOptions = (event, dataFromForm) => {
  const optionsFromForm = [...dataFromForm]
    .filter((entry) => entry[0].includes(FORM_OPTION_MASK))
    .map((item) => item[0].slice(FORM_OPTION_MASK.length));

  const options = JSON.parse(JSON.stringify(event.options));

  for (const item of options) {
    item.isChecked = optionsFromForm.includes(item.option);
  }

  return options;
};

class EventsController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
    this._tripSort = new TripSort();
    this._tripDays = new TripDays(this._points, this._pointsInfo);
    this._tripList = new TripList();
  }

  init() {
    if (this._points.length > 0) {
      render(this._container, this._tripSort.getElement(), Position.BEFOREEND);

      this._tripSort.getElement()
        .addEventListener(`click`, this._onSortClick.bind(this));

      this._sortByDays();

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

    const rollUpBtnElement = tripEvent.getElement().querySelector(`.event__rollup-btn`);

    rollUpBtnElement.addEventListener(`click`, () => {
      container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    const editFormElement = tripEventEdit.getElement().querySelector(`.event--edit`);

    editFormElement.addEventListener(`submit`, () => {
      document.removeEventListener(`keydown`, onEscPress);
      const formData = new FormData(editFormElement);

      const entry = {
        id: point.id,
        type: formData.get(`event-type`),
        city: formData.get(`event-destination`),
        date: {
          start: moment(formData.get(`event-start-time`)).valueOf(),
          end: moment(formData.get(`event-end-time`)).valueOf()
        },
        price: Number(formData.get(`event-price`)),
        options: getOptions(point, formData)
      };

      point = entry;

      container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
    });

    render(container, tripEvent.getElement(), Position.BEFOREEND);
  }

  _renderNoEvents(container) {
    const noEvents = new NoEvents();
    render(container, noEvents.getElement(), Position.BEFOREEND);
  }

  _onSortClick(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    unrender(this._tripDays.getElement());
    unrender(this._tripList.getElement());

    const namesToSorts = {
      [Sort.EVENT]: this._sortByDays,
      [Sort.TIME]: this._sortByTime,
      [Sort.PRICE]: this._sortByPrice
    };

    namesToSorts[evt.target.dataset.sortType].call(this);
  }

  _sortByDays() {
    this._tripDays = new TripDays(this._points, this._pointsInfo);
    render(this._tripSort.getElement(), this._tripDays.getElement(), Position.BEFOREEND);

    const dayLists = this._tripDays.getElement()
      .querySelectorAll(`.trip-events__list`);

    const pointsByDays = Object.values(this._pointsInfo.getDaysToPoints(this._points));

    [...dayLists].forEach((dayList, index) => {
      pointsByDays[index].forEach((dayPoint) => this._renderTripEvent(dayList, dayPoint, this._pointsInfo));
    });
  }

  _sortByTime() {
    this._tripList = new TripList();

    render(this._container, this._tripList.getElement(), Position.BEFOREEND);

    const idsToPeriods = this._pointsInfo.getIdsToPeriods(this._points);

    const sortedPeriods = Object.entries(idsToPeriods).sort((a, b) => Number(a[1]) - Number(b[1]));

    const sortedPoints = sortedPeriods.map((entry) => this._points.find((point) => point.id === entry[0]));

    sortedPoints
      .forEach((point) => this._renderTripEvent(this._tripList.getElement()
        .querySelector(`.trip-events__list`), point, this._pointsInfo));
  }

  _sortByPrice() {
    this._tripList = new TripList();

    render(this._container, this._tripList.getElement(), Position.BEFOREEND);

    const sortedPrices = this._points.map((point) => point.price).sort((a, b) => Number(a) - Number(b));

    const sortedPoints = sortedPrices.map((price) => this._points.find((point) => point.price === price));

    sortedPoints
      .forEach((point) => this._renderTripEvent(this._tripList.getElement()
        .querySelector(`.trip-events__list`), point, this._pointsInfo));
  }
}

export default EventsController;
