
export class Stack {

  constructor() {
    this.stack_ = [];
  }

  isEmpty() {
    return !this.stack_.length;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    const topIndex = this.stack_.length - 1;
    return this.stack_[topIndex];
  }

  push(item) {
    if (item === undefined || item === null) {
      throw `pushed item is ${item}`;
    }
    this.stack_.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw 'no items on stack to pop';
    }
    return this.stack_.pop();
  }

}
