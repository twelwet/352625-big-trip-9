// stats.js

import {Position, render} from "../utils";
import Stats from "../components/stats.js";

class StatsController {
  constructor(container) {
    this._container = container;
    this._stats = new Stats();
  }

  init() {
    render(this._container, this._stats.getElement(), Position.BEFOREEND);
  }

  hide() {
    this._stats.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._stats.getElement().classList.remove(`visually-hidden`);
  }

}

export default StatsController;
