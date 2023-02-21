import SimpleList from "./SimpleList.js";

// Eventi tetiklemekle sorumlu class.
// Eventin kullanıldığı classlarda private olarak bulunması gerekir.
export class EventHandler {
  #functions;

  constructor() {
    // Fonksiyonların tutulduğu liste.
    this.#functions = new SimpleList();
  }

  // Eventi dinleyen fonksiyon eklenir.
  subscribe(callbackFn) {
    if (!callbackFn) return;
    this.#functions.addItem(callbackFn);
  }

  // Eventi dinleyen fonksiyon kaldırılır.
  unsubscribe(callbackFn) {
    if (!callbackFn) return;
    this.#functions.removeItem(callbackFn);
  }

  // Argümanlarla birlikte eventi tetikler.
  invoke(event, ...args) {
    for (const iterator of this.#functions.items) {
      if (!iterator) continue;
      iterator(event, ...args);
    }
  }
}
