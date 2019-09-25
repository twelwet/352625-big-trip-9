// event.js

import TripEvent from '../components/trip-event';
import TripEventEdit from '../components/trip-event-edit';
import {citiesList, getOptions, pointsInfo} from "../components/mock-data";
import moment from 'moment';
import {Position, render} from "../utils";

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
    this._eventEdit = new TripEventEdit(data, pointsInfo);

    this.create();
  }

  create() {
    const onEscPress = (evt) => {
      document.removeEventListener(`keydown`, onEscPress);
      if (evt.keyCode === 27) {
        this._container.replaceChild(this._event.getElement(), this._eventEdit.getElement());
      }
    };

    const rollUpBtnElement = this._event.getElement().querySelector(`.event__rollup-btn`);

    const editFormElement = this._eventEdit.getElement().querySelector(`.event--edit`);

    const typesElements = [...editFormElement.querySelectorAll(`.event__type-input`)];

    const cityField = editFormElement.querySelector(`.event__input--destination`);

    rollUpBtnElement.addEventListener(`click`, () => {
      this._onChangeView();
      typesElements.forEach((item) => item.addEventListener(`click`, this._eventEdit.onTypeChange.bind(this._eventEdit)));
      cityField.addEventListener(`blur`, this._eventEdit.onCityChange.bind(this._eventEdit));

      this._container.replaceChild(this._eventEdit.getElement(), this._event.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    editFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      document.removeEventListener(`keydown`, onEscPress);

      typesElements.forEach((item) => item.removeEventListener(`click`, this._eventEdit.onTypeChange.bind(this._eventEdit)));
      cityField.removeEventListener(`blur`, this._eventEdit.onCityChange.bind(this._eventEdit));

      const formData = new FormData(editFormElement);

      const type = formData.get(`event-type`);

      const saveCity = (city) => {
        if (!citiesList[city]) {
          return this._data.city;
        }
        return city;
      };

      const entry = {
        id: this._data.id,
        type,
        city: saveCity(formData.get(`event-destination`)),
        date: {
          start: moment(formData.get(`event-start-time`)).valueOf(),
          end: moment(formData.get(`event-end-time`)).valueOf()
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
