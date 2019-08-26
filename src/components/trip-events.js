// trip-events.js

import {getTripEventTemplate} from './trip-event';
import {getTripEventEditTemplate} from './trip-event-edit';

const getTripEventsTemplate = (points, info) => {
  let template = getTripEventEditTemplate(points[0], info);

  let i = 1;
  do {
    template += getTripEventTemplate(points[i]);
    i += 1;
  } while (i < points.length);

  return template;
};

export {getTripEventsTemplate};
