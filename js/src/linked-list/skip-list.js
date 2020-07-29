import { SingleList } from './single-list';
import { ForwardIterator } from './forward-iterator';

export class SkipList {

  constructor() {
    this.levels_ = []
    this.addLevel_();
    this.frontId_ = null;
  }

  [Symbol.iterator]() {
    return this.getIterator();
  }

  getIterator() {
    return new ForwardIterator(this.getBaseList_());
  }

  size() {
    return this.getBaseList_().size();
  }

  maxHeight(addedItemCount = 0) {
    const baseList = this.getBaseList_();
    const size = baseList.size() + addedItemCount;
    if (size <= 1) {
      return 1;
    }
    return Math.floor(Math.log2(size));
  }

  get(itemId) {
    if (itemId === null || itemId === undefined) {
      return null;
    }
    if (typeof itemId !== 'number') {
      throw `id was ${typeof itemId}, but it must be a number`;
    }
    if (!Number.isInteger(itemId)) {
      throw 'id was not an integer';
    }
    const baseList = this.getBaseList_();
    // TODO: expose a method on SingleList to check if ID is within list.
    if (itemId > baseList.list_.length - 1) {
      return null;
    }
    return baseList.get(itemId);
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
    // the front item is not actually part of the level lists other than
    // base list, but it is treated as though it is in all of them.
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
    // 5 |-----                        <- level 4 not inserted
    // 5   10 |-----      46           <- level 3 not inserted
    // 5   10   20 |--- * 46        99 <- level 2     inserted
    // 5   10   20   29 * 46   76   99 <- base list   inserted
    //                  ^
    //           insertion point
    // -------------------------------------------------------
    let leftHandItem = sentinelFrontItem;
    let levelIndex = this.levels_.length - 1;
    while (true) {
      const level = this.levels_[levelIndex];
      let insertionPointFound = false;
      for (let levelItem of level.getIterable(leftHandItem && leftHandItem.value.ids[levelIndex])) {
        if (itemValue > levelItem.value.value) {
          leftHandItem = levelItem;
          insertionPointFound = true;
        } else {
          break;
        }
      }
      // if the item rolled a height that includes this level,
      // insert the item
      if (levelIndex <= itemHeight - 1) {
        let levelItemId = insertionPointFound
            ? level.insertAfter(leftHandItem.id, item)
            : level.pushFront(item);
        item.ids[levelIndex] = levelItemId;
        if (levelIndex === 0) {
          item.baseId = levelItemId;
        }
      }
      if (--levelIndex < 0) {
        break;
      }
    }
    return item.baseId;
  }

  delete(itemId) {
    let previousItem = null;
    let nextItem = null;
    const searchedItem = this.get(itemId);
    if (searchedItem === null) {
      return;
    }
    for (let item of this) {
      if (itemId === item.id) {
        nextItem = this.get(item.next);
        break;
      }
      previousItem = item;
    }
    this.updateFrontId_(previousItem, nextItem);
    this.remove_(searchedItem);
  }

  addLevel_() {
    const list = new SingleList();
    this.levels_.push(list);
  }

  removeLevel_() {
    this.levels_.pop();
  }

  getBaseList_() {
    return this.levels_[0];
  }

  calculateItemHeight_() {
    let height = 1;
    const nextMaxHeight = this.maxHeight(1);
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

  updateFrontId_(previousListItem, nextListItem) {
    if (previousListItem === null && nextListItem === null) {
      this.frontId_ = null;
    } else if (previousListItem === null) {
      this.frontId_ = nextListItem.id;
    }
  }

  remove_(item) {
    if (this.maxHeight() > this.maxHeight(-1)) {
      this.removeLevel_();
    }
    for (const [levelId, itemId] of Object.entries(item.value.ids)) {
      this.levels_[levelId].delete(itemId);
    }
  }

}
