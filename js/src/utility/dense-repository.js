
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
    let itemId = null;
    if (this.freedIds_.length) {
      itemId = this.freedIds_.pop();
      this.items_[itemId] = item;
    } else {
      itemId = this.items_.push(item) - 1;
    }
    item.id = itemId;
    this.size_++;
    return itemId;
  }

  contains(itemId) {
    return itemId <= this.items_.length - 1;
  }

  get(itemId) {
    return this.items_[itemId];
  }

  remove(itemId) {
    this.items_[itemId] = null;
    this.freedIds_.push(itemId);
    this.size_--;
  }

}
