// mock-data.js

const QUANTITY_OF_POINTS = 4;

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                     Cras aliquet varius magna, non porta ligula feugiat eget. 
                     Fusce tristique felis at fermentum pharetra. 
                     Aliquam id orci ut lectus varius viverra. 
                     Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
                     Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
                     Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
                     Sed sed nisi sed augue convallis suscipit in sed felis. 
                     Aliquam erat volutpat. 
                     Nunc fermentum tortor ac porta dapibus. 
                     In rutrum ac purus sit amet tempus`;

const TRIP_POINTS = {
  transfer: [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`],
  activity: [`check-in`, `restaurant`, `sightseeing`]
};

const CITIES = [`Berlin`, `Amsterdam`, `Budapest`, `New York`];

const OPTIONS = [
  {
    name: `luggage`,
    text: `Add luggage`,
    price: 10
  },
  {
    name: `comfort`,
    text: `Switch to comfort class`,
    price: 150
  },
  {
    name: `meal`,
    text: `Add meal`,
    price: 2
  },
  {
    name: `seats`,
    text: `Choose seats`,
    price: 9
  },
  {
    name: `train`,
    text: `Travel by train`,
    price: 40
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

const getPointType = (obj) => {
  const groups = Object.keys(obj);
  const group = groups[getRandomIndex(groups)];
  const typesList = obj[`${group}`];
  return typesList[getRandomIndex(typesList)];
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
    item = mockPhrases.splice(getRandomIndex(mockPhrases), 1);
    return item;
  });
  return (randomPhrases.join(`. `) + `.`);
};

const getSerialDates = (count = QUANTITY_OF_POINTS) => {
  let serialDates = [...(new Array(count + 1))];

  const minHours = 1;
  const maxHours = 10;

  serialDates[0] = Date.now() + getRandomInteger(minHours * 60 * 60 * 1000, maxHours * 60 * 60 * 1000);

  let i = 1;
  do {
    serialDates[i] = serialDates[i - 1] + getRandomInteger(minHours * 60 * 60 * 1000, maxHours * 60 * 60 * 1000)
    i += 1;
  } while (i < serialDates.length);

  return serialDates;
};

const getDates = (arr) => {
  let datePairs = [...(new Array(arr.length - 1))];

  // [ВОПРОС] Подскажи как реализовать через 'for...of'?
  //
  for (let i = 0; i < datePairs.length; i++) {
    datePairs[i] = {};
    datePairs[i].start = arr.slice(i)[0];
    datePairs[i].end = arr.slice(i + 1)[0];
  }

  // for (let [index, item] of datePairs.entries()) {
  //   item = {};
  //   item.start = arr.slice(index, index + 1)[0];
  //   item.end = arr.slice(index + 1, index + 2)[0];
  // }

  return datePairs;
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

const getPointsInfo = () => JSON.parse(JSON.stringify(TRIP_POINTS));

const getRoutePoint = () => {
  return {
    type: getPointType(TRIP_POINTS),
    city: CITIES[getRandomIndex(CITIES)],
    photos: getPhotos(),
    text: getSomePhrases(),
    date: {},
    price: getPrice(),
    options: getOptions()
  };
};

const dates = getDates(getSerialDates());

const getRoutePoints = (count = QUANTITY_OF_POINTS) => {
  let routePoints = [...(new Array(count))];
  routePoints = routePoints.map(getRoutePoint);

  for (const [index, date] of dates.entries()) {
    routePoints[index].date = date;
  }

  return routePoints;
};

const routePoints = getRoutePoints();

const tripInfo = {
  cities: routePoints.map((point) => point.city),
  dates: routePoints.map((point) => point.date),
  totalPrice: routePoints.map((point) => point.price).reduce((sum, current) => sum + current),
  pointsInfo: getPointsInfo()
};

export {menu, filters, routePoints, tripInfo};
