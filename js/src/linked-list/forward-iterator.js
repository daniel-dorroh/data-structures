
export class ForwardIterator {

  constructor(items, initialItemId = null) {
    if (typeof items.getFront !== 'function'
        || typeof items.get !== 'function') {
      throw 'list does not have get and/or getFront methods';
    }
    this.items_ = items;
    this.currentItem = null;
    this.isFirstItem = true;
    this.isLastItem = false;
    if (items.size() > 0 && initialItemId !== null) {
      this.currentItem = items.get(initialItemId);
    }
  }

  next() {
    if (this.items_.size() === 0 || this.isLastItem) {
      return { done: true };
    }
    if (this.isInside()) {
      this.currentItem = this.items_.get(this.currentItem.next);
    } else if (this.isBeginning_()) {
      this.currentItem = this.items_.getFront();
    }
    if (this.isFirstItem) {
      this.isFirstItem = false;
    }
    this.isLastItem = this.currentItem.next === null;
    return {
      value: this.currentItem,
      done: false,
    }
  }

  isInside() {
    return !this.isFirstItem && this.currentItem !== null;
  }

  isBeginning_() {
    return this.currentItem === null;
  }

}
