import { Lapse } from "./Lapse.js";

// Ders bilgisini tutmak için kullanılan classi Lapse classından kalıtım alır.
export class Lesson extends Lapse {
  #intervalDelay = 300;
  #intervalId;

  constructor(name, startDate, endDate, finished = false) {
    super(name, startDate, endDate, finished);
  }

  _startImp = () => {
    this._startDate = new Date();
    this.#intervalId = setInterval(this.intervalHandler, this.#intervalDelay);
  };

  _stopImp = () => {
    clearInterval(this.#intervalId);
    this._running = false;
    this._endDate = new Date();
    this._finished = true;
  };

  intervalHandler = () => {
    this._endDate = new Date();
  };
}
