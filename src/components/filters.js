// filters.js

const getFiltersTemplate = (data) => `
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">

  ${data.map((item) => `
    <div class="trip-filters__filter">
      <input 
        id="filter-${item.name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${item.name}"
        ${item.checked ? `checked=""` : ``}
      >
      <label 
        class="trip-filters__filter-label"
        for="filter-${item.name}"
      >${item.name}
      </label>
    </div>`).join(``)}

  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export {getFiltersTemplate};
