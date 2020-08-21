
export const HEAP_TYPES = { MINIMUM: 'min', MAXIMUM: 'max' };

const isOdd = (value) => value % 2 !== 0;

export class Heap {

  constructor(type = HEAP_TYPES.MAXIMUM, initialItems = []) {
    if (!Object.values(HEAP_TYPES).includes(type)) {
      throw `type '${type}' is not a valid option. Use HEAP_TYPES`;
    }
    if (typeof initialItems[Symbol.iterator] !== 'function') {
      throw `initialItems is not iterable`;
    }
    this.isMaximumHeap_ = type === HEAP_TYPES.MAXIMUM;
    this.heap_ = initialItems.sort((a, b) => -1 * this.priorityCompare_(a, b));
  }

  push(value) {
    let position = this.heap_.length;
    this.heap_[position] = value;
    if (position === 0) {
      return;
    }
    this.siftUp_(position);
  }

  pop() {
    const value = this.heap_[0];
    this.heap_[0] = this.heap_.pop();
    this.siftDown_(0);
    return value;
  }

  peek() {
    return this.heap_[0];
  }

  getMax() {
    if (this.isMaximumHeap_) {
      return this.pop();
    }

  }

  getMin() {
    if (!this.isMaximumHeap_) {
      return this.pop();
    }

  }

  getParentPosition_(position) {
    if (isOdd(position)) {
      return (position - 1) / 2;
    } else {
      return (position - 2) / 2;
    }
  }

  getLeftChildPosition_(position) {
    return 2 * position + 1;
  }

  getRightChildPosition_(position) {
    return 2 * position + 2;
  }

  getPriorityPosition_(position1, position2) {
    const value1 = this.heap_[position1];
    const value2 = this.heap_[position2];
    return this.isValue1Priority_(value1, value2) ? position1 : position2;
    // if (this.isMaximumHeap_) {
    //   return value1 >= value2 ? position1 : position2;
    // } else {
    //   return value1 > value2 ? position2 : position1;
    // }
  }

  isValue1Priority_(value1, value2) {
    return this.isMaximumHeap_ ? value1 >= value2 : value1 < value2;
  }

  priorityCompare_(value1, value2) {
    if (value1 === value2) {
      return 0;
    }
    if (this.isValue1Priority_(value1, value2)) {
      return 1;
    } else {
      return -1;
    }
  }

  isParentChildOrderCorrect_(parentPosition, childPosition) {
    return this.getPriorityPosition_(parentPosition, childPosition) === parentPosition;
  }

  isPositionValid_(position) {
    return position < this.heap_.length;
  }

  choosePriorityPosition_(parentPosition, leftChildPosition, rightChildPosition) {
    let priorityPosition = parentPosition;
    if (this.isPositionValid_(leftChildPosition)) {
      priorityPosition = this.getPriorityPosition_(priorityPosition, leftChildPosition);
    }
    if (this.isPositionValid_(rightChildPosition)) {
      priorityPosition = this.getPriorityPosition_(priorityPosition, rightChildPosition);
    }
    return priorityPosition;
  }

  siftUp_(position) {
    const value = this.heap_[position];
    while (true) {
      const parentPosition = this.getParentPosition_(position);
      if (this.isParentChildOrderCorrect_(parentPosition, position)) {
        break;
      }
      this.heap_[position] = this.heap_[parentPosition];
      this.heap_[parentPosition] = value;
      position = parentPosition;
      if (position === 0) {
        break;
      }
    }
  }

  siftDown_(position) {
    const value = this.heap_[position];
    while (true) {
      const leftChildPosition = this.getLeftChildPosition_(position);
      const rightChildPosition = this.getRightChildPosition_(position);
      const priorityPosition = this.choosePriorityPosition_(position, leftChildPosition, rightChildPosition);
      if (priorityPosition === position) {
        break;
      }
      this.heap_[position] = this.heap_[priorityPosition];
      this.heap_[priorityPosition] = value;
      position = priorityPosition;
    }
  }

}
