// event.js

import TripEvent from '../components/trip-event';
import TripEventEdit from '../components/trip-event-edit';
import {citiesList, getOptions, pointsInfo} from "../components/mock-data";
import {Position, render} from "../utils";
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

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

class EventController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this._event = new TripEvent(data, pointsInfo);
    this._openBtnElement = this._event.getElement().querySelector(`.event__rollup-btn`);

    this._eventEdit = new TripEventEdit(data, pointsInfo);
    this._editFormElement = this._eventEdit.getElement().querySelector(`.event--edit`);
    this._typeListElement = this._editFormElement.querySelector(`.event__type-list`);
    this._cityFieldElement = this._editFormElement.querySelector(`.event__input--destination`);

    this._onCityChange = this._eventEdit.onCityChange.bind(this._eventEdit);
    this._onTypeChange = this._eventEdit.onTypeChange.bind(this._eventEdit);
    this._onEscPress = this._onEscPress.bind(this);

    this._create();
  }

  _addListeners() {
    this._typeListElement.addEventListener(`click`, this._onTypeChange);
    this._cityFieldElement.addEventListener(`blur`, this._onCityChange);
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _removeListeners() {
    this._typeListElement.removeEventListener(`click`, this._onTypeChange);
    this._cityFieldElement.removeEventListener(`blur`, this._onCityChange);
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _onEscPress(evt) {
    document.removeEventListener(`keydown`, this._onEscPress);
    if (evt.keyCode === 27) {
      this._container.replaceChild(this._event.getElement(), this._eventEdit.getElement());
    }
  }

  _saveCity(city) {
    if (!citiesList[city]) {
      return this._data.city;
    }
    return city;
  }

  _create() {
    const dateFields = [...this._eventEdit.getElement().querySelectorAll(`.event__input--time`)];

    flatpickr(dateFields[0], {
      maxDate: this._data.date.end,
      allowInput: false,
      defaultDate: this._data.date.start,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    flatpickr(dateFields[1], {
      minDate: this._data.date.start,
      allowInput: false,
      defaultDate: this._data.date.end,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });


    this._openBtnElement.addEventListener(`click`, () => {
      this._onChangeView();
      this._addListeners();
      this._container.replaceChild(this._eventEdit.getElement(), this._event.getElement());
    });

    this._editFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._removeListeners();

      const formData = new FormData(this._editFormElement);

      const type = formData.get(`event-type`);

      const entry = {
        id: this._data.id,
        type,
        city: this._saveCity(formData.get(`event-destination`)),
        date: {
          start: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
          end: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf()
        },
        price: Number(formData.get(`event-price`)),
        options: getOptionsByTypeChange(type, formData)
      };

      this._onDataChange(entry, this._data);
    });

    render(this._container, this._event.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._eventEdit.getElement())) {
      this._container.replaceChild(this._event.getElement(), this._eventEdit.getElement());
    }
  }
}

export default EventController;
