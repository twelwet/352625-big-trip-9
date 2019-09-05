// trip-event.js

import Component from './component.js';
import moment from 'moment';

class TripEvent extends Component {
  constructor({type, options, city, date, price}, {pretext, typesList, optionsList}) {
    super();
    this._type = type;
    this._options = options;
    this._city = city;
    this._date = date;
    this._price = price;
    this._pretext = pretext;
    this._typesList = typesList;
    this._optionsList = optionsList;
  }

  getTemplate() {
    return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="${this._typesList[this._type].icon}" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._type} ${this._pretext[this._typesList[this._type].group]} ${this._city}</h3>
        
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${moment(this._date.start).format(`HH:mm`)}">${moment(this._date.start).format(`HH:mm`)}</time>
              —
              <time class="event__end-time" datetime="${moment(this._date.end).format(`HH:mm`)}">${moment(this._date.end).format(`HH:mm`)}</time>
            </p>
            <p class="event__duration">
              ${moment
                .duration(moment(this._date.end)
                .diff(moment(this._date.start))
                ).hours()}H
              ${moment
                .duration(moment(this._date.end)
                .diff(moment(this._date.start))
                ).minutes()}M
            </p>
          </div>
        
          <p class="event__price">
            € <span class="event__price-value">${this._price}</span>
          </p>
        
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this._options
              .filter((option) => !option.isChecked)
              .map((item) => `
                <li class="event__offer">
                  <span class="event__offer-title">${item.option}</span>
                  +
                  € <span class="event__offer-price">${this._optionsList[item.option].price}</span>
                </li>`).join(``)}
          </ul>
        
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`;
  }
}

export default TripEvent;
