import {createElement} from "../utills.js";

const getTempCatalog = () => {
  return `<ul class="trip-days">
</ul>`;
};

class TempCatalog {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTempCatalog();
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

export {TempCatalog};
