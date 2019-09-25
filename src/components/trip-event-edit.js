// trip-event-edit.js

import Component from './component.js';
import moment from 'moment';
import {citiesList, getOptions} from "../components/mock-data";

class TripEventEdit extends Component {
  constructor({type, options, city, date, price}, {pretext, groupsToTypes, typesList, optionsList, cities}) {
    super();
    this._type = type;
    this._options = options;
    this._city = city;
    this._date = date;
    this._price = price;
    this._pretext = pretext;
    this._groupsToTypes = groupsToTypes;
    this._typesList = typesList;
    this._optionsList = optionsList;
    this._cities = cities;
  }

  getTemplate() {
    return `<li class="trip-events__item">
        <form class="event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="${this._typesList[this._type].icon}" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        
              <div class="event__type-list">
    
              ${Object.keys(this._groupsToTypes).map((groupName) => `
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">${groupName}</legend>
                  ${this._groupsToTypes[groupName].map((item) => `
                    <div class="event__type-item">
                      <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === this._type ? `checked=""` : ``}>
                      <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
                    </div>
                  `).join(``)}
                </fieldset>
              `).join(``)}
              
              </div>
            </div>
        
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${this._type} ${this._pretext[this._typesList[this._type].group]}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._city}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${this._cities.map((item) => `
                  <option value="${item}"></option>
                `).join(``)}
              </datalist>
            </div>
        
            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(this._date.start).format(`MM/DD/YY HH:mm`)}">
              —
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(this._date.end).format(`MM/DD/YY HH:mm`)}">
            </div>
        
            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                €
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
            </div>
        
            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
        
            <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </label>
        
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
        
          <section class="event__details">
        
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
    
              ${this._getOptionsTemplate(this._options)}
    
              </div>
            </section>
            
            ${this._getCityTemplate(this._city)}

          </section>
        </form>
      </li>`;
  }

  _getOptionsTemplate(options) {
    return options.map((item) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.option}-1" type="checkbox" name="event-offer-${item.option}" ${item.isChecked === true ? `checked=""` : ``} >
        <label class="event__offer-label" for="event-offer-${item.option}-1">
          <span class="event__offer-title">${this._optionsList[item.option].text}</span>
          +
          € <span class="event__offer-price">${this._optionsList[item.option].price}</span>
        </label>
      </div>
    `).join(``);
  }

  _getCityTemplate(city) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${citiesList[city].text}</p>
        
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${citiesList[city].photos.map((photo) => `
                    <img class="event__photo" src="${photo}" alt="Event photo">
                  `).join(``)}
                </div>
              </div>
            </section>`;
  }

  onTypeChange(evt) {
    const typeIcon = this.getElement().querySelector(`.event__type-icon`);
    const typeTextElement = this.getElement().querySelector(`.event__type-output`);
    const offersElement = this.getElement().querySelector(`.event__available-offers`);
    const typeToggle = this.getElement().querySelector(`.event__type-toggle`);

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    typeIcon.src = this._typesList[evt.target.value].icon;
    typeTextElement.innerHTML = `${evt.target.value} ${this._pretext[this._typesList[evt.target.value].group]}`;

    const options = getOptions(evt.target.value);

    offersElement.innerHTML = this._getOptionsTemplate(options);

    typeToggle.checked = false;
  }

  onCityChange(evt) {
    if (!citiesList[evt.target.value]) {
      evt.target.value = this._city;
      return;
    }

    const cityInfoElement = this.getElement().querySelector(`.event__section--destination`);

    cityInfoElement.innerHTML = ``;

    cityInfoElement.innerHTML = this._getCityTemplate(evt.target.value);
  }
}

export default TripEventEdit;
