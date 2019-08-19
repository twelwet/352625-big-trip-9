// menu.js

const getMenuTemplate = (data) => `
  <nav class="trip-controls__trip-tabs  trip-tabs">
  ${data.map((item) => `
    <a class="trip-tabs__btn ${item.checked === true ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>
  `).join(``)}
  </nav>
`;

export {getMenuTemplate};
