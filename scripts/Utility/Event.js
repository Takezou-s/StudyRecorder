// Bir olaya bağlı olarak fonksiyon çalıştırmaya yarayan yapı, event.
//
// Event dışarıdan tetiklenmemesi için bu class içerisinde değil, classlar içerisinde private olarak bulunacak
// EventHandler tipi objelerde tetiklenecek.
export class Event {
  #sender;
  #eventHandler;
  constructor(eventHandler, sender) {
    // Fonksiyonların tutulduğu liste.
    this.#eventHandler = eventHandler;
    // Eventi kim gönderiyor bilgisi.
    this.#sender = sender;
  }

  // Read-only sender.
  get sender() {
    return this.#sender;
  }

  // Eventi dinleyen fonksiyon eklenir.
  subscribe(callbackFn) {
    this.#eventHandler.subscribe(callbackFn);
  }

  // Eventi dinleyen fonksiyon kaldırılır.
  unsubscribe(callbackFn) {
    this.#eventHandler.unsubscribe(callbackFn);
  }
}
