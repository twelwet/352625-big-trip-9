// trip-events.js

import {getTripEventTemplate} from './trip-event';
import {getTripEventEditTemplate} from './trip-event-edit';

const getTripEventsTemplate = (points, info) => {
  const firstPoint = points.slice()[0];
  const otherPoints = points.slice(1);

  return getTripEventEditTemplate(firstPoint, info)
    + otherPoints.map((point) => getTripEventTemplate(point));
};

export {getTripEventsTemplate};
