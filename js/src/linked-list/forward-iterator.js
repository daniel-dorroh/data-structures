
export class ForwardIterator {

  constructor(list, initialElementId = null) {
    if (typeof list.getFront !== 'function'
        || typeof list.get !== 'function') {
      throw 'list does not have get and/or getFront methods';
    }
    this.list_ = list;
    this.currentElement_ = initialElementId && list.get(initialElementId);
    this.isLastElement_ = false;
  }

  next() {
    if (this.isLastElement_) {
      return { done: true };
    }
    this.currentElement_ = this.currentElement_ === null
        ? this.list_.getFront()
        : this.list_.get(this.currentElement_.next);
    this.isLastElement_ = this.currentElement_.next === null;
    return {
      value: this.currentElement_,
      done: false,
    }
  }

}
