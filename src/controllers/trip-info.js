// trip-info.js

import TripInfoCost from "../components/trip-info-cost";
import {Position, render} from "../utils";
import TripInfo from "../components/trip-info";

class TripInfoController {
  constructor(container, points, pointsInfo) {
    this._container = container;
    this._points = points;
    this._pointsInfo = pointsInfo;
  }

  init() {
    const tripInfoCost = new TripInfoCost(this._pointsInfo);
    render(this._container, tripInfoCost.getElement(), Position.BEFOREEND);

    if (this._points.length > 0) {
      const tripInfo = new TripInfo(this._pointsInfo);
      render(this._container, tripInfo.getElement(), Position.AFTERBEGIN);
    }
  }
}

export default TripInfoController;
