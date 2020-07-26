import { SingleList } from './single-list';

export class SkipList {

  constructor() {
    this.lists_ = []
    this.addLevel_();
    this.frontId_ = null;
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
    const itemHeight = this.getItemHeight_();

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
      return item.baseId;
    }
    let leftHandItem = null;
    // Search for spot in base list to insert
    for (let i = this.lists_.length - 1; i === 0; i--) {
      const level = this.lists_[i];
      const levelIterator = level.getIterator(leftHandItem && leftHandItem.value.ids[i]);
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
          leftHandItem = lastLevelItem;
          break;
        }
      }
      if (i <= itemHeight - 1 && leftHandItem !== null) {
        const levelItemId = level.insertAfter(leftHandItem.id, item);
        item.ids[i] = levelItemId;
        if (i === 0) {
          item.baseId = levelItemId;
        }
      }
    }
    return item.baseId;
  }

  addLevel_(value = null) {
    const list = new SingleList();
    this.lists_.push(list);
    if (value !== null) {
      list.pushFront(value);
    }
  }

  removeLevel_() {
    this.lists_.pop();
  }

  getBaseList_() {
    return this.lists_[this.lists_.length - 1];
  }

  getItemHeight_() {
    let itemLevelCount = 1;
    const nextMaxHeight = this.nextMaxHeight_();
    if (nextMaxHeight == 1) {
      return itemLevelCount;
    }
    if (nextMaxHeight > this.maxHeight()) {
      this.addLevel_();
    }
    for (let i = 1; i < nextMaxHeight; i++) {
      if (Math.random() < 0.5) {
        return itemLevelCount;
      }
      itemLevelCount++;
    }
  }

  nextMaxHeight_() {
    return this.maxHeight(1);
  }

}
