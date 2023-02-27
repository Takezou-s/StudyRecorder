import { Binding } from "../Utility/Binding.js";
import { List } from "../Utility/List.js";
import { Lapse } from "./Lapse.js";
import { Lesson } from "./Lesson.js";

export default class Session extends Lapse {
  #lessons;
  #started;
  #activeLesson;
  #activeLessonBinding;

  constructor(name, startDate, endDate, finished = false) {
    super(name, startDate, endDate, finished);
    this.#lessons = new List();

    this.#lessons.itemAddedEvent.subscribe(this._onPropertyChanged.bind(this, "lessons"));
    this.#lessons.itemRemovedEvent.subscribe(this._onPropertyChanged.bind(this, "lessons"));
  }

  get lessons() {
    return [...this.#lessons.items];
  }

  get activeLesson() {
    return this.#activeLesson;
  }

  set _activeLesson(value) {
    const changed = this._isChanged("activeLesson", value);
    this.#activeLesson = value;
    if (changed) {
      this._onPropertyChanged("activeLesson");
    }
  }

  _startImp = () => {
    this._activeLesson = new Lesson(`Ders - ${this.#lessons.count + 1}`);
    if (this.#activeLessonBinding) {
      this.#activeLessonBinding.clear();
    }
    this.#activeLessonBinding = new Binding(this.activeLesson, "endDate", this, "_endDate");
    this.#lessons.addItem(this.activeLesson);
    this.activeLesson.start();
    if (!this.#started) {
      this._startDate = this.activeLesson.startDate;
      this.#started = true;
    }
  };

  pause = () => {
    if (!this.running || this.finished) return;
    this.activeLesson.stop();
    this._running = false;
  };

  _stopImp = () => {
    if (this.activeLesson) this.activeLesson.stop();
    this._running = false;
    this._finished = true;
  };
}
