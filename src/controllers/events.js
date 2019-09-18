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
    .filter(([entry]) => entry.includes(FORM_OPTION_MASK))
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

      this._sortByType(this._getSortType());

    } else {
      this._renderNoEvents(this._container);
    }
  }

  _renderTripEvent(container, point, info) {
    const tripEvent = new TripEvent(point, info);
    const tripEventEdit = new TripEventEdit(point, info);

    const onEscPress = (evt) => {
      document.removeEventListener(`keydown`, onEscPress);
      if (evt.keyCode === 27) {
        container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
      }
    };

    const rollUpBtnElement = tripEvent.getElement().querySelector(`.event__rollup-btn`);

    const editFormElement = tripEventEdit.getElement().querySelector(`.event--edit`);

    const typeToggle = editFormElement.querySelector(`.event__type-toggle`);
    const typeIcon = editFormElement.querySelector(`.event__type-icon`);
    const typeTextElement = editFormElement.querySelector(`.event__type-output`);
    const offersElement = editFormElement.querySelector(`.event__available-offers`);
    const typesElements = [...editFormElement.querySelectorAll(`.event__type-input`)];

    const onTypeChange = (evt) => {
      typeIcon.src = this._pointsInfo.typesList[evt.target.value].icon;
      typeTextElement.innerHTML = `${evt.target.value} ${this._pointsInfo.pretext[this._pointsInfo.typesList[evt.target.value].group]}`;

      offersElement.innerHTML = ``;

      const options = this._pointsInfo.getOptions(evt.target.value);

      offersElement.innerHTML = options.map((item) => `
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.option}-1" type="checkbox" name="event-offer-${item.option}" ${item.isChecked === true ? `checked=""` : ``} >
                  <label class="event__offer-label" for="event-offer-${item.option}-1">
                    <span class="event__offer-title">${this._pointsInfo.optionsList[item.option].text}</span>
                    +
                    € <span class="event__offer-price">${this._pointsInfo.optionsList[item.option].price}</span>
                  </label>
                </div>
              `).join(``);

      typeToggle.checked = false;
    };

    rollUpBtnElement.addEventListener(`click`, () => {

      typesElements.forEach((item) => item.addEventListener(`click`, onTypeChange));

      container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    editFormElement.addEventListener(`submit`, () => {
      document.removeEventListener(`keydown`, onEscPress);
      typesElements.forEach((item) => item.removeEventListener(`click`, onTypeChange));

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

      this._points[this._points.findIndex((it) => it.id === point.id)] = entry;

      this._unrenderBoard();

      this._sortByType(this._getSortType());
    });

    render(container, tripEvent.getElement(), Position.BEFOREEND);
  }

  _renderNoEvents(container) {
    const noEvents = new NoEvents();
    render(container, noEvents.getElement(), Position.BEFOREEND);
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
    this._tripDays = new TripDays(this._points, this._pointsInfo);
    render(this._container, this._tripDays.getElement(), Position.BEFOREEND);

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
