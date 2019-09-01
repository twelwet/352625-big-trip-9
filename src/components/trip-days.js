// trip-days.js

import {getTripEventTemplate} from './trip-event';
import {getTripEventEditTemplate} from "./trip-event-edit";

const getTripDaysTemplate = (points, info) => `
<ul class="trip-days">
  ${Object.keys(info.daysToIds).map((day, index) => `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${day}">${day}</time>
      </div>
      <ul class="trip-events__list">
        ${points.filter((point) => Object.values(info.daysToIds)[index]
            .find((item) => item === point.id))
          .map((point) => {
            if (points[0] === point) {
              return getTripEventEditTemplate(point, info);
            } else {
              return getTripEventTemplate(point, info);
            }
          })}
      </ul>  
    </li>
  `).join(``)}
</ul>
`;

export {getTripDaysTemplate};
