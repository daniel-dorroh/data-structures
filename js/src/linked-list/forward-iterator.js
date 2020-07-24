
export class ForwardIterator {

  constructor(list, initialCurrentElement = null) {
    if (typeof list.getFront !== 'function'
        || typeof list.get !== 'function') {
      throw 'list does not have get and/or getFront methods';
    }
    this.list_ = list;
    this.currentElement_ = initialCurrentElement;
    this.isLastElement_ = false;
  }

  next() {
    if (this.isLastElement_) {
      return { done: true };
    }
    if (this.currentElement_ === null) {
      this.currentElement_ = this.list_.getFront();
    } else {
      this.currentElement_ = this.list_.get(this.currentElement_.next);
    }
    this.isLastElement_ = this.currentElement_.next === null;
    return {
      value: this.currentElement_,
      done: false,
    }
  }

}
