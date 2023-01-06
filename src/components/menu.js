import {Abstract} from "./abstract.js";

const getTempMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

class TempMenu extends Abstract {

  getTemplate() {
    return getTempMenu();
  }
}

export {TempMenu};
