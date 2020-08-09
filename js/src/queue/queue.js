import { DoubleList } from '../linked-list/double-list';

export class Queue {

  constructor() {
    this.items_ = new DoubleList();
  }

  size() {
    return this.items_.size();
  }

  enqueue(itemValue) {
    if (itemValue === undefined || itemValue === null) {
      throw `item value was ${itemValue}`;
    }
    this.items_.pushBack(itemValue);
  }

  peek() {
    if (!this.size()) {
      return null;
    }
    return this.items_.getFront().value;
  }

  dequeue() {
    if (!this.size()) {
      return null;
    }
    const item = this.items_.getFront();
    this.items_.delete(item.id);
    return item.value;
  }

}
