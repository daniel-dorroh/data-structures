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
      return null;
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

  getIterable(initialItemId) {
    return {
      [Symbol.iterator]: () => {
        return new ForwardIterator(this, initialItemId);
      }
    }
  }

  getIterator() {
    return new ForwardIterator(this);
  }

  getValue(itemId) {
    const item = this.get(itemId);
    return item && item.value;
  }

  pushBack(itemValue) {
    const listItem = this.create_(itemValue, null);
    const itemId = this.add_(listItem);
    if (this.backId_ !== null) {
      this.list_[this.backId_].next = itemId;
    }
    this.backId_ = itemId;
    if (this.frontId_ === null) {
      this.frontId_ = itemId;
    }
    return itemId;
  }

  insertAfter(referenceItemId, itemValue) {
    const referenceItem = this.get(referenceItemId);
    if (referenceItem === null) {
      throw 'itemId specified does not exist';
    }
    const listItem = this.create_(itemValue, referenceItem.next);
    const itemId = this.add_(listItem);
    if (listItem.next === null) {
      this.backId_ = itemId;
    }
    referenceItem.next = itemId;
    return itemId;
  }

  pushFront(itemValue) {
    const listItem = this.create_(itemValue, this.frontId_);
    const itemId = this.add_(listItem);
    this.frontId_ = itemId;
    if (this.backId_ === null) {
      this.backId_ = itemId;
    }
    return itemId;
  }

  delete(itemId) {
    let previousItem = null;
    let nextItem = null;
    const searchedItem = this.get(itemId);
    if (searchedItem === null) {
      return;
    }
    for (let item of this) {
      if (itemId === item.id) {
        nextItem = this.get(item.next);
        break;
      }
      previousItem = item;
    }
    this.remove_(itemId);
    this.connect_(previousItem, nextItem);
  }

  add_(listItem) {
    let itemId = null;
    if (this.freedIds_.length) {
      itemId = this.freedIds_.pop();
      this.list_[itemId] = listItem;
    } else {
      itemId = this.list_.push(listItem) - 1;
    }
    listItem.id = itemId;
    this.size_++;
    return itemId;
  }

  connect_(previousListItem, nextListItem) {
    if (previousListItem === null && nextListItem === null) {
      this.frontId_ = null;
      this.backId_ = null;
    } else if (previousListItem === null) {
      this.frontId_ = nextListItem.id;
    } else if (nextListItem === null) {
      this.backId_ = previousListItem.id;
      previousListItem.next = null;
    } else {
      previousListItem.next = nextListItem.id;
    }
  }

  create_(value, nextItemId) {
    return {
      value: value,
      next: nextItemId,
      id: null,
    };
  }

  remove_(itemId) {
    this.list_[itemId] = null;
    this.freedIds_.push(itemId);
    this.size_--;
  }

}
