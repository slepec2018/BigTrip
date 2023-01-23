import {TempSort} from "../components/sort.js";
import {TempCatalog} from "../components/catalog.js";
import {TempNoPoints} from "../components/no-points.js";
import {TempDay} from "../components/day.js";
import {TempFilters, SortType} from "../components/filters.js";

import {Point} from "./point.js";

import {remove, render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortPointsFurure, sortPointsPast} from "../utils/task.js";

import dayjs from "dayjs";

export class Board {
  constructor(boardContainer, sortHeaderContainer) {
    this._boardContainer = boardContainer;
    this._sortHeaderContainer = sortHeaderContainer;
    this._pointPresenter = {};
    this._dayPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._headerSort = new TempFilters();
    this._boardComponent = new TempCatalog();
    this._sortComponent = new TempSort();
    this._dayListComponent = new TempDay();
    this._noPointComponent = new TempNoPoints();

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardPoints) {
    this._boardPoints = boardPoints.slice();
    this._daysOfDate = this._sortDaysDataPoints(this._boardPoints);

    this._sourcedBoardPoints = boardPoints.slice();

    this._renderSort();

    if (this._boardPoints.length <= 0) {
      this._renderNoPoint();
      return;
    }

    this._renderHeaderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleTaskChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._daysOfDate = this._sortDaysDataPoints(this._boardPoints);

    this._clearTaskList();
    this._renderBoard();
  }

  _renderHeaderSort() {
    render(this._sortHeaderContainer, this._headerSort, RenderPosition.BEFOREEND);
    this._headerSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _sortTasks(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.FUTURE:
        this._boardPoints = sortPointsFurure(this._sourcedBoardPoints);
        this._daysOfDate = this._sortDaysDataPoints(this._boardPoints);
        break;
      case SortType.PAST:
        this._boardPoints = sortPointsPast(this._sourcedBoardPoints);
        this._daysOfDate = this._sortDaysDataPoints(this._boardPoints);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._boardPoints = this._sourcedBoardPoints.slice();
        this._daysOfDate = this._sortDaysDataPoints(this._boardPoints);
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearTaskList();
    this._renderBoard();
  }

  _sortDaysDataPoints(data) {
    const dayOfDateSet = new Set();

    for (const item of data) {
      dayOfDateSet.add(dayjs(item.eventStartTimeFull).format(`DD MMM`));
    }

    return Array.from(dayOfDateSet);
  }

  _renderDay(day) {
    render(this._boardComponent, day, RenderPosition.BEFOREEND);
  }

  _renderPoint(container, point) {
    const pointPresenter = new Point(container, this._handleTaskChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(dayOfDate, container) {
    for (let i = 0; i < this._boardPoints.length; i++) {
      if (dayOfDate === dayjs(this._boardPoints[i].eventStartTimeFull).format(`DD MMM`)) {
        this._renderPoint(container, this._boardPoints[i]);
      }
    }
  }

  _renderNoPoint() {
    render(this._boardContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTaskList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());

    Object
      .values(this._dayPresenter)
      .forEach((presenter) => remove(presenter));

    this._pointPresenter = {};
    this._dayPresenter = {};
  }

  _renderBoard() {
    for (let i = 0; i < this._daysOfDate.length; i++) {
      this._dayListComponent = new TempDay(this._daysOfDate[i], i);

      this._dayPresenter[this._daysOfDate[i]] = this._dayListComponent;

      const dayContainer = this._dayListComponent.getElement().querySelector(`.trip-events__list`);

      this._renderPoints(this._daysOfDate[i], dayContainer);

      this._renderDay(this._dayListComponent);

    }
  }

}
