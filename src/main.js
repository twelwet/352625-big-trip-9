// main.js

import {menuData, filtersData, points, pointsInfo} from './components/mock-data.js';
import TripInfoController from "./controllers/trip-info.js";
import TripMenuController from "./controllers/trip-menu.js";
import TableController from './controllers/table.js';
import StatsController from "./controllers/stats.js";

const Menu = {TABLE: `Table`, STATS: `Stats`};

const header = document.querySelector(`.page-header`);
const main = document.querySelector(`.page-main`);

const infoElement = header.querySelector(`.trip-info`);
const controlsElement = header.querySelector(`.trip-controls`);
const boardElement = main.querySelector(`.page-body__container`);

const tripInfoController = new TripInfoController(infoElement, points, pointsInfo);
const tripMenuController = new TripMenuController(controlsElement, menuData);
const tableController = new TableController(header, main, filtersData, points, pointsInfo);
const statsController = new StatsController(boardElement);

tripInfoController.init();
tripMenuController.init();

tableController.init();
statsController.init();

statsController.hide();

const menuNodes = [...controlsElement.querySelectorAll(`.trip-tabs__btn`)];

const toggleMenu = (nodes, evt) => {
  nodes.forEach((node) => {
    node.classList.toggle(`trip-tabs__btn--active`);

    node.addEventListener(`click`, onNavBtnPress);
    node.href = `#`;

    if (node.classList.contains(`trip-tabs__btn--active`) && node === evt.target) {
      node.removeEventListener(`click`, onNavBtnPress);
      node.removeAttribute(`href`);
    }
  });
};

const onNavBtnPress = (evt) => {
  evt.preventDefault();

  switch (evt.target.innerText) {
    case Menu.STATS:
      tableController.hide();
      statsController.show();
      toggleMenu(menuNodes, evt);
      break;
    case Menu.TABLE:
      tableController.show();
      statsController.hide();
      toggleMenu(menuNodes, evt);
      break;
  }
};

menuNodes.forEach((item) => item.addEventListener(`click`, onNavBtnPress));
