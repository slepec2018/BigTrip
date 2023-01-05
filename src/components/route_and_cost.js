import dayjs from "dayjs";
import {createElement} from "../utills.js";

// Функция выведения суммы всех расходов точек
const getPriceAmount = (data) => {
  let amount = 0;

  for (const item of data) {
    amount += item.price;
  }

  return amount;
};

// Функция выведения карты маршрута поездки
const getCityTrip = (data) => {
  const citiesSet = new Set();

  for (const item of data) {
    citiesSet.add(item.city);
  }

  const cities = Array.from(citiesSet);

  for (let i = 0; i < cities.length; i++) {
    if (i === cities.length - 1) {
      continue;
    }

    cities[i] += `&mdash;`;
  }

  return cities.join(` `);
};

// Функция выведения данных срока всей поездки
const getDaysTrip = (data) => {
  const time = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      time.push(data[i].eventStartTimeFull);
    } else if (i === data.length - 1) {
      time.push(data[i].eventEndTimeFull);
    }
  }

  if (dayjs(time[0]).format(`MMM`) === dayjs(time[1]).format(`MMM`)) {
    return `${dayjs(time[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(time[1]).format(`DD`)}`;
  }

  return `${dayjs(time[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(time[1]).format(`MMM DD`)}`;

};

const getTempRouteAndCost = (data) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getCityTrip(data)}</h1>

    <p class="trip-info__dates">${getDaysTrip(data)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPriceAmount(data)}</span>
  </p>
</section>`;
};

class TempRouteAndCost {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getTempRouteAndCost(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {TempRouteAndCost};
