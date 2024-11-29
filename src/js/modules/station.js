import { Column } from './column.js';
import { RenderStation } from './renderStation.js';

export class Station {
  #queue = [];
  #fillingColumns = [];
  #readyCars = [];

  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  get queue() {
    return this.#queue;
  }

  get fillingColumns() {
    return this.#fillingColumns;
  }

  init() {
    this.addColumnToFilling();
    this.renderStation = new RenderStation(this.renderApp, this);

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  addColumnToFilling() {
    this.typeStation.forEach(optionStation => {
      const count = optionStation.count || 1;
      for (let i = 0; i < count; i++) {
        this.#fillingColumns.push(
          new Column(optionStation.type, optionStation.speed),
        );
      }
    });
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#fillingColumns.length; j++) {
          if (
            !this.#fillingColumns[j].car &&
            this.#queue[i].typeFuel === this.#fillingColumns[j].type
          ) {
            this.#fillingColumns[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#fillingColumns[j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    const timerID = setInterval(() => {
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        clearInterval(timerID);
        const total = nowTank - needPetrol;
        car.fillUp();
        column.car = null;
        this.leaveClient({ car, total });
      }
    }, 1000);
  }

  leaveClient({ car }) {
    this.#readyCars.push(car);
    this.renderStation.renderStation();
  }

  addCarQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}
