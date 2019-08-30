// trip-info.js

import moment from 'moment';

const getTripInfoTemplate = (data) => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${data.cities[0]} — ... — ${data.cities[data.cities.length - 1]}</h1>
    <p class="trip-info__dates">${moment(data.dates[0].start).format(`MMM M`)} —&nbsp;${moment(data.dates[data.dates.length - 1].end).format(`M`)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro; <span class="trip-info__cost-value">${data.totalPrice}</span>
  </p>

`;

export {getTripInfoTemplate};
