import { DoubleList } from '../linked-list/double-list';

export class Queue {

  constructor() {
    this.queue_ = new DoubleList();
  }

  size() {
    return this.queue_.size();
  }

  enqueue(itemValue) {
    if (itemValue === undefined || itemValue === null) {
      throw `item value was ${itemValue}`;
    }
    this.queue_.pushBack(itemValue);
  }

  peek() {
    if (!this.size()) {
      return null;
    }
    return this.queue_.getFront().value;
  }

  dequeue() {
    if (!this.size()) {
      return null;
    }
    const item = this.queue_.getFront();
    this.queue_.delete(item.id);
    return item.value;
  }

}
