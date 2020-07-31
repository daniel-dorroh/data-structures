import { SingleList } from './single-list';

export class SkipList extends SingleList {

  constructor() {
    super();
    this.levels_ = [];
    this.levels_.push(this);
  }

  maxHeight(addedItemCount = 0) {
    const newSize = this.size() + addedItemCount;
    if (newSize <= 1) {
      return 1;
    }
    return Math.floor(Math.log2(newSize));
  }

  insert(itemValue) {
    // get height of item and add a new level if necessary
    const itemHeight = this.calculateItemHeight_();
    const item = {
      value: itemValue,
      baseId: null,
      ids: {},
    };
    // the front item is not actually part of the level lists other than
    // base list, but it is treated as though it is in all of them.
    const sentinelFrontItem = this.size() ? this.getFront() : null;
    if (!this.size() || itemValue < sentinelFrontItem.value.value) {
      this.frontId_ = this.pushFront(item);
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

  addLevel_() {
    const list = new SingleList();
    this.levels_.push(list);
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

  removeLevel_() {
    this.levels_.pop();
  }

  remove_(itemId) {
    const itemValue = this.getValue(itemId);
    if (this.maxHeight() > this.maxHeight(-1)) {
      this.removeLevel_();
    }
    for (const [levelId, itemId] of Object.entries(itemValue.ids)) {
      if (levelId > 0) {
        this.levels_[levelId].delete(itemId);
      }
    }
    super.remove_(itemId);
  }

}
