// trip-controls.js

import Menu from "../components/menu";
import Filters from "../components/filters";
import {Position, render} from "../utils";

class TripControlsController {
  constructor(container, menuData, filtersData) {
    this._container = container;
    this._menuData = menuData;
    this._filtersData = filtersData;
  }

  init() {
    const menu = new Menu(this._menuData);
    const filters = new Filters(this._filtersData);

    render(this._container, menu.getElement(), Position.AFTERBEGIN);
    render(this._container, filters.getElement(), Position.BEFOREEND);
  }
}

export default TripControlsController;
