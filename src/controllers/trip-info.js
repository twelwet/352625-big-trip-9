// trip-info.js

import TripInfoCost from "../components/trip-info-cost";
import {Position, render} from "../utils";
import TripInfo from "../components/trip-info";

class TripInfoController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
    this._tripInfoCost = new TripInfoCost(points, pointsInfo);
  }

  _initTripInfo() {
    if (this._points.length > 0) {
      const tripInfo = new TripInfo(this._pointsInfo);
      render(this._container, tripInfo.getElement(), Position.AFTERBEGIN);
    }
  }

  _initTripInfoCost() {
    render(this._container, this._tripInfoCost.getElement(), Position.BEFOREEND);
  }

  init() {
    this._initTripInfoCost();
    this._initTripInfo();
  }

  update() {
    const totalPriceElement = this._tripInfoCost.getElement().querySelector(`.trip-info__cost-value`);
    totalPriceElement.innerText = this._pointsInfo.getTotalPrice(this._points);
  }
}

export default TripInfoController;
