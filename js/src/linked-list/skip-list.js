import { SingleList } from './single-list';
import { ForwardIterator } from './forward-iterator';

export class SkipList {

  constructor() {
    this.lists_ = []
    this.addLevel_();
    this.frontId_ = null;
  }

  [Symbol.iterator]() {
    return this.getIterator();
  }

  getIterator() {
    return new ForwardIterator(this.getBaseList_());
  }

  maxHeight(itemAddedCount = 0) {
    const baseList = this.getBaseList_();
    const size = baseList.size() + itemAddedCount;
    if (size <= 1) {
      return 1;
    }
    return Math.floor(Math.log2(size));
  }

  insert(itemValue) {
    // Get level of item and add any levels if possible given new size.
    const itemHeight = this.calculateItemHeight_();

    const item = {
      value: itemValue,
      baseId: null,
      ids: {},
    };
    const baseList = this.getBaseList_();

    // Insert front for empty list
    // Insert front for value less than front
    const baseListSize = baseList.size();
    const frontItem = baseListSize ? baseList.getFront() : null;
    if (!baseListSize || frontItem.value.value > itemValue) {
      this.frontId_ = baseList.pushFront(item);
      item.baseId = this.frontId_;
      item.ids[0] = item.baseId;
      return item.baseId;
    }
    let leftHandItem = frontItem;
    // Search for spot in base list to insert
    let listIndex = this.lists_.length - 1;
    while (true) {
      const level = this.lists_[listIndex];
      const levelIterator = new ForwardIterator(level, leftHandItem && leftHandItem.value.ids[listIndex]);
      let lastLevelItem = null;
      while (true) {
        const iteratorResult = levelIterator.next();
        if (iteratorResult.done) {
          break;
        }
        // TODO: come up with better names for
        // - level
        // - levelItem
        // - levelItemValue
        // values are { value, baseId, ids }
        const levelItem = iteratorResult.value;
        const levelItemValue = levelItem.value;
        if (itemValue > levelItemValue.value) {
          lastLevelItem = levelItem;
        } else {
          break;
        }
      }
      leftHandItem = lastLevelItem;
      if (listIndex <= itemHeight - 1 && leftHandItem !== null) {
        let levelItemId = level.size() ? level.insertAfter(leftHandItem.id, item) : level.pushFront(item);
        item.ids[listIndex] = levelItemId;
        if (listIndex === 0) {
          item.baseId = levelItemId;
        }
      }
      if (--listIndex < 0) {
        break;
      }
    }
    return item.baseId;
  }

  addLevel_() {
    const list = new SingleList();
    this.lists_.push(list);
  }

  removeLevel_() {
    this.lists_.pop();
  }

  getBaseList_() {
    return this.lists_[0];
  }

  calculateItemHeight_() {
    let height = 1;
    const nextMaxHeight = this.nextMaxHeight_();
    if (nextMaxHeight === height) {
      return height;
    }
    if (nextMaxHeight > this.maxHeight()) {
      this.addLevel_();
    }
    for (let i = 1; i < nextMaxHeight && Math.random() >= 0.5; i++) {
      height++;
    }
    return height;
  }

  nextMaxHeight_() {
    return this.maxHeight(1);
  }

}
