// trip-info.js

import moment from 'moment';

const getTripInfoTemplate = (info) => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${info.cities[0]} — ... — ${info.cities[info.cities.length - 1]}</h1>
    <p class="trip-info__dates">${moment(info.dates[0].start).format(`MMM D`)} — ${moment(info.dates[info.dates.length - 1].end).format(`MMM D`)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro; <span class="trip-info__cost-value">${info.totalPrice}</span>
  </p>
`;

export {getTripInfoTemplate};
