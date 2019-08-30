// trip-days.js

const getTripDaysTemplate = (info) => `
<ul class="trip-days">
  ${Object.keys(info.daysToIds).map((day, index) => `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="2019-03-18">${day}</time>
      </div>
      <ul class="trip-events__list"></ul>  
    </li>
  `).join(``)}
</ul>
`;

export {getTripDaysTemplate};
