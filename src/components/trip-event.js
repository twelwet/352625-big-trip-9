// trip-event.js

import moment from 'moment';

const getTripEventTemplate = ({type, options, city, date, price}, {pretext, typesList, optionsList}) => `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${typesList[type].icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${pretext[typesList[type].group]} ${city}</h3>
    
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${moment(date.start).format(`HH:mm`)}">${moment(date.start).format(`HH:mm`)}</time>
          —
          <time class="event__end-time" datetime="${moment(date.end).format(`HH:mm`)}">${moment(date.end).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">
          ${moment
            .duration(moment(date.end)
            .diff(moment(date.start))
            ).hours()}H
          ${moment
            .duration(moment(date.end)
            .diff(moment(date.start))
            ).minutes()}M
        </p>
      </div>
    
      <p class="event__price">
        € <span class="event__price-value">${price}</span>
      </p>
    
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${options
          .filter((option) => !option.isChecked)
          .map((item) => `
            <li class="event__offer">
              <span class="event__offer-title">${item.option}</span>
              +
              € <span class="event__offer-price">${optionsList[item.option].price}</span>
            </li>`).join(``)}
      </ul>
    
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export {getTripEventTemplate};
