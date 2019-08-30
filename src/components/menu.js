// menu.js

const getMenuTemplate = (data) => `
  <h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs  trip-tabs">
  ${data.map((item) => `
    <a class="trip-tabs__btn ${item.isChecked === true ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>
  `).join(``)}
  </nav>
`;

export {getMenuTemplate};
