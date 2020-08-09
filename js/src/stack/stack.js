
export class Stack {

  constructor() {
    this.items_ = [];
  }

  isEmpty() {
    return !this.items_.length;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    const topIndex = this.items_.length - 1;
    return this.items_[topIndex];
  }

  push(item) {
    if (item === undefined || item === null) {
      throw `pushed item is ${item}`;
    }
    this.items_.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw 'no items on stack to pop';
    }
    return this.items_.pop();
  }

}
