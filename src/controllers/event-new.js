// event-new.js

import TripEventNew from '../components/trip-event-new.js';
import {Position, render, unrender} from "../utils";
import moment from 'moment';
import {citiesList, getOptions} from "../components/mock-data";

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
    this._container = container;
    this._eventNewBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._onNewEventClick = this._onNewEventClick.bind(this);
    this._onCancelClick = this._onCancelClick.bind(this);
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
  }

  _onCancelClick() {
    this._unrender();
  }

  _create() {
    this._eventNew = new TripEventNew(this._typesList);
    this._cancelBtn = this._eventNew.getElement().querySelector(`.event__reset-btn`);
    this._typeListElement = this._eventNew.getElement().querySelector(`.event__type-list`);

    this._cancelBtn.addEventListener(`click`, this._onCancelClick);

    this._onTypeChange = this._eventNew.onTypeChange.bind(this._eventNew);

    this._addListeners();

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
  }
  _removeListeners() {}

}
export default NewEventController;
