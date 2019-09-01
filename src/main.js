// main.js
import {menu, filters, points, pointsInfo} from './components/mock-data.js';
import {getTripInfoTemplate} from './components/trip-info.js';
import {getMenuTemplate} from './components/menu.js';
import {getFiltersTemplate} from './components/filters.js';
import {getTripSortTemplate} from './components/trip-sort.js';
import {getTripDaysTemplate} from './components/trip-days.js';

const render = (template, element, placeToPaste = `afterBegin`) => element.insertAdjacentHTML(placeToPaste, template);

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsHeaderElement = tripEventsElement.querySelector(`h2`);

render(getTripInfoTemplate(pointsInfo), tripInfoElement);
render(getMenuTemplate(menu), tripControlsElement);
render(getFiltersTemplate(filters), tripControlsElement, `beforeEnd`);
render(getTripSortTemplate(), tripEventsHeaderElement, `afterEnd`);

const tripSortElement = tripEventsElement.querySelector(`.trip-sort`);

render(getTripDaysTemplate(points, pointsInfo), tripSortElement, `afterEnd`);
