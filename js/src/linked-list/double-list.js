import { SingleList } from './single-list';

export class DoubleList extends SingleList {

  constructor() {
    super();
  }

  getBack() {
    if (this.backId_ === null) {
      throw 'the back item does not exist';
    }
    return this.list_[this.backId_];
  }

  pushBack(itemValue) {
    const listItem = this.create_(itemValue, this.backId_, null);
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

  insertBefore(referenceItemId, itemValue) {
    const referenceItem = this.get(referenceItemId);
    if (referenceItem === null) {
      throw 'itemId specified does not exist';
    }
    const listItem = this.create_(itemValue, referenceItem.previous, referenceItemId);
    const itemId = this.add_(listItem);
    if (referenceItem.previous !== null) {
      const previousItem = this.get(referenceItem.previous);
      previousItem.next = itemId;
    }
    referenceItem.previous = itemId;
    return itemId;
  }

  insertAfter(referenceItemId, itemValue) {
    const referenceItem = this.get(referenceItemId);
    if (referenceItem === null) {
      throw 'itemId specified does not exist';
    }
    const listItem = this.create_(itemValue, referenceItemId, referenceItem.next);
    const itemId = this.add_(listItem);
    if (referenceItem.next !== null) {
      const nextItem = this.get(referenceItem.next);
      nextItem.previous = itemId;
    }
    referenceItem.next = itemId;
    return itemId;
  }

  pushFront(itemValue) {
    const listItem = this.create_(itemValue, null, this.frontId_);
    const itemId = this.add_(listItem);
    if (this.frontId_ !== null) {
      this.list_[this.frontId_].previous = itemId;
    }
    this.frontId_ = itemId;
    if (this.backId_ === null) {
      this.backId_ = itemId;
    }
    return itemId;
  }

  delete(itemId) {
    const searchedItem = this.get(itemId);
    if (searchedItem === null) {
      return;
    }
    let previousItem = this.get(searchedItem.previous);
    let nextItem = this.get(searchedItem.next);
    this.connect_(previousItem, nextItem);
    this.remove_(itemId);
  }

  connect_(previousListItem, nextListItem) {
    if (previousListItem === null && nextListItem === null) {
      this.frontId_ = null;
      this.backId_ = null;
    } else if (previousListItem === null) {
      this.frontId_ = nextListItem.id;
      nextListItem.previous = null;
    } else if (nextListItem === null) {
      this.backId_ = previousListItem.id;
      previousListItem.next = null;
    } else {
      previousListItem.next = nextListItem.id;
      nextListItem.previous = previousListItem.id;
    }
  }

  create_(value, previousItemId, nextItemId) {
    return {
      value: value,
      previous: previousItemId,
      next: nextItemId,
      id: null,
    };

  }

}
