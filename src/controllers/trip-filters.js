// trip-filters.js

import Filters from "../components/filters";
import {Position, render} from "../utils";

class TripFiltersController {
  constructor(container, filtersData) {
    this._container = container;
    this._filters = new Filters(filtersData);
  }

  init() {
    render(this._container, this._filters.getElement(), Position.BEFOREEND);
  }

  hide() {
    this._filters.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._filters.getElement().classList.remove(`visually-hidden`);
  }
}

export default TripFiltersController;
