export class Column {
  #car = null;

  constructor(type, speed = 5) {
    this.type = type;
    this.speed = speed;
  }

  get car() {
    return this.#car;
  }

  set car(car) {
    this.#car = car;
  }
}
