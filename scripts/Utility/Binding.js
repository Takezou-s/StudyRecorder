import { BindingArguments } from "./BindingArguments.js";

// Property binding. Değer değişimi diğer propertye aktarılır. Fonksiyon çalıştırılabilir.
export class Binding {
  constructor(source, sourceProperty, target, targetProperty, twoWay, onSourceChanged, onTargetChanged) {
    this.source = source;
    this.sourceProperty = sourceProperty;
    this.target = target;
    this.targetProperty = targetProperty;
    this.twoWay = twoWay;
    this.onSourceChanged = onSourceChanged;
    this.onTargetChanged = onTargetChanged;

    this._subscribeSource();
    this._subscribeTarget();
  }

  //#region Subscription functions
  _subscribeSource() {
    if (!this.source) {
      return;
    }
    this.source.propertyChangedEvent.subscribe(this.sourcePropertyChangedHandler);
  }

  _unsubscribeSource() {
    if (!this.source) {
      return;
    }
    this.source.propertyChangedEvent.unsubscribe(this.sourcePropertyChangedHandler);
  }

  _subscribeTarget() {
    if (!this.target || !this.twoWay) {
      return;
    }
    this.target.propertyChangedEvent.subscribe(this.targetPropertyChangedHandler);
  }

  _unsubscribeTarget() {
    if (!this.target) {
      return;
    }
    this.target.propertyChangedEvent.unsubscribe(this.targetPropertyChangedHandler);
  }
  //#endregion

  sourcePropertyChangedHandler(event, property) {
    if (property !== this.sourceProperty) {
      return;
    }
    this._unsubscribeTarget();
    try {
      if (this.source || this.target || this.targetProperty) this.target[this.targetProperty] = this.source[property];
      if (this.onSourceChanged) {
        this.onSourceChanged(this._getBindingArguments());
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this._subscribeTarget();
    }
  }

  targetPropertyChangedHandler(event, property) {
    if (property !== this.targetProperty) {
      return;
    }
    this._unsubscribeSource();
    try {
      if (this.source || this.target || this.sourceProperty) this.source[this.sourceProperty] = this.target[property];
      if (this.onTargetChanged) {
        this.onTargetChanged(this._getBindingArguments());
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this._subscribeSource();
    }
  }

  _getBindingArguments() {
    new BindingArguments(this.source, this.sourceProperty, this.target, this.targetProperty);
  }
}
