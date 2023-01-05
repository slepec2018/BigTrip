import {TempRouteAndCost} from "./components/route_and_cost.js";
import {TempFilters} from "./components/filters.js";
import {TempMenu} from "./components/menu.js";
import {TempSort} from "./components/sort.js";
// import {TempAddNewEventDestin} from "./components/ad_new_event_destin.js";
import {TempCatalog} from "./components/catalog.js";
import {TempDay} from "./components/day.js";
import {TempCardEdit} from "./components/card_edit.js";
import {TempCard} from "./components/card.js";
import {TempNoPoints} from "./components/no-points.js";


import {generateCardData} from "./mock/card_mock.js";

import {render, RenderPosition} from "./utills.js";

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
render(headerMainTrip, new TempRouteAndCost(points).getElement(), RenderPosition.AFTERBEGIN);
// Рендеринг меню хедера
render(headerMainTripControl, new TempMenu().getElement(), RenderPosition.AFTERBEGIN);
// Рендеринг фильтров хедера
render(headerMainTripControl, new TempFilters().getElement(), RenderPosition.BEFOREEND);

// Переменные раздела фильр хедера
const tripFilters = headerMainTripControl.querySelector(`.trip-filters`);
const tripFiltersInput = tripFilters.querySelectorAll(`.trip-filters__filter-input`);
const tripFilterEverything = tripFilters.querySelector(`#filter-everything`);
const tripFilterFuture = tripFilters.querySelector(`#filter-future`);
const tripFilterPast = tripFilters.querySelector(`#filter-past`);

// Функция сбора данных о количестве дней в переданной базе
const sortDaysDataPoints = (data) => {
  const dayOfDateSet = new Set();

  for (const item of data) {
    dayOfDateSet.add(dayjs(item.eventStartTime).format(`DD MMM`));
  }

  return Array.from(dayOfDateSet);
};

const renderDay = (daysElement, data) => {
  const day = new TempCard(data);
  const dayEdit = new TempCardEdit(data);

  const replaceEditToDay = () => {
    daysElement.replaceChild(day.getElement(), dayEdit.getElement());
  };

  const replaceDayToEdit = () => {
    daysElement.replaceChild(dayEdit.getElement(), day.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToDay();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  day.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceDayToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  dayEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEditToDay();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(daysElement, day.getElement(), RenderPosition.BEFOREEND);
};

// Функция заполнения каталога днями и точками остановок
const fillCatalog = (data, container) => {


  const dayOfDate = sortDaysDataPoints(data);

  for (let i = 0; i < dayOfDate.length; i++) {
    render(container, new TempDay(dayOfDate[i], i).getElement(), RenderPosition.BEFOREEND);
  }

  const tripDays = container.querySelectorAll(`.trip-events__list`);

  console.log(tripDays);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < dayOfDate.length; j++) {
      if (dayOfDate[j] === dayjs(data[i].eventStartTimeFull).format(`DD MMM`)) {
        // render(tripDays[j], new TempCard(data[i]).getElement(), RenderPosition.BEFOREEND);
        renderDay(tripDays[j], data[i]);
      }
    }
  }
};

// Функция навешивания события фильтра сортировки каталога
const filterEventAd = (button, dataStan, condit, container) => {

  button.addEventListener(`change`, () => {
    for (const item of tripFiltersInput) {
      item.removeAttribute(`checked`);
    }

    button.setAttribute(`checked`, `checked`);

    container.innerHTML = ``;
    if (dataStan) {
      fillCatalog(points, container);
      return;
    }

    const deepData = JSON.parse(JSON.stringify(points));

    const strucData = deepData.filter((element) => {
      if (condit === `Before`) {
        return dayjs().isBefore(dayjs(element.eventStartTimeFull));
      }
      return dayjs().isAfter(dayjs(element.eventStartTimeFull));
    });

    fillCatalog(strucData, container);
  });
};

if (points.length > 0) {
  // Рендеринг сортировки каталога
  render(mainTripEvents, new TempSort().getElement(), RenderPosition.BEFOREEND);
  // Рендеринг каталога
  render(mainTripEvents, new TempCatalog().getElement(), RenderPosition.BEFOREEND);

  // Переменная блока каталога
  const tripCatalog = mainTripEvents.querySelector(`.trip-days`);

  fillCatalog(points, tripCatalog);

  // Добавления события сортировки по фильтрам
  filterEventAd(tripFilterEverything, true, `Before`, tripCatalog);
  filterEventAd(tripFilterFuture, false, `Before`, tripCatalog);
  filterEventAd(tripFilterPast, false, `After`, tripCatalog);
} else {
  render(mainTripEvents, new TempNoPoints().getElement(), RenderPosition.BEFOREEND);
}
