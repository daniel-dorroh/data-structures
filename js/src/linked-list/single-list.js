import { ForwardIterator } from './forward-iterator';

export class SingleList {

  constructor() {
    this.list_ = [];
    this.size_ = 0;
    this.frontId_ = null;
    this.backId_ = null;
    this.freedIds_ = [];
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
    if (id > this.list_.length - 1) {
      return null;
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

  pushBack(itemValue) {
    const listItem = {
      next: null,
      value: itemValue,
      id: null,
    };
    const itemId = this.list_.push(listItem) - 1;
    this.list_[itemId].id = itemId;
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

  pushFront(itemValue) {
    const listItem = {
      next: this.frontId_,
      value: itemValue,
      id: null,
    };
    const itemId = this.list_.push(listItem) - 1;
    this.list_[itemId].id = itemId;
    this.frontId_ = itemId;
    if (this.backId_ === null) {
      this.backId_ = itemId;
    }
    this.size_++;
    return itemId;
  }

  deleteAt(id) {
    let precedingItem = null;
    let nextItem = null;
    const searchedItem = this.get(id);
    if (searchedItem === null) {
      return;
    }
    for (let item of this) {
      if (id === item.id) {
        if (item.next !== null) {
          nextItem = this.get(item.next);
        }
        break;
      }
      precedingItem = item;
    }
    // beginning of list
    if (precedingItem === null) {
      this.frontId_ = searchedItem.next;
    } else {
      precedingItem.next = searchedItem.next;
    }
    // end of list
    if (nextItem === null) {
      // deleting the only item
      if (precedingItem === null) {
        this.backId_ = null;
      } else {
        this.backId_ = precedingItem.id;
        precedingItem.next = null;
      }
    }
    this.list_[id] = null;
    this.freedIds_.push(id);
    this.size_--;
  }

  delete(item) {
    if (!item.hasOwnProperty('id')) {
      throw 'item does not have an id';
    }
    this.deleteAt(item.id);
  }

}
