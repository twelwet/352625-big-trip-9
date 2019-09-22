// mock-data.js

import moment from 'moment';

const menuData = [
  {
    name: `Table`,
    isChecked: true
  },
  {
    name: `Stats`,
    isChecked: false
  }
];

const filtersData = [
  {
    name: `everything`,
    isChecked: true
  },
  {
    name: `future`,
    isChecked: false
  },
  {
    name: `past`,
    isChecked: false
  }
];

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

const Type = {
  BUS: `bus`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  SHIP: `ship`,
  TAXI: `taxi`,
  TRAIN: `train`,
  TRANSPORT: `transport`,
  CHECK_IN: `check-in`,
  RESTAURANT: `restaurant`,
  SIGHTSEEING: `sightseeing`,
};

const Group = {TRANSFER: `transfer`, ACTIVITY: `activity`};

const Pretext = {[Group.TRANSFER]: `to`, [Group.ACTIVITY]: `in`};

const Option = {
  LUGGAGE: `luggage`,
  COMFORT: `comfort`,
  MEAL: `meal`,
  SEATS: `seats`,
  TRAIN: `train`
};

const City = {
  BERLIN: `Berlin`,
  AMSTERDAM: `Amsterdam`,
  BUDAPEST: `Budapest`,
  NEW_YORK: `New York`,
  MOSCOW: `Moscow`
};

const typesList = {
  [Type.BUS]: {icon: `img/icons/${Type.BUS}.png`, group: Group.TRANSFER},
  [Type.DRIVE]: {icon: `img/icons/${Type.DRIVE}.png`, group: Group.TRANSFER},
  [Type.FLIGHT]: {icon: `img/icons/${Type.FLIGHT}.png`, group: Group.TRANSFER},
  [Type.SHIP]: {icon: `img/icons/${Type.SHIP}.png`, group: Group.TRANSFER},
  [Type.TAXI]: {icon: `img/icons/${Type.TAXI}.png`, group: Group.TRANSFER},
  [Type.TRAIN]: {icon: `img/icons/${Type.TRAIN}.png`, group: Group.TRANSFER},
  [Type.TRANSPORT]: {icon: `img/icons/${Type.TRANSPORT}.png`, group: Group.TRANSFER},
  [Type.CHECK_IN]: {icon: `img/icons/${Type.CHECK_IN}.png`, group: Group.ACTIVITY},
  [Type.RESTAURANT]: {icon: `img/icons/${Type.RESTAURANT}.png`, group: Group.ACTIVITY},
  [Type.SIGHTSEEING]: {icon: `img/icons/${Type.SIGHTSEEING}.png`, group: Group.ACTIVITY}
};

const optionsList = {
  [Option.LUGGAGE]: {
    text: `Add ${Option.LUGGAGE}`,
    price: 10
  },
  [Option.COMFORT]: {
    text: `Switch to ${Option.COMFORT} class`,
    price: 150
  },
  [Option.MEAL]: {
    text: `Add ${Option.MEAL}`,
    price: 2
  },
  [Option.SEATS]: {
    text: `Choose ${Option.SEATS}`,
    price: 9
  },
  [Option.TRAIN]: {
    text: `Travel by ${Option.TRAIN}`,
    price: 40
  }
};

const groupsToOptions = {
  [Group.TRANSFER]: [Option.LUGGAGE, Option.COMFORT, Option.MEAL, Option.SEATS],
  [Group.ACTIVITY]: [Option.MEAL, Option.TRAIN]
};

const getRandom = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const getRandomIndex = (arr) => getRandom(0, arr.length - 1);

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getPhotos = (count = 5) => {
  let photos = [...(new Array(count))];
  photos = photos.map(getRandomPhoto);
  return photos;
};

const getSomePhrases = (text = DESCRIPTION, min = 1, max = 3) => {
  const mockPhrases = text.split(`. `).map((item) => item.trim());
  let randomPhrases = [...(new Array(getRandom(min, max)))];
  randomPhrases = randomPhrases.map((item) => {
    item = mockPhrases.splice(getRandomIndex(mockPhrases), 1);
    return item;
  });
  return (randomPhrases.join(`. `) + `.`);
};

