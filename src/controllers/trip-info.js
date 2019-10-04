// trip-info.js

import TripInfoCost from "../components/trip-info-cost";
import {Position, render} from "../utils";
import TripInfo from "../components/trip-info";

class TripInfoController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
    this._tripInfo = new TripInfo(points, pointsInfo);
    this._tripInfoCost = new TripInfoCost(points, pointsInfo);
  }

  _initTripInfo() {
    if (this._points.length > 0) {
      render(this._container, this._tripInfo.getElement(), Position.AFTERBEGIN);
    }
  }

  _initTripInfoCost() {
    render(this._container, this._tripInfoCost.getElement(), Position.BEFOREEND);
  }

  init() {
    this._initTripInfoCost();
    this._initTripInfo();
  }

  update(points) {
    const totalPriceElement = this._tripInfoCost.getElement().querySelector(`.trip-info__cost-value`);
    const citiesElement = this._tripInfo.getElement().querySelector(`.trip-info__title`);
    const datesElement = this._tripInfo.getElement().querySelector(`.trip-info__dates`);

    totalPriceElement.innerText = this._pointsInfo.getTotalPrice(points);
    citiesElement.innerText = this._pointsInfo.getCitiesInfo(points);
    datesElement.innerText = this._pointsInfo.getDatesInfo(points);
  }
}

export default TripInfoController;
