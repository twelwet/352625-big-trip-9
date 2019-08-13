// trip-days.js

import {getTripDayTemplate} from './trip-day';

const getTripDaysTemplate = () => `
<ul class="trip-days">
  ${getTripDayTemplate()}
</ul>
`;

export {getTripDaysTemplate};
