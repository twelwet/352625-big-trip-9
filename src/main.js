// main.js

import {menuData, filtersData, points, pointsInfo} from './components/mock-data.js';
import TripController from './controllers/trip.js';

const tripController = new TripController(menuData, filtersData, points, pointsInfo);

tripController.init();