const getCitiesList = () => {
  const list = {};

  Object.values(City)
    .forEach((city) => Object
      .assign(list, {[city]: {
        photos: getPhotos(),
        text: getSomePhrases()
      }}));

  return list;
};

const citiesList = getCitiesList();

const getType = () => Object.values(Type)[getRandomIndex(Object.values(Type))];

const randomizeOptions = (arr, min = 0, max = 2) => {
  let count = min;

  for (const item of arr) {
    item.isChecked = Math.random() < 0.5;

    if (item.isChecked === true) {
      count += 1;
    }

    if (count === max) {
      return arr;
    }
  }

  return arr;
};

const getOptions = (type) => {
  return groupsToOptions[typesList[type].group]
    .map((item) => ({option: item, isChecked: false}));
};

const getRandomOptions = (type) => randomizeOptions(getOptions(type));

const getCity = () => Object.values(City)[getRandomIndex(Object.values(City))];

const getSerialDates = (count = QUANTITY_OF_POINTS) => {
  const serialDates = [...(new Array(count + 1))];

  const minHours = 1;
  const maxHours = 20;

  serialDates[0] = Date.now() + getRandom(minHours * 60 * 60 * 1000, maxHours * 60 * 60 * 1000);

  let i = 1;
  do {
    serialDates[i] = serialDates[i - 1] + getRandom(minHours * 60 * 60 * 1000, maxHours * 60 * 60 * 1000);
    i += 1;
  } while (i < serialDates.length);

  return serialDates;
};

const getPeriods = (arr) => {
  return arr.map((item, index) => ({
    start: arr.slice(index)[0],
    end: arr.slice(index + 1)[0]})
  ).slice(0, -1);
};

const getPrice = (minPrice = 10, maxPrice = 500) => getRandom(minPrice, maxPrice);

const getPoint = () => {
  const id = Math.random().toString(36).slice(2);
  const type = getType();
  const options = getRandomOptions(type);
  const city = getCity();
  const price = getPrice();

  return {
    id,
    type,
    options,
    city,
    date: {
      start: ``,
      end: ``
    },
    price
  };
};

const getPoints = (count = QUANTITY_OF_POINTS) => {
  if (count > 0) {
    const dates = getPeriods(getSerialDates());

    let routePoints = [...(new Array(count))].map(getPoint);

    for (const [index, date] of dates.entries()) {
      routePoints[index].date = date;
    }

    return routePoints;
  }

  return [];
};

const points = getPoints();

const getIdsToPeriods = (events) => events
  .reduce((acc, event) => Object
    .assign(acc, {[event.id]: event.date.end - event.date.start}), {});

const getGroupsToTypes = () => {
  const list = {};

  Object.values(Group)
    .forEach((groupName) => Object
      .assign(list, {
        [groupName]: Object.keys(typesList).filter((item) => typesList[item].group === groupName)
      }));

  return list;
};

const groupsToTypes = getGroupsToTypes();

const getDaysToPoints = (events) => {
  const daysToPoints = events.reduce((acc, event) => {
    const dateString = moment(event.date.start).format(`MMM D YYYY`);
    return Object.assign(acc, {
      [dateString]: [...acc[dateString] || [], event]
    });
  }, {});

  Object.values(daysToPoints)
    .forEach((dayPoints) => dayPoints
      .sort((a, b) => Number(a.date.start) - Number(b.date.start)));

  return daysToPoints;
};

const getTotalPrice = () => points.map((point) => point.price).reduce((sum, current) => sum + current, 0);

const pointsInfo = {
  pretext: Pretext,
  getDaysToPoints,
  getIdsToPeriods,
  groupsToTypes,
  typesList,
  optionsList,
  citiesList,
  cities: points.map((point) => point.city),
  dates: points.map((point) => point.date),
  getTotalPrice
};
console.log(citiesList)
export {menuData, filtersData, points, pointsInfo, getOptions, citiesList};
