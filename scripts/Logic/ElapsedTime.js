import { NotifyPropertyChanged } from "../Utility/NotifyPropertyChanged.js";
import { Util } from "../Utility/Util.js";

export class ElapsedTime extends NotifyPropertyChanged {
  constructor() {
    super();
    this.totalMilliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  calculate = (date1, date2) => {
    ElapsedTime.calculate(date1, date2, this);
    return this;
  };

  static calculate(date1, date2, elapsedTime) {
    const diff = Util.zeroWhenNullOrNaN(date2 - date1);
    const totalSeconds = diff / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;

    const seconds = Util.zeroWhenNullOrNaN(Math.floor(totalSeconds % 60));
    const minutes = Util.zeroWhenNullOrNaN(Math.floor(totalMinutes % 60));
    const hours = Util.zeroWhenNullOrNaN(Math.floor(totalHours));

    elapsedTime._setProperty("totalMilliseconds", diff);
    elapsedTime._setProperty("seconds", seconds);
    elapsedTime._setProperty("minutes", minutes);
    elapsedTime._setProperty("hours", hours);
  }
}
