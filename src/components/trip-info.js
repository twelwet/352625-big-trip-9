// trip-info.js

const getTripInfoTemplate = (data) => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${data.cities[0]} — ... — ${data.cities[data.cities.length - 1]}</h1>
    <p class="trip-info__dates">${data.dates[0].start} —&nbsp;${data.dates[data.dates.length - 1].end}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro; <span class="trip-info__cost-value">${data.totalPrice}</span>
  </p>

`;

export {getTripInfoTemplate};
