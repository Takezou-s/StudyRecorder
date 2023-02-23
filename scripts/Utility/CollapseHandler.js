import { List } from "./List.js";

export class CollapseHandler {
  constructor(collapseClass, collapsingClass, showClass, dimension) {
    this._collapseClass = collapseClass;
    this._collapsingClass = collapsingClass;
    this._showClass = showClass;
    this._dimension = dimension;
    this._isTransitioning = false;
  }

  arrangeElements() {
    const collapserElements = [...document.querySelectorAll("[data-collapser-id]")];
    for (const collapser of collapserElements) {
      collapser.addEventListener("click", (event) => {
        if (event.target.dataset.collapserId) {
          const hrefs = [];
          hrefs.push(`[data-collapse-item-id='${event.target.dataset.collapserId}']`);
          this.act(event.target.dataset.collapseCommand, hrefs);
        }
      });
    }
  }

  act = (action, hrefs, ...elements) => {
    if (action === "expand") {
      this._expand(...this._getFinalList(hrefs, ...elements));
    } else if (action === "collapse") {
      this._collapse(...this._getFinalList(hrefs, ...elements));
    } else if (action === "toggle") {
      this._toggle(...this._getFinalList(hrefs, ...elements));
    }
  };

  expand = (hrefs, ...elements) => {
    this._expand(...this._getFinalList(hrefs, ...elements));
  };

  collapse = (hrefs, ...elements) => {
    this._collapse(...this._getFinalList(hrefs, ...elements));
  };

  toggle = (hrefs, ...elements) => {
    this._toggle(...this._getFinalList(hrefs, ...elements));
  };

  _getFinalList(hrefs, ...elements) {
    let list = [];
    if (hrefs) {
      for (const href of hrefs) {
        list.push(...document.querySelectorAll(href));
      }
      list.push(...elements);
    } else {
      list = [...elements];
    }
    return list;
  }

  _toggle = (...elements) => {
    if (this._isTransitioning) {
      return;
    }
    this._isTransitioning = true;
    let timeOut = -1;
    const collapsedElements = [];
    const expandedElements = [];
    for (const element of elements) {
      if (this.isExpanded(element)) {
        this._collapseElementHandler(element);
        collapsedElements.push(element);
      } else {
        this._expandElementHandler(element);
        expandedElements.push(element);
      }
      if (timeOut < 0) {
        const computedStyle = window.getComputedStyle(element);
        timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
      }
    }
    setTimeout(() => {
      for (const element of expandedElements) {
        this._elementIsExpandedHandler(element);
      }
      for (const element of collapsedElements) {
        this._elementIsCollapsedHandler(element);
      }
      this._isTransitioning = false;
    }, timeOut + 10);
  };

  _expand = (...elements) => {
    if (this._isTransitioning) {
      return;
    }
    this._isTransitioning = true;
    let timeOut = -1;
    for (const element of elements) {
      this._expandElementHandler(element);
      if (timeOut < 0) {
        const computedStyle = window.getComputedStyle(element);
        timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
      }
    }
    setTimeout(() => {
      for (const element of elements) {
        this._elementIsExpandedHandler(element);
      }
      this._isTransitioning = false;
    }, timeOut + 10);
  };

  _collapse = (...elements) => {
    if (this._isTransitioning) {
      return;
    }
    this._isTransitioning = true;
    let timeOut = -1;
    for (const element of elements) {
      this._collapseElementHandler(element);
      if (timeOut < 0) {
        const computedStyle = window.getComputedStyle(element);
        timeOut = (+computedStyle.transitionDelay.replace("s", "") + +computedStyle.transitionDuration.replace("s", "")) * 1000;
      }
    }
    setTimeout(() => {
      for (const element of elements) {
        this._elementIsCollapsedHandler(element);
      }
      this._isTransitioning = false;
    }, timeOut + 10);
  };

  isExpanded = (element) => {
    if (!element) {
      return;
    }
    return element.classList.contains(this._showClass);
  };

  isCollapsed = (element) => {
    if (!element) {
      return;
    }
    return element.classList.contains(this._collapseClass) && !element.classList.contains(this._showClass);
  };

  _expandElementHandler = (element) => {
    if (this.isExpanded(element)) {
      return;
    }
    element.style[this._dimension] = 0;
    element.classList.remove(this._collapseClass);
    element.classList.add(this._collapsingClass);
    element.style[this._dimension] = element["scroll" + this._dimension[0].toUpperCase() + this._dimension.slice(1)] + "px";
  };

  _elementIsExpandedHandler = (element) => {
    element.style[this._dimension] = null;
    element.classList.add(this._collapseClass);
    element.classList.remove(this._collapsingClass);
    element.classList.add(this._showClass);
  };

  _collapseElementHandler = (element) => {
    if (this.isCollapsed(element)) {
      return;
    }
    element.style[this._dimension] = element["scroll" + this._dimension[0].toUpperCase() + this._dimension.slice(1)] + "px";
    element.offsetHeight;
    element.classList.remove(this._collapseClass, this._showClass);
    element.classList.add(this._collapsingClass);
    element.style[this._dimension] = 0;
    if (element.dataset.collapseItemId) {
      const href = `[data-collapse-parent-id='${element.dataset.collapseItemId}']`;
      const elements = document.querySelectorAll(href);
      for (const subElement of elements) {
        this._collapseElementHandler(subElement);
      }
    }
  };

  _elementIsCollapsedHandler = (element) => {
    element.style[this._dimension] = null;
    element.classList.remove(this._collapsingClass);
    element.classList.add(this._collapseClass);
    if (element.dataset.collapseItemId) {
      const href = `[data-collapse-parent-id='${element.dataset.collapseItemId}']`;
      const elements = document.querySelectorAll(href);
      for (const subElement of elements) {
        this._elementIsCollapsedHandler(subElement);
      }
    }
  };
}
