import {createElement} from "../utills.js";

const getTempNoPoints = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class TempNoPoints {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTempNoPoints();
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

export {TempNoPoints};
