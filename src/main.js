import {getTempRouteAndCost} from "./components/route_and_cost.js";
import {getTempFilters} from "./components/filters.js";
import {getTempMenu} from "./components/menu.js";
import {getTempSort} from "./components/sort.js";
import {getTempAddNewEventDestin} from "./components/ad_new_event_destin.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempDay} from "./components/day.js";
import {getTempCardEdit} from "./components/card_edit.js";
import {getTempCard} from "./components/card.js";

const header = document.querySelector(`.page-header`);
const headerMainTrip = header.querySelector(`.trip-main`);
const headerMainTripControl = headerMainTrip.querySelector(`.trip-main__trip-controls`);
const headerMainTripControlFCap = headerMainTrip.querySelector(`.trip-main__trip-controls h2`);
const main = document.querySelector(`.page-body__page-main`);
const mainTripEvents = main.querySelector(`.trip-events`);


const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

renderTemp(headerMainTrip, getTempRouteAndCost(), `afterbegin`);
renderTemp(headerMainTripControlFCap, getTempMenu(), `afterend`);
renderTemp(headerMainTripControl, getTempFilters(), `beforeend`);
renderTemp(mainTripEvents, getTempSort(), `beforeend`);
renderTemp(mainTripEvents, getTempAddNewEventDestin(), `beforeend`);
renderTemp(mainTripEvents, getTempCatalog(), `beforeend`);

const tripDays = mainTripEvents.querySelector(`.trip-days`);
renderTemp(tripDays, getTempDay(), `afterbegin`);

const tripEventsList = tripDays.querySelector(`.trip-events__list`);
renderTemp(tripEventsList, getTempCardEdit(), `afterbegin`);

for (let i = 0; i < 3; i++) {
  renderTemp(tripEventsList, getTempCard(), `beforeend`);
}
