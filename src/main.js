// main.js

import {Position, render} from './utils.js';
import {menuData, filtersData, points, pointsInfo} from './components/mock-data.js';
import TripInfo from './components/trip-info.js';
import TripInfoCost from './components/trip-info-cost.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import TripSort from './components/trip-sort.js';
import TripDays from './components/trip-days.js';
import TripEvent from './components/trip-event.js';
import TripEventEdit from './components/trip-event-edit.js';
import NoEvents from './components/no-events.js';

const mainElement = document.querySelector(`.trip-main`);
const infoElement = mainElement.querySelector(`.trip-info`);
const controlsElement = mainElement.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

const tripInfoCost = new TripInfoCost(pointsInfo);
const menu = new Menu(menuData);
const filters = new Filters(filtersData);

render(infoElement, tripInfoCost.getElement(), Position.BEFOREEND);
render(controlsElement, menu.getElement(), Position.AFTERBEGIN);
render(controlsElement, filters.getElement(), Position.BEFOREEND);

if (points.length === 0) {

  const renderNoEvents = (container) => {
    const noEvents = new NoEvents();
    render(container, noEvents.getElement(), Position.BEFOREEND);
  };

  renderNoEvents(eventsElement);
}

if (points.length > 0) {
  const tripInfo = new TripInfo(pointsInfo);
  const tripSort = new TripSort();

  render(infoElement, tripInfo.getElement(), Position.AFTERBEGIN);
  render(eventsElement, tripSort.getElement(), Position.BEFOREEND);

  const tripSortElement = eventsElement.querySelector(`.trip-sort`);

  const tripDays = new TripDays(pointsInfo);

  render(tripSortElement, tripDays.getElement(), Position.BEFOREEND);

  const onEscPress = (evt, container, tripEvent, tripEventEdit) => {
    if (evt.keyCode === 27) {
      container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
    }
  };

  const renderTripEvent = (container, point, info) => {
    const tripEvent = new TripEvent(point, info);
    const tripEventEdit = new TripEventEdit(point, info);

    tripEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    tripEventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
      document.removeEventListener(`keydown`, onEscPress);
      container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
    });

    render(container, tripEvent.getElement(), Position.BEFOREEND);
  };

  const dayLists = document.querySelectorAll(`.trip-events__list`);

  const pointsByDays = Object.values(pointsInfo.getDaysToPoints());

  [...dayLists].forEach((dayList, index) => {
    pointsByDays[index].forEach((dayPoint) => renderTripEvent(dayList, dayPoint, pointsInfo));
  });
}

