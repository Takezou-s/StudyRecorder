import { Event } from "./Event.js";
import { EventHandler } from "./EventHandler.js";
import SimpleList from "./SimpleList.js";

// Eklendi çıkarıldı eventlerinin bulunduğu liste.
export class List {
  #simpleList;
  #itemAddedEventHandler;
  #itemRemovedEventHandler;
  #itemAddedEvent;
  #itemRemovedEvent;

  constructor() {
    this.#simpleList = new SimpleList();
    this.#itemAddedEventHandler = new EventHandler();
    this.#itemRemovedEventHandler = new EventHandler();
    this.#itemAddedEvent = new Event(this.#itemAddedEventHandler, this);
    this.#itemRemovedEvent = new Event(this.#itemRemovedEventHandler, this);
  }

  get itemAddedEvent() {
    return this.#itemAddedEvent;
  }

  get itemRemovedEvent() {
    return this.#itemRemovedEvent;
  }

  get items() {
    return this.#simpleList.items;
  }

  // Eleman sayısını geri döndürür.
  get count() {
    return this.#simpleList.count;
  }

  //Listeye yeni bir eleman ekler ve eklenen elemanı abone fonksiyonlara bildirir.
  addItem = (item) => {
    this.#simpleList.addItem(item);
    this.#itemAddedEventHandler.invoke(this.#itemAddedEvent, item);
  };

  //Listeden bir elemanı kaldırır ve kaldırılan elemanı abone fonksiyonlara bildirir.
  removeItem = (item) => {
    if (!this.items.includes(item)) return;
    this.#simpleList.removeItem(item);
    this.#itemRemovedEventHandler.invoke(this.#itemRemovedEvent, item);
  };
}
