import {Abstract} from "./abstract.js";

const getTempNoPoints = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class TempNoPoints extends Abstract {

  getTemplate() {
    return getTempNoPoints();
  }
}

export {TempNoPoints};
