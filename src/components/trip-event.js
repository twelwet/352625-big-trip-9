// trip-event.js

import moment from 'moment';

const getTripEventTemplate = (data) => `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${data.pointsList.filter((list) => list.isActive)[0].name}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${data.pointsList.filter((list) => list.isActive)[0].name} at ${data.city}</h3>
    
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${data.date.start}">${moment(data.date.start).format(`hh:mm`)}</time>
          —
          <time class="event__end-time" datetime="${data.date.end}">${moment(data.date.end).format(`hh:mm`)}</time>
        </p>
        <p class="event__duration">
          ${moment
            .duration(moment(data.date.end)
            .diff(moment(data.date.start))
            )}
        </p>
      </div>
    
      <p class="event__price">
        € <span class="event__price-value">${data.price}</span>
      </p>
    
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${data.options
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
