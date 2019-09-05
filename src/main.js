// main.js

import {points, pointsInfo} from './components/mock-data.js';
import TripController from './controllers/trip.js';

const tripController = new TripController(points, pointsInfo);

tripController.init();
