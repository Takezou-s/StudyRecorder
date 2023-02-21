// İçerisinde elemanlar barındıran, basit ekle-çıkar mekanizmasına sahip liste.
export default class SimpleList {
  #items;

  constructor() {
    // Elemanlar bu dizide tutulur.
    this.#items = [];
  }

  // Elemanları barındıran yeni bir dizi geri döndürür.
  // Listeye ekleme işlemi dışarıdan yapılamaması için elemanlar yeni bir dizi halinde döndürülüyor.
  get items() {
    return [...this.#items];
  }

  // Eleman sayısını geri döndürür.
  get count() {
    return this.#items.length;
  }

  //Listeye yeni bir eleman ekler ve eklenen elemanı abone fonksiyonlara bildirir.
  addItem = (item) => {
    this.#items.push(item);
  };

  //Listeden bir elemanı kaldırır ve kaldırılan elemanı abone fonksiyonlara bildirir.
  removeItem = (item) => {
    if (!this.#items.includes(item)) return;
    this.#items.splice(this.#items.indexOf(item), 1);
  };
}
