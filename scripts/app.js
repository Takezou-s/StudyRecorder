import Session from "./Logic/Session.js";
import { Binding } from "./Utility/Binding.js";

import { Util } from "./Utility/Util.js";

const sessionName = document.getElementById("sessionName");
const sessionElapsedHours = document.getElementById("sessionElapsedHours");
const sessionElapsedMinutes = document.getElementById("sessionElapsedMinutes");
const sessionElapsedSeconds = document.getElementById("sessionElapsedSeconds");
const lessonNameElement = document.getElementById("lessonName");
const lessonDateElement = document.getElementById("lessonDate");
const lessonTimeElement = document.getElementById("lessonTime");
const lessonElapsedHours = document.getElementById("lessonElapsedHours");
const lessonElapsedMinutes = document.getElementById("lessonElapsedMinutes");
const lessonElapsedSeconds = document.getElementById("lessonElapsedSeconds");
const sessionStart = document.getElementById("sessionStart");
const sessionPause = document.getElementById("sessionPause");
const sessionStop = document.getElementById("sessionStop");
const sessionNotes = document.getElementById("sessionNotes");

var session = new Session("Oturum - 1");

const bindings = [];
bindings.push(new Binding(session, "name", sessionName, "textContent"));
bindings.push(
  Binding.CreateWithId("SessionElapsed", session, "elapsedTime", undefined, undefined, false, () => {
    sessionElapsedHours.textContent = session.elapsedTime.hours;
    sessionElapsedMinutes.textContent = session.elapsedTime.minutes;
    sessionElapsedSeconds.textContent = session.elapsedTime.seconds;
  })
);
// bindings.push(Binding.CreateWithId("SessionElapsed", session.elapsedTime, "hours", sessionElapsedHours, "textContent"));
// bindings.push(Binding.CreateWithId("SessionElapsed", session.elapsedTime, "minutes", sessionElapsedMinutes, "textContent"));
// bindings.push(Binding.CreateWithId("SessionElapsed", session.elapsedTime, "seconds", sessionElapsedSeconds, "textContent"));
bindings.push(
  new Binding(session, "activeLesson", null, null, false, () => {
    bindLesson();
  })
);

const lessonBindings = [];
function bindLesson() {
  for (const binding of lessonBindings) {
    binding.clear();
  }
  lessonBindings.splice(0, lessonBindings.length);
  if (!session || !session.activeLesson) return;
  lessonBindings.push(new Binding(session.activeLesson, "name", lessonNameElement, "textContent"));
  lessonBindings.push(
    new Binding(session.activeLesson, "startDate", undefined, undefined, false, (args) => {
      setLessonDateAndTime(args.source.startDate, args.source.endDate, args.source.elapsedTime);
    })
  );
  lessonBindings.push(
    new Binding(session.activeLesson, "endDate", undefined, undefined, false, (args) => {
      setLessonDateAndTime(args.source.startDate, args.source.endDate, args.source.elapsedTime);
    })
  );
  lessonBindings.push(new Binding(session.activeLesson.elapsedTime, "hours", lessonElapsedHours, "textContent"));
  lessonBindings.push(new Binding(session.activeLesson.elapsedTime, "minutes", lessonElapsedMinutes, "textContent"));
  lessonBindings.push(new Binding(session.activeLesson.elapsedTime, "seconds", lessonElapsedSeconds, "textContent"));

  lessonBindings.forEach((b) => {
    b.initialMap();
  });
}
function setLessonDateAndTime(startDate, endDate, elapsedTime) {
  let start = Util.toDateString(startDate) || "?";
  let end = Util.toDateString(endDate) || "?";
  lessonDateElement.textContent = start + (start !== end ? " - " + end : "");

  start = Util.toTimeString(startDate) || "?";
  end = Util.toTimeString(endDate) || "?";
  lessonTimeElement.textContent = start + " - " + end;
}

bindings.forEach((b) => {
  b.initialMap();
});

sessionStart.addEventListener("click", () => {
  session.start();
});

sessionPause.addEventListener("click", () => {
  session.pause();
});

sessionStop.addEventListener("click", () => {
  session.stop();
});

let counter = 0;
sessionNotes.addEventListener("click", () => {
  counter++;
});
