import {getTempRouteAndCost} from "./components/route_and_cost.js";
import {getTempFilters} from "./components/filters.js";
import {getTempMenu} from "./components/menu.js";
import {getTempSort} from "./components/sort.js";
// import {getTempAddNewEventDestin} from "./components/ad_new_event_destin.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempDay} from "./components/day.js";
import {getTempCardEdit} from "./components/card_edit.js";
import {getTempCard} from "./components/card.js";

import {generateCardData} from "./mock/card_mock.js";

import dayjs from "dayjs";

// переменные основных блоков верстки
const header = document.querySelector(`.page-header`);
const headerMainTrip = header.querySelector(`.trip-main`);
const headerMainTripControl = headerMainTrip.querySelector(`.trip-main__trip-controls`);
const headerMainTripControlFCap = headerMainTrip.querySelector(`.trip-main__trip-controls h2`);
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

// Функция добавления кода html в исходный код
const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

// Рендеринг верхнего раздела хедера
renderTemp(headerMainTrip, getTempRouteAndCost(points), `afterbegin`);
// Рендеринг меню хедера
renderTemp(headerMainTripControlFCap, getTempMenu(), `afterend`);
// Рендеринг фильтров хедера
renderTemp(headerMainTripControl, getTempFilters(), `beforeend`);

// Переменные раздела фильр хедера
const tripFilters = headerMainTripControl.querySelector(`.trip-filters`);
const tripFiltersInput = tripFilters.querySelectorAll(`.trip-filters__filter-input`);
const tripFilterEverything = tripFilters.querySelector(`#filter-everything`);
const tripFilterFuture = tripFilters.querySelector(`#filter-future`);
const tripFilterPast = tripFilters.querySelector(`#filter-past`);

// Рендеринг сортировки каталога
renderTemp(mainTripEvents, getTempSort(), `beforeend`);
// renderTemp(mainTripEvents, getTempAddNewEventDestin(), `beforeend`);
// Рендеринг каталога
renderTemp(mainTripEvents, getTempCatalog(), `beforeend`);

// Функция сбора данных о количестве дней в переданной базе
const sortDaysDataPoints = (data) => {
  const dayOfDateSet = new Set();

  for (const item of data) {
    dayOfDateSet.add(dayjs(item.eventStartTime).format(`DD MMM`));
  }

  return Array.from(dayOfDateSet);
};

// Переменная блока каталога
const tripCatalog = mainTripEvents.querySelector(`.trip-days`);

// Функция заполнения каталога днями и точками отсановок
const fillCatalog = (data) => {
  const dayOfDate = sortDaysDataPoints(data);

  for (let i = 0; i < dayOfDate.length; i++) {
    renderTemp(tripCatalog, getTempDay(dayOfDate[i], i), `beforeend`);
  }

  const tripDays = tripCatalog.querySelectorAll(`.trip-events__list`);

  renderTemp(tripDays[0], getTempCardEdit(data[0]), `afterbegin`);

  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < dayOfDate.length; j++) {
      if (dayOfDate[j] === dayjs(data[i].eventStartTimeFull).format(`DD MMM`)) {
        renderTemp(tripDays[j], getTempCard(data[i]), `beforeend`);
      }
    }
  }
};

fillCatalog(points);

// Функция навешивания события фильтра сортировки каталога
const filterEventAd = (button, dataStan, condit) => {

  button.addEventListener(`change`, () => {
    for (const item of tripFiltersInput) {
      item.removeAttribute(`checked`);
    }

    button.setAttribute(`checked`, `checked`);

    tripCatalog.innerHTML = ``;
    if (dataStan) {
      fillCatalog(points);
      return;
    }

    const deepData = JSON.parse(JSON.stringify(points));

    const strucData = deepData.filter((element) => {
      if (condit === `Before`) {
        return dayjs().isBefore(dayjs(element.eventStartTimeFull));
      }
      return dayjs().isAfter(dayjs(element.eventStartTimeFull));
    });

    fillCatalog(strucData);
  });
};

// Добавления события сортировки по фильтрам
filterEventAd(tripFilterEverything, true, `Before`);
filterEventAd(tripFilterFuture, false, `Before`);
filterEventAd(tripFilterPast, false, `After`);
