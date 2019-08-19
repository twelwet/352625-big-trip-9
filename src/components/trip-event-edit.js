// trip-event-edit.js

const getTripEventEditTemplate = (data) => `
  <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${data.pointsList.filter((list) => list.isActive)[0].name}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${data.pointsList
                .filter((point) => point.group === `transfer`)
                .map((transferPoint) => `
                  <div class="event__type-item">
                    <input id="event-type-${transferPoint.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transferPoint.name}" ${transferPoint.isActive === true ? `checked=""` : ``}>
                    <label class="event__type-label  event__type-label--${transferPoint.name}" for="event-type-${transferPoint.name}-1">${transferPoint.name}</label>
                  </div>
              `).join(``)}

            </fieldset>
    
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${data.pointsList
                .filter((point) => point.group === `activity`)
                .map((activityPoint) => `
                  <div class="event__type-item">
                    <input id="event-type-${activityPoint.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activityPoint.name}" ${activityPoint.isActive === true ? `checked=""` : ``}>
                    <label class="event__type-label  event__type-label--${activityPoint.name}" for="event-type-${activityPoint.name}-1">${activityPoint.name}</label>
                  </div>
                `).join(``)}
            </fieldset>
          </div>
        </div>
    
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${data.pointsList.filter((list) => list.isActive)[0].name} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
    
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${data.date.start}">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${data.date.end}">
        </div>
    
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.price}">
        </div>
    
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
    
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>
    
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
    
      <section class="event__details">
    
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">

          ${data.options.map((option) => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.name}-1" type="checkbox" name="event-offer-${option.name}" ${option.isChecked === true ? `checked=""` : ``} >
              <label class="event__offer-label" for="event-offer-${option.name}-1">
                <span class="event__offer-title">${option.text}</span>
                +
                € <span class="event__offer-price">${option.price}</span>
              </label>
            </div>
          `).join(``)}

          </div>
        </section>
    
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${data.text}</p>
    
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${data.photos.map((photo) => `
                <img class="event__photo" src="${photo}" alt="Event photo">
              `).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
`;

export {getTripEventEditTemplate};
