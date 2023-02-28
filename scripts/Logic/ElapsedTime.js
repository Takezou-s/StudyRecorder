import { NotifyPropertyChanged } from "../Utility/NotifyPropertyChanged.js";
import { Util } from "../Utility/Util.js";

// Geçen zaman bilgisini idare eden class.
export class ElapsedTime extends NotifyPropertyChanged {
  constructor() {
    super();
    this.totalMilliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  // İki tarih arasındaki geçen zaman bilgisini hesaplar ve kendisini geri döndürür.
  calculate = (date1, date2) => {
    ElapsedTime.calculate(date1, date2, this);
    return this;
  };

  // Bu obje ile bir ElapsedTime tipindeki objeyi toplar ve bu objeyi geri döndürür.
  add = (elapsedTime) => {
    if (elapsedTime) {
      ElapsedTime.calculateFromTotalMilliseconds(elapsedTime.totalMilliseconds + this.totalMilliseconds, this);
    }
    return this;
  };

  // Objeyi resetler.
  reset = () => {
    ElapsedTime.calculateFromTotalMilliseconds(0, this);
    return this;
  };

  // Var olan ElapsedTime tipindeki objeyi kopyalayarak yeni bir obje oluşturur ve geri döndürür.
  static clone(elapsedTime) {
    let result = new ElapsedTime();
    ElapsedTime.cloneToExisting(elapsedTime, result);
    return result;
  }

  // Var olan objeye kopyalama işlemi yapar ve var olan objeyi geri döndürür.
  static cloneToExisting(elapsedTime, existing) {
    if (elapsedTime && existing) {
      for (const key in elapsedTime) {
        if (Object.hasOwnProperty.call(elapsedTime, key)) {
          existing[key] = elapsedTime[key];
        }
      }
    }
    return existing;
  }

  // İki tarih arasındaki geçen zaman bilgisini hesaplar ve ElapsedTime tipindeki objeye yazar.
  static calculate(date1, date2, elapsedTime) {
    const diff = Util.zeroWhenNullOrNaN(date2 - date1);
    ElapsedTime.calculateFromTotalMilliseconds(diff, elapsedTime);
  }

  // Toplam milisaniyeden geçen zaman bilgisini hesaplar ve ElapsedTime tipindeki objeye yazar.
  static calculateFromTotalMilliseconds(totalMilliseconds, elapsedTime) {
    const diff = totalMilliseconds;
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
