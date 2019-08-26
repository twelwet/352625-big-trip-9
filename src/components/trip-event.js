// trip-event.js

import moment from 'moment';

const getTripEventTemplate = (tripEvent) => `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${tripEvent.type} at ${tripEvent.city}</h3>
    
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${moment(tripEvent.date.start).format(`L hh:mm`)}">${moment(tripEvent.date.start).format(`hh:mm`)}</time>
          —
          <time class="event__end-time" datetime="${moment(tripEvent.date.end).format(`L hh:mm`)}">${moment(tripEvent.date.end).format(`hh:mm`)}</time>
        </p>
        <p class="event__duration">
          ${moment
            .duration(moment(tripEvent.date.end)
            .diff(moment(tripEvent.date.start))
            )}
        </p>
      </div>
    
      <p class="event__price">
        € <span class="event__price-value">${tripEvent.price}</span>
      </p>
    
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${tripEvent.options
          .filter((option) => !option.isChecked)
          .map((item) => `
            <li class="event__offer">
              <span class="event__offer-title">${item.name}</span>
              +
              € <span class="event__offer-price">${item.price}</span>
            </li>`).join(``)}
      </ul>
    
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export {getTripEventTemplate};
