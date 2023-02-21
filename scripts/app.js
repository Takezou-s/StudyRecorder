import Session from "./Logic/Session.js";
import { NotifyPropertyChangedProxy } from "./Utility/NotifyPropertyChangedProxy.js";

let obj = { name: "Berat", age: 28 };
let objN = new NotifyPropertyChangedProxy(obj);

objN.propertyChangedEvent.subscribe((event, property) => {
  console.log(`${property} property changed! The new value: ${event.sender[property]}`);
});

objN.age = 38;
console.log(objN);

let session = new NotifyPropertyChangedProxy(new Session("Oturum 1"));
console.log(session);
session.propertyChangedEvent.subscribe((event, property) => {
  console.log(`${property} property changed! The new value: ${event.sender[property]}`);
});
session.name = "Berat";
session.startSession();
console.log(session);
