import {TempRouteAndCost} from "./components/route_and_cost.js";
import {TempMenu} from "./components/menu.js";

import {Board} from "./presenter/board.js";

// import {TempAddNewEventDestin} from "./components/ad_new_event_destin.js";

import {generateCardData} from "./mock/card_mock.js";

import {render, RenderPosition} from "./utils/render.js";

import dayjs from "dayjs";

// переменные основных блоков верстки
const header = document.querySelector(`.page-header`);
const headerMainTrip = header.querySelector(`.trip-main`);
const headerMainTripControl = headerMainTrip.querySelector(`.trip-main__trip-controls`);
// const headerMainTripControlFCap = headerMainTrip.querySelector(`.trip-main__trip-controls h2`);
const main = document.querySelector(`.page-body__page-main`);
const mainTripEvents = main.querySelector(`.trip-events`);

// Переменная количество точек в каталоге
const POINT_COUNT = 4;

// Функция конвертирования данных дат в unix формат
const convertPointsDataUnix = (data) => {
  for (const item of data) {
    item.eventStartTimeUnix = dayjs(item.eventStartTime).valueOf();
  }

  return data;
};

// Массив сгенерированных и отсортированных точек
const points = convertPointsDataUnix(new Array(POINT_COUNT).fill().map(generateCardData)).sort(function (a, b) {
  return a.eventStartTimeUnix - b.eventStartTimeUnix;
});

// Рендеринг верхнего раздела хедера
render(headerMainTrip, new TempRouteAndCost(points), RenderPosition.AFTERBEGIN);
// Рендеринг меню хедера
render(headerMainTripControl, new TempMenu(), RenderPosition.AFTERBEGIN);

// Переменные раздела фильр хедера
// const tripFilters = headerMainTripControl.querySelector(`.trip-filters`);
// const tripFiltersInput = tripFilters.querySelectorAll(`.trip-filters__filter-input`);
// const tripFilterEverything = tripFilters.querySelector(`#filter-everything`);
// const tripFilterFuture = tripFilters.querySelector(`#filter-future`);
// const tripFilterPast = tripFilters.querySelector(`#filter-past`);

// // Функция навешивания события фильтра сортировки каталога
// const filterEventAd = (button, dataStan, condit, container) => {

//   button.addEventListener(`change`, () => {
//     for (const item of tripFiltersInput) {
//       item.removeAttribute(`checked`);
//     }

//     button.setAttribute(`checked`, `checked`);

//     container.innerHTML = ``;
//     if (dataStan) {
//       fillCatalog(points, container);
//       return;
//     }

//     const deepData = JSON.parse(JSON.stringify(points));

//     const strucData = deepData.filter((element) => {
//       if (condit === `Before`) {
//         return dayjs().isBefore(dayjs(element.eventStartTimeFull));
//       }
//       return dayjs().isAfter(dayjs(element.eventStartTimeFull));
//     });

//     fillCatalog(strucData, container);
//   });
// };

const boardPresenter = new Board(mainTripEvents, headerMainTripControl);

boardPresenter.init(points);

