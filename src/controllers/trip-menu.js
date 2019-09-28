// trip-menu.js

import Menu from "../components/menu";
import {Position, render} from "../utils";

class TripMenuController {
  constructor(container, menuData) {
    this._container = container;
    this._menuData = menuData;
  }

  init() {
    const menu = new Menu(this._menuData);

    render(this._container, menu.getElement(), Position.AFTERBEGIN);
  }
}

export default TripMenuController;
