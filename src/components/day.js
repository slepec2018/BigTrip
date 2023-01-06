import {Abstract} from "./abstract.js";

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

class TempDay extends Abstract {
  constructor(date, day) {
    super();
    this._date = date;
    this._day = day;
  }

  getTemplate() {
    return getTempDay(this._date, this._day);
  }
}

export {TempDay};
