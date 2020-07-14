
export class ForwardIterator {

  constructor(list) {
    this.list_ = list;
    this.currentElement_ = null;
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
      this.isLastElement_ = this.currentElement_.next === null;
    }
    return {
      value: this.currentElement_.value,
      done: false,
    }
  }

}
