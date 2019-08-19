// mock-data.js

import moment from 'moment';

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const ALL_ROUTE_POINTS = [
  {
    name: `bus`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `drive`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `flight`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `ship`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `taxi`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `train`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `transport`,
    group: `transfer`,
    isActive: false,
  },
  {
    name: `check-in`,
    group: `activity`,
    isActive: false,
  },
  {
    name: `restaurant`,
    group: `activity`,
    isActive: false,
  },
  {
    name: `sightseeing`,
    group: `activity`,
    isActive: false,
  }
];

const CITIES = [`Berlin`, `Amsterdam`, `Budapest`, `New York`];

const OPTIONS = [
  {
    name: `luggage`,
    text: `Add luggage`,
    price: 10,
    isChecked: false
  },
  {
    name: `comfort`,
    text: `Switch to comfort class`,
    price: 150,
    isChecked: false
  },
  {
    name: `meal`,
    text: `Add meal`,
    price: 2,
    isChecked: false
  },
  {
    name: `seats`,
    text: `Choose seats`,
    price: 9,
    isChecked: false
  },
  {
    name: `train`,
    text: `Travel by train`,
    price: 40,
    isChecked: false
  }
];

const menu = [
  {
    name: `Table`,
    checked: true
  },
  {
    name: `Stats`,
    checked: false
  }
];

const filters = [
  {
    name: `everything`,
    checked: true
  },
  {
    name: `future`,
    checked: false
  },
  {
    name: `past`,
    checked: false
  }
];

const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);

const getRoutePointsList = () => {
  const allRoutePoints = JSON.parse(JSON.stringify(ALL_ROUTE_POINTS));

  allRoutePoints[getRandomIndex(allRoutePoints)].isActive = true;
  return allRoutePoints;
};

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getPhotos = (count = 5) => {
  let photos = [...(new Array(count))];
  photos = photos.map(getRandomPhoto);
  return photos;
};

const getSomePhrases = (text = DESCRIPTION, min = 1, max = 3) => {
  const mockPhrases = text.split(`. `);
  let randomPhrases = [...(new Array(getRandomInteger(min, max)))];
  randomPhrases = randomPhrases.map((item) => {
    item = mockPhrases.splice(getRandomIndex(mockPhrases), 1).toString();
    return item;
  });
  return (randomPhrases.join(`. `) + `.`);
};

const getDate = (minHours = 1, maxHours = 10) => {
  const startStamp = Date.now();
  const endStamp = startStamp + getRandomInteger(minHours * 60 * 60 * 1000, maxHours * 60 * 60 * 1000);

  return {
    start: moment(startStamp).format(`L hh:mm`),
    end: moment(endStamp).format(`L hh:mm`)
  };
};

const getPrice = (minPrice = 10, maxPrice = 500) => getRandomInteger(minPrice, maxPrice);

const getOptions = (min = 0, max = 2) => {
  const options = JSON.parse(JSON.stringify(OPTIONS));

  let count = min;
  for (const item of options) {
    item.isChecked = Math.random() < 0.5;

    if (item.isChecked === true) {
      count += 1;
    }

    if (count === max) {
      return options;
    }
  }
  return options;
};


const getRoutePoint = () => {
  return {
    pointsList: getRoutePointsList(),
    city: CITIES[getRandomIndex(CITIES)],
    photos: getPhotos(),
    text: getSomePhrases(),
    date: getDate(),
    price: getPrice(),
    options: getOptions()
  };
};

const getRoutePoints = (count = 4) => {
  let routePoints = [...(new Array(count))];
  routePoints = routePoints.map(getRoutePoint);
  return routePoints;
};

const routePoints = getRoutePoints();

export {menu, filters, routePoints};
