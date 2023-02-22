export class Util {
  static toDateString(date) {
    if (!date) return null;
    return this.digitWithZero(date.getDate()) + "." + this.digitWithZero(+date.getMonth() + 1) + "." + date.getFullYear();
  }

  static toTimeString(date) {
    if (!date) return null;
    return (
      this.digitWithZero(date.getHours()) + ":" + this.digitWithZero(date.getMinutes()) + ":" + this.digitWithZero(date.getSeconds())
    );
  }

  static digitWithZero(digit) {
    if (isNaN(digit)) return;
    return digit < 10 ? "0" + digit : digit;
  }
}
