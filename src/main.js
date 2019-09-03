// main.js

import {Position, render} from './utils.js';
import {menuData, filtersData, pointsInfo} from './components/mock-data.js';
import TripInfo from './components/trip-info.js';
import TripInfoCost from './components/trip-info-cost.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import TripSort from './components/trip-sort.js';
import TripDays from './components/trip-days.js';
import TripEvent from './components/trip-event.js';
import TripEventEdit from './components/trip-event-edit.js';

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

const tripInfo = new TripInfo(pointsInfo);
const tripInfoCost = new TripInfoCost(pointsInfo);

render(infoElement, tripInfo.getElement(), Position.AFTERBEGIN);
render(infoElement, tripInfoCost.getElement(), Position.BEFOREEND);

const menu = new Menu(menuData);
const filters = new Filters(filtersData);
const tripSort = new TripSort();

render(controlsElement, menu.getElement(), Position.AFTERBEGIN);
render(controlsElement, filters.getElement(), Position.BEFOREEND);
render(eventsElement, tripSort.getElement(), Position.BEFOREEND);

const tripSortElement = eventsElement.querySelector(`.trip-sort`);

const tripDays = new TripDays(pointsInfo);

render(tripSortElement, tripDays.getElement(), Position.BEFOREEND);

const renderTripEvent = (container, point, info) => {
  const tripEvent = new TripEvent(point, info);
  const tripEventEdit = new TripEventEdit(point, info);

  tripEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
  });

  tripEventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
    container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
  });

  render(container, tripEvent.getElement(), Position.BEFOREEND);
};

const dayLists = document.querySelectorAll(`.trip-events__list`);

const pointsByDays = Object.values(pointsInfo.daysToPoints);

[...dayLists].forEach((dayList, index) => {
  pointsByDays[index].forEach((dayPoint) => renderTripEvent(dayList, dayPoint, pointsInfo));
});
