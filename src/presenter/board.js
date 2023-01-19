import {TempSort} from "../components/sort.js";
import {TempCatalog} from "../components/catalog.js";
import {TempNoPoints} from "../components/no-points.js";
import {TempDay} from "../components/day.js";

import {Point} from "./point.js";

import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

import dayjs from "dayjs";

export class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._pointPresenter = {};

    this._boardComponent = new TempCatalog();
    this._sortComponent = new TempSort();
    this._dayListComponent = new TempDay();
    this._noPointComponent = new TempNoPoints();

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardPoints, daysOfDate) {
    this._boardPoints = boardPoints.slice();
    this._daysOfDate = daysOfDate.slice();

    if (this._boardPoints.length <= 0) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();

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
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
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
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
  }

  _renderBoard() {
    for (let i = 0; i < this._daysOfDate.length; i++) {
      this._dayListComponent = new TempDay(this._daysOfDate[i], i);

      const dayContainer = this._dayListComponent.getElement().querySelector(`.trip-events__list`);

      this._renderPoints(this._daysOfDate[i], dayContainer);

      this._renderDay(this._dayListComponent);

      // this._pointPresenter[i] = this._dayListComponent;
    }
  }

}
