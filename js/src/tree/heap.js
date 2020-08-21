
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
    // Default sort is ascending, so the comparison has to
    // be flipped to make the priority value the first one.
    this.heap_ = initialItems.sort((a, b) => -this.priorityCompare_(a, b));
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
    this.heap_[0] = this.getLeastPriorityValue_();
    this.siftDown_(0);
    return value;
  }

  replace(value) {
    const rootValue = this.heap_[0];
    this.heap_[0] = value;
    this.siftDown_(0);
    return rootValue;
  }

  peek() {
    return this.heap_[0];
  }

  getMax() {
    if (this.isMaximumHeap_) {
      return this.pop();
    }
    this.getLeastPriorityValue_();
  }

  getMin() {
    if (!this.isMaximumHeap_) {
      return this.pop();
    }
    this.getLeastPriorityValue_();
  }

  getParentPosition_(position) {
    if (position === 0) {
      return position;
    }
    return isOdd(position)
        ? (position - 1) / 2
        : (position - 2) / 2;
  }

  getLeftChildPosition_(position) {
    return 2 * position + 1;
  }

  getRightChildPosition_(position) {
    return 2 * position + 2;
  }

  isValue1Priority_(value1, value2) {
    return this.isMaximumHeap_ ? value1 >= value2 : value1 < value2;
  }

  priorityCompare_(value1, value2) {
    return value1 === value2
        ? 0
        : this.isValue1Priority_(value1, value2)
            ? 1
            : -1;
  }

  isParentChildOrderCorrect_(parentPosition, childPosition) {
    return parentPosition === this.getPriorityPosition_(parentPosition, childPosition);
  }

  isPositionValid_(position) {
    return position < this.heap_.length;
  }

  getPriorityPosition_(position1, position2) {
    const value1 = this.heap_[position1];
    const value2 = this.heap_[position2];
    return this.isValue1Priority_(value1, value2) ? position1 : position2;
  }

  getThreewayPriorityPosition_(parentPosition, leftChildPosition, rightChildPosition) {
    let priorityPosition = parentPosition;
    if (this.isPositionValid_(leftChildPosition)) {
      priorityPosition = this.getPriorityPosition_(priorityPosition, leftChildPosition);
    }
    if (this.isPositionValid_(rightChildPosition)) {
      priorityPosition = this.getPriorityPosition_(priorityPosition, rightChildPosition);
    }
    return priorityPosition;
  }

  getLeastPriorityValue_() {
    return this.heap_.pop();
  }

  swapValues_(position1, position2) {
    const value1 = this.heap_[position1];
    this.heap_[position1] = this.heap_[position2];
    this.heap_[position2] = value1;
  }

  siftUp_(position) {
    while (true) {
      const parentPosition = this.getParentPosition_(position);
      if (this.isParentChildOrderCorrect_(parentPosition, position)) {
        break;
      }
      this.swapValues_(position, parentPosition);
      position = parentPosition;
    }
  }

  siftDown_(position) {
    while (true) {
      const leftChildPosition = this.getLeftChildPosition_(position);
      const rightChildPosition = this.getRightChildPosition_(position);
      const priorityPosition =
          this.getThreewayPriorityPosition_(
            position,
            leftChildPosition,
            rightChildPosition);
      if (priorityPosition === position) {
        break;
      }
      this.swapValues_(position, priorityPosition);
      position = priorityPosition;
    }
  }

}
