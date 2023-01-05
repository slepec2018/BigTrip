import {createElement} from "../utills.js";

const getTempDay = (date, day) => {
  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${day + 1}</span>
    <time class="day__date" datetime="2019-03-18">${date}</time>
  </div>

  <ul class="trip-events__list">
  </ul>
</li>`;
};

class TempDay {
  constructor(date, day) {
    this._element = null;
    this._date = date;
    this._day = day;
  }

  getTemplate() {
    return getTempDay(this._date, this._day);
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

export {TempDay};
