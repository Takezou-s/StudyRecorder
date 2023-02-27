// import { List } from "./List.js";

// export class CollapseHandler {
//   constructor(collapseClass, collapsingClass, showClass, horizontal) {
//     this._collapseClass = collapseClass;
//     this._collapsingClass = collapsingClass;
//     this._showClass = showClass;
//     this._dimension = horizontal ? "width" : "height";
//     this._otherDimension = !horizontal ? "width" : "height";
//     this._isTransitioning = false;
//   }

//   arrangeElements(element) {
//     let collapserElements = [];
//     if (element) {
//       if (element.matches("[data-collapser-id]")) {
//         collapserElements.push(element);
//       }
//       collapserElements.push(...element.querySelectorAll("[data-collapser-id]"));
//     } else {
//       collapserElements.push(...document.querySelectorAll("[data-collapser-id]"));
//     }
//     for (const collapser of collapserElements) {
//       collapser.addEventListener("click", (event) => {
//         if (event.target.dataset.collapserId) {
//           const hrefs = [];
//           hrefs.push(`[data-collapse-item-id='${event.target.dataset.collapserId}']`);
//           this.act(event.target.dataset.collapseCommand, hrefs);
//         }
//       });
//     }
//   }

//   act = (action, hrefs, ...elements) => {
//     if (action === "expand") {
//       this._expand(...this._getFinalList(hrefs, ...elements));
//     } else if (action === "collapse") {
//       this._collapse(...this._getFinalList(hrefs, ...elements));
//     } else if (action === "toggle") {
//       this._toggle(...this._getFinalList(hrefs, ...elements));
//     }
//   };

//   expand = (hrefs, ...elements) => {
//     this._expand(...this._getFinalList(hrefs, ...elements));
//   };

//   collapse = (hrefs, ...elements) => {
//     this._collapse(...this._getFinalList(hrefs, ...elements));
//   };

//   toggle = (hrefs, ...elements) => {
//     this._toggle(...this._getFinalList(hrefs, ...elements));
//   };

//   _getFinalList(hrefs, ...elements) {
//     let list = [];
//     if (hrefs) {
//       for (const href of hrefs) {
//         list.push(...document.querySelectorAll(href));
//       }
//       list.push(...elements);
//     } else {
//       list = [...elements];
//     }
//     return list;
//   }

//   _toggle = (...elements) => {
//     if (this._isTransitioning) {
//       return;
//     }
//     this._isTransitioning = true;
//     let timeOut = -1;
//     const collapsedElements = [];
//     const expandedElements = [];
//     for (const element of elements) {
//       if (this.isExpanded(element)) {
//         this._collapseElementHandler(element);
//         collapsedElements.push(element);
//       } else {
//         this._expandElementHandler(element);
//         expandedElements.push(element);
//       }
//       if (timeOut < 0) {
//         const computedStyle = window.getComputedStyle(element);
//         timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
//       }
//     }
//     setTimeout(() => {
//       for (const element of expandedElements) {
//         this._elementIsExpandedHandler(element);
//       }
//       for (const element of collapsedElements) {
//         this._elementIsCollapsedHandler(element);
//       }
//       this._isTransitioning = false;
//     }, timeOut + 10);
//   };

//   _expand = (...elements) => {
//     if (this._isTransitioning) {
//       return;
//     }
//     this._isTransitioning = true;
//     let timeOut = -1;
//     for (const element of elements) {
//       this._expandElementHandler(element);
//       if (timeOut < 0) {
//         const computedStyle = window.getComputedStyle(element);
//         timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
//       }
//     }
//     setTimeout(() => {
//       for (const element of elements) {
//         this._elementIsExpandedHandler(element);
//       }
//       this._isTransitioning = false;
//     }, timeOut + 10);
//   };

