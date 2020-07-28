
export class ForwardIterator {

  constructor(list, initialElementId = null) {
    if (typeof list.getFront !== 'function'
        || typeof list.get !== 'function') {
      throw 'list does not have get and/or getFront methods';
    }
    this.list_ = list;
    this.currentElement_ = null;
    this.isFirstElement_ = true;
    this.isLastElement_ = false;
    if (list.size() > 0 && initialElementId !== null) {
      this.currentElement_ = list.get(initialElementId);
    }
  }

  next() {
    if (this.list_.size() === 0 || this.isLastElement_) {
      return { done: true };
    }
    if (this.isInMiddleOfList_()) {
      this.currentElement_ = this.list_.get(this.currentElement_.next);
    } else if (this.isAtBeginningOfList_()) {
      this.currentElement_ = this.list_.getFront();
    }
    if (this.isFirstElement_) {
      this.isFirstElement_ = false;
    }
    this.isLastElement_ = this.currentElement_.next === null;
    return {
      value: this.currentElement_,
      done: false,
    }
  }

  isInMiddleOfList_() {
    return !this.isFirstElement_ && this.currentElement_ !== null;
  }

  isAtBeginningOfList_() {
    return this.currentElement_ === null;
  }

}
