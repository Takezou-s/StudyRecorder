import { Binding } from "../Utility/Binding.js";
import { NotifyPropertyChanged } from "../Utility/NotifyPropertyChanged.js";
import { ElapsedTime } from "./ElapsedTime.js";

// Başlangıcı ve bitişi olan, geçen zamanı belirten, başlatılıp-bitirilebilen, isim atanabilen objeler türetmemize yarayan class.
// Session ve Lesson classları bu classtan kalıtım alırlar.
export class Lapse extends NotifyPropertyChanged {
  #name;
  #startDate;
  #endDate;
  #finished;
  #running;
  #elapsedTime;

  constructor(name, startDate, endDate, finished = false) {
    super();
    this.#name = name;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#finished = finished;
    this.#elapsedTime = new ElapsedTime();

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
    return this.#elapsedTime.calculate(this.#startDate, this.#endDate);
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

  // Lapse'i başlatır.
  start = () => {
    if (this.#finished || this.#running) {
      return;
    }
    this._running = true;
    this._startImp();
  };

  // Start methodunun implementor methodu, kalıtım alan classlar bu methodu doldururlar.
  _startImp = () => {};

  // Lapse'i, durdurur.
  stop = () => {
    if (this.#finished || !this.#running) {
      return;
    }
    this._running = false;
    this._stopImp();
  };

  // Stop methodunun implementor methodu, kalıtım alan classlar bu methodu doldururlar.
  _stopImp = () => {};
}
