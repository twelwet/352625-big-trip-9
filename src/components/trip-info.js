// trip-info.js

import moment from 'moment';

const getTripInfoTemplate = ({cities, dates, totalPrice}) => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities[0]} — ... — ${cities[cities.length - 1]}</h1>
    <p class="trip-info__dates">${moment(dates[0].start).format(`MMM D`)} — ${moment(dates[dates.length - 1].end).format(`MMM D`)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro; <span class="trip-info__cost-value">${totalPrice}</span>
  </p>
`;

export {getTripInfoTemplate};
