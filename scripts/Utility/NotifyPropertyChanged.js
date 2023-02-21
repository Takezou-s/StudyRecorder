import { Event } from "./Event.js";
import { EventHandler } from "./EventHandler.js";

// Propertylerdeki değer değişimleri için oluşturulan base class.
export class NotifyPropertyChanged {
  #propertyChangedEventHandler;

  constructor() {
    this.#propertyChangedEventHandler = new EventHandler();
    this.propertyChangedEvent = new Event(this.#propertyChangedEventHandler, this);
  }

  _setProperty(property, value) {
    let changed = this._isChanged(property, value);
    this[property] = value;
    if (changed) {
      this._onPropertyChanged(property);
    }
  }

  _onPropertyChanged(property) {
    this.#propertyChangedEventHandler.invoke(this.propertyChangedEvent, property);
  }

  _isChanged(property, value) {
    return this[property] !== value;
  }
}
