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

  get(itemId) {
    if (itemId === null || itemId === undefined) {
      throw `id was ${itemId}`;
    }
    if (typeof itemId !== 'number') {
      throw `id was ${typeof itemId}, but it must be a number`;
    }
    if (!Number.isInteger(itemId)) {
      throw 'id was not an integer';
    }
    if (itemId > this.list_.length - 1) {
      return null;
    }
    return this.list_[itemId];
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
    const itemId = this.addListItem_(listItem);
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

  insertAfter(referenceItemId, itemValue) {
    const referenceItem = this.get(referenceItemId);
    if (referenceItem === null) {
      throw 'itemId specified does not exist';
    }
    const listItem = {
      next: referenceItem.next,
      value: itemValue,
      id: null,
    };
    const itemId = this.addListItem_(listItem);
    referenceItem.next = itemId;
    this.size_++;
    return itemId;
  }

  pushFront(itemValue) {
    const listItem = {
      next: this.frontId_,
      value: itemValue,
      id: null,
    };
    const itemId = this.addListItem_(listItem);
    this.frontId_ = itemId;
    if (this.backId_ === null) {
      this.backId_ = itemId;
    }
    this.size_++;
    return itemId;
  }

  delete(itemId) {
    let precedingItem = null;
    let nextItem = null;
    const searchedItem = this.get(itemId);
    if (searchedItem === null) {
      return;
    }
    for (let item of this) {
      if (itemId === item.id) {
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
    this.list_[itemId] = null;
    this.freedIds_.push(itemId);
    this.size_--;
  }

  addListItem_(listItem) {
    let itemId = null;
    if (this.freedIds_.length) {
      itemId = this.freedIds_.pop();
      this.list_[itemId] = listItem;
    } else {
      itemId = this.list_.push(listItem) - 1;
    }
    listItem.id = itemId;
    return itemId;
  }

}
