import dayjs from "dayjs";
import {Smart} from "./smart.js";
import {capitalize} from "../utils/common.js";
import {cardCitys} from "../mock/card_mock.js";

import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

// Функция создания шаблона доп услуг
const createOffersTemp = (data) => {
  const kit = [];

  for (let i = 0; i < data.length; i++) {
    const {type, title, price, id, isOfferCheck} = data[i];

    const temp = `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" value="${id}" ${isOfferCheck ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${type}-1">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`;
    kit.push(temp);
  }

  return kit.join(``);
};

const createOptionsDestination = (cities) => {
  const arr = [];

  for (let i = 0; i < cities.length; i++) {
    const temp = `<option value="${cities[i]}"></option>`;
    arr.push(temp);
  }

  return arr.join(``);
};

const getTempCardEdit = (data) => {
  const {city, eventStartTimeFull, eventEndTimeFull, price, addOffer, type, isFavorite} = data;

  return `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${capitalize(type)} to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createOptionsDestination(cardCitys)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(eventStartTimeFull).format(`DD/MM/YY HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(eventEndTimeFull).format(`DD/MM/YY HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
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
          ${createOffersTemp(addOffer)}
        </div>
      </section>
    </section>
  </form>
</li>`;
};

class TempCardEdit extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._allEventsTypeInput = this.getElement().querySelectorAll(`.event__type-item input`);
    this._allEventsOffer = this.getElement().querySelectorAll(`.event__offer-selector input`);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formWithoutData = this._formWithoutData.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._dueStartDateChangeHandler = this._dueStartDateChangeHandler.bind(this);
    this._dueEndDateChangeHandler = this._dueEndDateChangeHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._offerInputHandler = this._offerInputHandler.bind(this);

    this._setDatepicker();
    this._setInnerHandlers();
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d-m-y H:i`,
          defaultDate: this._data.eventStartTimeFull,
          onChange: this._dueStartDateChangeHandler // На событие flatpickr передаём наш колбэк
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d-m-y H:i`,
          defaultDate: this._data.eventEndTimeFull,
          onChange: this._dueEndDateChangeHandler // На событие flatpickr передаём наш колбэк
        }
    );
  }

  reset(point) {
    this.updateData(
        point
    );
  }

  getTemplate() {
    return getTempCardEdit(this._data);
  }

  restoreHandlers() {
    this._allEventsTypeInput = this.getElement().querySelectorAll(`.event__type-item input`);
    this._allEventsOffer = this.getElement().querySelectorAll(`.event__offer-selector input`);

    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormToPointWithoutDataHandler(this._callback.formToPointWithoutData);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);

    for (const event of this._allEventsTypeInput) {
      event.addEventListener(`input`, this._typeInputHandler);
    }

    for (const event of this._allEventsOffer) {
      event.addEventListener(`input`, this._offerInputHandler);
    }
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _formWithoutData(evt) {
    evt.preventDefault();
    this._callback.formToPointWithoutData();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._formSubmitHandler);
  }

  setFormToPointWithoutDataHandler(callback) {
    this._callback.formToPointWithoutData = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formWithoutData);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value
    }, true);
  }

  _dueStartDateChangeHandler([userDate]) {
    // По заданию дедлайн у задачи устанавливается без учёта времеми,
    // но объект даты без времени завести нельзя,
    // поэтому будем считать срок у всех задач -
    // это 23:59:59 установленной даты

    this.updateData({
      eventStartTimeFull: userDate
    });
  }

  _dueEndDateChangeHandler([userDate]) {
    // По заданию дедлайн у задачи устанавливается без учёта времеми,
    // но объект даты без времени завести нельзя,
    // поэтому будем считать срок у всех задач -
    // это 23:59:59 установленной даты;

    this.updateData({
      eventEndTimeFull: userDate
    });
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _offerInputHandler(evt) {
    evt.preventDefault();

    const data = evt.target.value;

    this._dataOffer = JSON.parse(JSON.stringify(this._data.addOffer));

    this._dataOffer[data].isOfferCheck = !this._dataOffer[data].isOfferCheck;

    this.updateData({
      addOffer: this._dataOffer
    });
  }
}

export {TempCardEdit};
