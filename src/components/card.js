import dayjs from "dayjs";
import {getNumberWithLeadZero, capitalize} from "../utils/common.js";
import {Abstract} from "./abstract.js";

// Функция создания шаблона доп услуг
const createOffersTemp = (data) => {
  const kit = [];

  for (let i = 0; i < data.length; i++) {
    const {title, price} = data[i];

    const temp = `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
   </li>`;
    kit.push(temp);
  }

  return kit.join(``);
};

// Функция создания шаблона полного времени точки из базы
const getCalcDuratData = (eventStartTime, eventEndTime) => {
  const min = dayjs(eventEndTime).diff(dayjs(eventStartTime), `minute`);

  let days = 0;
  let hours = 0;
  let minutes = 0;

  if (min < 60) {
    return `${getNumberWithLeadZero(min)}M`;
  } else if (min >= 60 && min <= 1440) {
    hours = Math.floor(min / 60);
    minutes = min % 60;

    return `${getNumberWithLeadZero(hours)}H ${getNumberWithLeadZero(minutes)}M`;
  } else {
    days = Math.floor(min / 1440);
    hours = Math.floor((min % 1440) / 60);
    minutes = min % 60;

    return `${getNumberWithLeadZero(days)}D ${getNumberWithLeadZero(hours)}H ${getNumberWithLeadZero(minutes)}M `;
  }
};


const getTempCard = (data) => {
  const {
    type,
    city,
    eventStartTime,
    eventStartTimeFull,
    eventEndTime,
    eventEndTimeFull,
    price,
    addOffer
  } = data;

  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${capitalize(type)} to ${city}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${eventStartTime}">${dayjs(eventStartTimeFull).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${eventEndTime}">${dayjs(eventEndTimeFull).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${getCalcDuratData(eventStartTimeFull, eventEndTimeFull)}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersTemp(addOffer)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

class TempCard extends Abstract {
  constructor(data) {
    super();
    this._data = data;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return getTempCard(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}

export {TempCard};
