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
    debugger;
    const item = {
      value: itemValue,
      baseId: null,
    };
    const baseList = this.getBaseList_();
    if (!baseList.size()) {
      this.frontId_ = baseList.pushFront(item);
      item.baseId = this.frontId_;
      return;
    }
    const itemHeight = this.getItemHeight_();
    let leftItem = null;
    for (let i = this.lists_.length - 1; i === 0; i--) {
      const level = this.lists_[i];
      const levelIterator = level.getIterator(leftItem);
      while (true) {
        const iteratorResult = levelIterator.next();
        if (iteratorResult.done) {
          break;
        }
        const levelItemValue = iteratorResult.value.value;
        if (levelItemValue.value < itemValue) {
          leftItem = level.get(iteratorResult.value.id);
          break;
        }
      }
      if (i <= itemHeight - 1) {
        let levelItemId = null;
        if (leftItem === null) {
          levelItemId = level.pushFront(item);
        } else {
          levelItemId = level.insertAfter(leftItem.id, item);
        }
        if (i === 0) {
          item.baseId = levelItemId;
          this.frontId_ = levelItemId;
        }
      }
    }
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
