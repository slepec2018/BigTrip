import {Abstract} from "./abstract.js";

const getTempCatalog = () => {
  return `<ul class="trip-days">
</ul>`;
};

class TempCatalog extends Abstract {

  getTemplate() {
    return getTempCatalog();
  }
}

export {TempCatalog};
