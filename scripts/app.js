import { Lesson } from "./Logic/Lesson.js";
import Session from "./Logic/Session.js";
import { Binding } from "./Utility/Binding.js";
import { NotifyPropertyChangedProxy } from "./Utility/NotifyPropertyChangedProxy.js";
import { Util } from "./Utility/Util.js";

// let obj = { name: "Berat", age: 28 };
// let objN = new NotifyPropertyChangedProxy(obj);

// objN.propertyChangedEvent.subscribe((event, property) => {
//   console.log(`${property} property changed! The new value: ${event.sender[property]}`);
// });

// objN.age = 38;
// console.log(objN);

// let session = new NotifyPropertyChangedProxy(new Session("Oturum 1"));
// console.log(session);
// session.propertyChangedEvent.subscribe((event, property) => {
//   console.log(`${property} property changed! The new value: ${event.sender[property]}`);
// });
// session.name = "Berat";
// session.startSession();
// console.log(session);

let lesson = new Lesson("Ders 1");
const lessonNameElement = document.getElementById("lessonName");
const lessonDateElement = document.getElementById("lessonDate");
const lessonTimeElement = document.getElementById("lessonTime");
const lessonElapsedElement = lessonTimeElement.querySelector("strong");
console.log(lessonNameElement, lessonDateElement, lessonTimeElement, lessonElapsedElement);

const bindings = [];
bindings.push(new Binding(lesson, "name", lessonNameElement, "textContent"));

function setLessonDateAndTime(startDate, endDate, elapsedTime) {
  let start = Util.toDateString(startDate) || "?";
  let end = Util.toDateString(endDate) || "?";
  lessonDateElement.textContent = start + (start !== end ? " - " + end : "");

  start = Util.toTimeString(startDate) || "?";
  end = Util.toTimeString(endDate) || "?";
  lessonTimeElement.textContent = start + " - " + end;

  if (elapsedTime) {
    lessonElapsedElement.textContent =
      ", " +
      (elapsedTime.hours > 0 ? elapsedTime.hours + " s " : "") +
      (elapsedTime.minutes > 0 ? elapsedTime.minutes + " dk " : "") +
      (elapsedTime.seconds > 0 ? elapsedTime.seconds + " sn " : "");
    lessonTimeElement.append(lessonElapsedElement);
  }
}

bindings.push(
  new Binding(lesson, "startDate", undefined, undefined, false, (args) => {
    setLessonDateAndTime(args.source.startDate, args.source.endDate, args.source.elapsedTime);
  })
);
bindings.push(
  new Binding(lesson, "endDate", undefined, undefined, false, (args) => {
    setLessonDateAndTime(args.source.startDate, args.source.endDate, args.source.elapsedTime);
  })
);
lesson.name = "Binding Deneme";
lesson.start();

setTimeout(() => {
  lesson.stop();
}, 300000);
