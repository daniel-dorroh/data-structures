
export class DenseRepository {

  constructor() {
    this.items_ = [];
    this.freedIds_ = [];
    this.size_ = 0;
  }

  size() {
    return this.size_;
  }

  add(item) {
    if (item === null || item === undefined) {
      throw `item is ${item}`;
    }
    let itemId = null;
    if (this.freedIds_.length) {
      itemId = this.freedIds_.pop();
      this.items_[itemId] = item;
    } else {
      itemId = this.items_.push(item) - 1;
    }
    if (item.hasOwnProperty('id')) {
      item.id = itemId;
    }
    this.size_++;
    return itemId;
  }

  contains(itemId) {
    return itemId !== undefined
        && itemId !== null
        && itemId <= this.items_.length - 1;
  }

  getAll() {
    return this.items_;
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
    if (!this.contains(itemId)) {
      return null;
    }
    return this.items_[itemId];
  }

  remove(itemId) {
    if (itemId === null
        || itemId === undefined
        || !this.contains(itemId)) {
      return;
    }
    this.items_[itemId] = null;
    this.freedIds_.push(itemId);
    this.size_--;
  }

}
