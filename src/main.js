// main.js

import {render} from './utils.js';
import tripInfoTemplate from './components/trip-info.js';
import menuTemplate from './components/menu.js';
import filtersTemplate from './components/filters.js';
import tripSortTemplate from './components/trip-sort.js';
import tripDayTemplate from './components/trip-day.js';
import getTripEventsTemplate from './components/trip-events.js';

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

render(tripInfoTemplate, tripInfoContainer, `afterBegin`);
render(menuTemplate, tripControlsContainer, `afterBegin`);
render(filtersTemplate, tripControlsContainer, `beforeEnd`);
render(tripSortTemplate, tripEventsContainer, `afterBegin`);
render(tripDayTemplate, tripDaysContainer, `afterBegin`);

const tripEventsListContainer = tripDaysContainer.querySelector(`.trip-events__list`);

render(getTripEventsTemplate(3), tripEventsListContainer, `afterBegin`);
