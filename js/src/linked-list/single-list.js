import { ForwardIterator } from './forward-iterator';

export class SingleList {

  constructor() {
    this.list_ = [];
    this.size_ = 0;
    this.frontId_ = null;
    this.backId_ = null;
  }

  isEmpty() {
    return !this.size_;
  }

  size() {
    return this.size_;
  }

  [Symbol.iterator]() {
    return this.getIterator();
  }

  get(id) {
    if (id === null || id === undefined) {
      throw `id was ${id}`;
    }
    if (typeof id !== 'number') {
      throw `id was ${typeof id}, but it must be a number`;
    }
    if (!Number.isInteger(id)) {
      throw 'id was not an integer';
    }
    return this.list_[id];
  }

  getFront() {
    if (this.frontId_ === null) {
      throw 'the front item does not exist';
    }
    return this.list_[this.frontId_];
  }

  getIterator() {
    return new ForwardIterator(this);
  }

  pushBack(item) {
    const listItem = {
      next: null,
      value: item,
    };
    const itemId = this.list_.push(listItem) - 1;
    if (this.backId_ !== null) {
      this.list_[this.backId_].next = itemId;
    }
    this.backId_ = itemId;
    if (this.frontId_ === null) {
      this.frontId_ = itemId;
    }
    this.size_++;
    return itemId;
  }

  pushFront(item) {
    const listItem = {
      next: this.frontId_,
      value: item,
    };
    const itemId = this.list_.push(listItem) - 1;
    this.frontId_ = itemId;
    if (this.backId_ === null) {
      this.backId_ = itemId;
    }
    this.size_++;
    return itemId;
  }

}
