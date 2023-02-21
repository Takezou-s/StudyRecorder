import { List } from "../Utility/List.js";
import { NotifyPropertyChanged } from "../Utility/NotifyPropertyChanged.js";

export default class Session extends NotifyPropertyChanged {
  #startDate;
  #endDate;
  #finished;
  #running;

  constructor(name, startDate, endDate, finished = false) {
    this.name = name;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#finished = finished;
    this.subSessions = new List();
    this.lessons = new List();

    this.subSessions.itemAddedEvent.subscribe(this._onPropertyChanged.bind(this, "subSessions"));
    this.subSessions.itemRemovedEvent.subscribe(this._onPropertyChanged.bind(this, "subSessions"));
    this.lessons.itemAddedEvent.subscribe(this._onPropertyChanged.bind(this, "lessons"));
    this.lessons.itemRemovedEvent.subscribe(this._onPropertyChanged.bind(this, "lessons"));
  }
  //#region Property get-set
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

  startSession() {
    if (this.#finished || this.#running) {
      return;
    }
    this.#startDate = new Date();
  }
}
