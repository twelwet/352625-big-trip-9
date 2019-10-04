// event-new.js

import TripEventNew from '../components/trip-event-new.js';
import {Position, render, unrender} from "../utils";
import moment from 'moment';
import {citiesList, getOptions} from "../components/mock-data";
import flatpickr from "./event";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

const HOUR = 60 * 60 * 1000;

const getDateForNewEvent = () => {
  const now = Date.now();
  return {
    start: now,
    end: now + HOUR
  };
}

const FORM_OPTION_MASK = `event-offer-`;

const getOptionsByTypeChange = (type, dataFromForm) => {
  const optionsFromForm = [...dataFromForm]
    .filter(([entry]) => entry.includes(FORM_OPTION_MASK))
    .map((item) => item[0].slice(FORM_OPTION_MASK.length));

  const options = JSON.parse(JSON.stringify(getOptions(type)));

  for (const item of options) {
    item.isChecked = optionsFromForm.includes(item.option);
  }

  return options;
};

class NewEventController {
  constructor(container, eventsController) {
    this._date = getDateForNewEvent();
    this._container = container;
    this._eventNewBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._onNewEventClick = this._onNewEventClick.bind(this);
    this._onCancelClick = this._onCancelClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);

    this._eventsController = eventsController;
  }

  _unrender() {
    unrender(this._eventNew.getElement());
    this._eventNewBtn.disabled = false;
    this._create();
  }

  _onNewEventClick() {
    render(this._container, this._eventNew.getElement(), Position.AFTER);
    this._eventNewBtn.disabled = true;
    this._addListeners();
  }

  _onCancelClick() {
    this._removeListeners();
    this._unrender();
  }

  _onEscPress(evt) {
    if (evt.keyCode === 27) {
      this._removeListeners();
      this._unrender();
    }
  }

  _create() {
    this._eventNew = new TripEventNew();
    this._cancelBtn = this._eventNew.getElement().querySelector(`.event__reset-btn`);
    this._typeListElement = this._eventNew.getElement().querySelector(`.event__type-list`);

    this._onTypeChange = this._eventNew.onTypeChange.bind(this._eventNew);

    this._addListeners();

    const dateFields = [...this._eventNew.getElement().querySelectorAll(`.event__input--time`)];

    flatpickr(dateFields[0], {
      // maxDate: this._data.date.end,
      allowInput: false,
      defaultDate: this._date.start,
      enableTime: true,
      dateFormat: `d.m.Y H:i`,
    });

    flatpickr(dateFields[1], {
      // minDate: this._data.date.start,
      allowInput: false,
      defaultDate: this._date.end,
      enableTime: true,
      dateFormat: `d.m.Y H:i`,
    });

    this._eventNew.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._eventNew.getElement());

      const type = formData.get(`event-type`);

      const entry = {
        id: Math.random().toString(36).slice(2),
        type,
        city: this._saveCity(formData.get(`event-destination`)),
        date: {
          start: moment(formData.get(`event-start-time`), `DD.MM.YYYY HH:mm`).valueOf(),
          end: moment(formData.get(`event-end-time`), `DD.MM.YYYY HH:mm`).valueOf()
        },
        price: Number(formData.get(`event-price`)),
        options: getOptionsByTypeChange(type, formData)
      };

      this._eventsController._onDataChange(entry, null);

      this._unrender();
    });
  }

  init() {
    this._eventNewBtn.addEventListener(`click`, this._onNewEventClick);
    this._create();
  }

  _saveCity(city) {
    if (!citiesList[city]) {
      return `Berlin`;
    }
    return city;
  }

  _addListeners() {
    this._typeListElement.addEventListener(`click`, this._onTypeChange);
    this._cancelBtn.addEventListener(`click`, this._onCancelClick);
    document.addEventListener(`keydown`, this._onEscPress);
  }
  _removeListeners() {
    this._typeListElement.removeEventListener(`click`, this._onTypeChange);
    this._cancelBtn.removeEventListener(`click`, this._onCancelClick);
    document.removeEventListener(`keydown`, this._onEscPress);
  }

}
export default NewEventController;
