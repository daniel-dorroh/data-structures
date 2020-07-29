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

  maxHeight(addedItemCount = 0) {
    const baseList = this.getBaseList_();
    const size = baseList.size() + addedItemCount;
    if (size <= 1) {
      return 1;
    }
    return Math.floor(Math.log2(size));
  }

  insert(itemValue) {
    // get height of item and add a new level if necessary
    const itemHeight = this.calculateItemHeight_();
    const item = {
      value: itemValue,
      baseId: null,
      ids: {},
    };
    const baseList = this.getBaseList_();
    const sentinelFrontItem = baseList.size() ? baseList.getFront() : null;
    if (!baseList.size() || itemValue < sentinelFrontItem.value.value) {
      this.frontId_ = baseList.pushFront(item);
      item.baseId = this.frontId_;
      item.ids[0] = item.baseId;
      return item.baseId;
    }
    // begin search from the highest level and move down to the base list
    // search and insertion looks something like
    // ---- insert 34, height 2 ------------------------------
    // 5 |-----           46           <- level 4 not inserted
    // 5   10 |-----      46           <- level 3 not inserted
    // 5   10   20 |--- * 46        99 <- level 2     inserted
    // 5   10   20   29 * 46   76   99 <- base list   inserted
    //                  ^
    //           insertion point
    // -------------------------------------------------------
    let leftHandItem = sentinelFrontItem;
    let listIndex = this.lists_.length - 1;
    while (true) {
      const level = this.lists_[listIndex];
      let insertionPointFound = false;
      for (let levelItem of level.getIterable(leftHandItem && leftHandItem.value.ids[listIndex])) {
        if (itemValue > levelItem.value.value) {
          leftHandItem = levelItem;
          insertionPointFound = true;
        } else {
          break;
        }
      }
      // if the item rolled a height that includes this level,
      // insert the item
      if (listIndex <= itemHeight - 1) {
        let levelItemId = insertionPointFound
            ? level.insertAfter(leftHandItem.id, item)
            : level.pushFront(item);
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
