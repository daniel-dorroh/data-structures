import { ForwardIterator } from './forward-iterator';
import { DenseRepository } from '../utility/dense-repository';

export class SingleList {

  constructor() {
    this.items_ = new DenseRepository();
    this.frontId_ = null;
    this.backId_ = null;
  }

  isEmpty() {
    return !this.items_.size();
  }

  size() {
    return this.items_.size();
  }

  [Symbol.iterator]() {
    return this.getIterator();
  }

  get(itemId) {
    return this.items_.get(itemId);
  }

  getFront() {
    if (this.frontId_ === null) {
      throw 'the front item does not exist';
    }
    return this.items_.get(this.frontId_);
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

  getValues() {
    return Array.from(this).map(item => item.value);
  }

  pushBack(itemValue) {
    const listItem = this.create_(itemValue, null);
    const itemId = this.items_.add(listItem);
    if (this.backId_ !== null) {
      this.items_.get(this.backId_).next = itemId;
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
      throw `itemId "${referenceItemId}" specified does not exist`;
    }
    const listItem = this.create_(itemValue, referenceItem.next);
    const itemId = this.items_.add(listItem);
    if (listItem.next === null) {
      this.backId_ = itemId;
    }
    referenceItem.next = itemId;
    return itemId;
  }

  pushFront(itemValue) {
    const listItem = this.create_(itemValue, this.frontId_);
    const itemId = this.items_.add(listItem);
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
    this.items_.remove(itemId);
  }

}