//   _collapse = (...elements) => {
//     if (this._isTransitioning) {
//       return;
//     }
//     this._isTransitioning = true;
//     let timeOut = -1;
//     for (const element of elements) {
//       this._collapseElementHandler(element);
//       if (timeOut < 0) {
//         const computedStyle = window.getComputedStyle(element);
//         timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
//       }
//     }
//     setTimeout(() => {
//       for (const element of elements) {
//         this._elementIsCollapsedHandler(element);
//       }
//       this._isTransitioning = false;
//     }, timeOut + 10);
//   };

//   isExpanded = (element) => {
//     if (!element) {
//       return;
//     }
//     return element.classList.contains(this._showClass);
//   };

//   isCollapsed = (element) => {
//     if (!element) {
//       return;
//     }
//     return element.classList.contains(this._collapseClass) && !element.classList.contains(this._showClass);
//   };

//   _expandElementHandler = (element) => {
//     if (this.isExpanded(element)) {
//       return;
//     }
//     // collapse classı kaldırılır.
//     element.classList.remove(this._collapseClass);
//     // Elementi tekrar akışa sokar, width-height özelliklerini doğru biçimde yönetmek için kullanılıyor.
//     element.offsetHeight;
//     // Diğer dimension'ı, scroll dimension olarak setler.
//     // element.style[this._otherDimension] = element[this._getScrollDimension(this._otherDimension)] + "px";
//     element.style[this._otherDimension] = element.getBoundingClientRect()[this._otherDimension] + "px";
//     // İleride setlenmek üzere scroll dimension değeri oluşturulur.
//     // const scrollDimension = element[this._getScrollDimension(this._dimension)] + "px";
//     const scrollDimension = element.getBoundingClientRect()[this._dimension] + "px";
//     // Dimension 0'a eşitlenir.
//     element.style[this._dimension] = 0;
//     // Tekrar akış.
//     element.offsetHeight;
//     // collapsing class eklenir, animasyon için.
//     element.classList.add(this._collapsingClass);
//     // Dimension değeri setlenir.
//     element.style[this._dimension] = scrollDimension;
//     // Tekrar akış.
//     element.offsetHeight;
//   };

//   _elementIsExpandedHandler = (element) => {
//     element.style[this._otherDimension] = null;
//     element.style[this._dimension] = null;
//     element.classList.add(this._collapseClass);
//     element.classList.remove(this._collapsingClass);
//     element.classList.add(this._showClass);
//   };

//   _collapseElementHandler = (element) => {
//     if (this.isCollapsed(element)) {
//       return;
//     }
//     // Tekrar akış.
//     element.offsetHeight;
//     // Diğer dimension'ı, scroll dimension olarak setler.
//     element.style[this._otherDimension] = element.getBoundingClientRect()[this._otherDimension] + "px";
//     // Dimension'ı, scroll dimension olarak setler.
//     element.style[this._dimension] = element.getBoundingClientRect()[this._dimension] + "px";
//     // Tekrar akış.
//     element.offsetHeight;
//     element.classList.remove(this._collapseClass, this._showClass);
//     element.classList.add(this._collapsingClass);
//     element.style[this._dimension] = 0;
//     if (element.dataset.collapseItemId) {
//       const href = `[data-collapse-parent-id='${element.dataset.collapseItemId}']`;
//       const elements = document.querySelectorAll(href);
//       for (const subElement of elements) {
//         this._collapseElementHandler(subElement);
//       }
//     }
//   };

//   _elementIsCollapsedHandler = (element) => {
//     element.style[this._otherDimension] = null;
//     element.style[this._dimension] = null;
//     element.classList.remove(this._collapsingClass);
//     element.classList.add(this._collapseClass);
//     if (element.dataset.collapseItemId) {
//       const href = `[data-collapse-parent-id='${element.dataset.collapseItemId}']`;
//       const elements = document.querySelectorAll(href);
//       for (const subElement of elements) {
//         this._elementIsCollapsedHandler(subElement);
//       }
//     }
//   };

//   _getScrollDimension(dimension) {
//     return "offset" + dimension[0].toUpperCase() + dimension.slice(1);
//   }

//   _getIntendedValue(dimension) {}
// }
