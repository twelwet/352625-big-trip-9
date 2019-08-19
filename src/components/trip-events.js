// trip-events.js

import {getTripEventTemplate} from './trip-event';
import {getTripEventEditTemplate} from './trip-event-edit';
import {routePoints} from './mock-data.js';

const getTripEventsTemplate = (count = routePoints.length) => {
  let template = getTripEventEditTemplate(routePoints[0]);

  let i = 1;
  do {
    template += getTripEventTemplate(routePoints[i]);
    i += 1;
  } while (i < count);

  return template;
};

export {getTripEventsTemplate};
