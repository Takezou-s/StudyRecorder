import { Binding } from "../Utility/Binding.js";
import { NotifyPropertyChanged } from "../Utility/NotifyPropertyChanged.js";

export class Lesson extends NotifyPropertyChanged {
  #name;
  #startDate;
  #endDate;
  #finished;
  #running;
  #intervalId;
  #intervalDelay = 300;

  constructor(name, startDate, endDate, finished = false) {
    super();
    this.#name = name;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#finished = finished;

    this.bindings = [];
    this.bindings.push(
      new Binding(this, "startDate", undefined, undefined, false, this._onPropertyChanged.bind(this, "elapsedTime"), undefined)
    );
    this.bindings.push(
      new Binding(this, "endDate", undefined, undefined, false, this._onPropertyChanged.bind(this, "elapsedTime"), undefined)
    );
  }

  //#region Property get-set
  get name() {
    return this.#name;
  }

  set name(value) {
    const changed = this._isChanged("name", value);
    this.#name = value;
    if (changed) {
      this._onPropertyChanged("name");
    }
  }

  get elapsedTime() {
    const diff = this.#endDate - this.#startDate;
    const totalSeconds = diff / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;

    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalMinutes % 60);
    const hours = Math.floor(totalHours);

    return {
      totalMilliseconds: diff,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
    };
  }

  get startDate() {
    return this.#startDate;
  }

  set _startDate(value) {
    const changed = this._isChanged("startDate", value);
    this.#startDate = value;
    if (changed) {
      this._onPropertyChanged("startDate");
    }
  }

  get endDate() {
    return this.#endDate;
  }

  set _endDate(value) {
    const changed = this._isChanged("endDate", value);
    this.#endDate = value;
    if (changed) {
      this._onPropertyChanged("endDate");
    }
  }

  get finished() {
    return this.#finished;
  }

  set _finished(value) {
    const changed = this._isChanged("finished", value);
    this.#finished = value;
    if (changed) {
      this._onPropertyChanged("finished");
    }
  }

  get running() {
    return this.#running;
  }

  set _running(value) {
    const changed = this._isChanged("running", value);
    this.#running = value;
    if (changed) {
      this._onPropertyChanged("running");
    }
  }
  //#endregion

  start = () => {
    if (this.#finished || this.#running) {
      return;
    }
    this._startDate = new Date();
    this._running = true;
    this.#intervalId = setInterval(this.intervalHandler, this.#intervalDelay);
  };

  stop = () => {
    if (this.#finished || !this.#running) {
      return;
    }
    clearInterval(this.#intervalId);
    this._running = false;
    this._endDate = new Date();
    this._finished = true;
  };

  intervalHandler = () => {
    this._endDate = new Date();
  };
}
