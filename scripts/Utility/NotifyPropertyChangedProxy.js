import { Event } from "./Event.js";
import { EventHandler } from "./EventHandler.js";

// Objeyi property değeri değiştiğini bildirecek biçime dönüştürür.
// Fakat private propertyleri değiştiren bir fonksiyon çağırılırsa hata verir.
// İleride kullanabilirim diye bu yapıyı silmiyorum.
export class NotifyPropertyChangedProxy {
  constructor(obj, eventHandler) {
    obj.propertyChangedEventHandler = new EventHandler();
    obj.propertyChangedEvent = new Event(obj.propertyChangedEventHandler, obj);
    const handler = {
      //   _obj: eventHandler,
      //   _func: eventHandler.invoke,
      get(target, property) {
        return target[property];
      },
      set(target, property, value) {
        let changed = false;
        let oldValue = target[property];
        if (oldValue !== value) {
          changed = true;
        }

        target[property] = value;

        if (changed) {
          obj.propertyChangedEventHandler.invoke(obj.propertyChangedEvent, property);
        }
        return true;
      },
    };
    return new Proxy(obj, handler);
  }
}
