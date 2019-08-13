// trip-events.js

import {getTripEventTemplate} from './trip-event';
import {getTripEventEditTemplate} from './trip-event-edit';


const getTripEventsTemplate = (count) => {
  let template = getTripEventEditTemplate();

  let i = 0;
  do {
    template += getTripEventTemplate();
    i += 1;
  } while (i < count);

  return template;
};

export {getTripEventsTemplate};
