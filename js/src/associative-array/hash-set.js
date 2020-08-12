import { HashTable } from './hash-table';

export class HashSet {

  constructor(createKeyFunction = null) {
    if (createKeyFunction !== null && typeof createKeyFunction !== 'function') {
      throw 'createKeyFunction is not a function';
    }
    this.createKey_ = createKeyFunction !== null
        ? createKeyFunction
        : (item) => item;
    this.items_ = new HashTable();
    this.size_ = 0;
  }

  [Symbol.iterator]() {
    const items = this.items_;
    const iterator = function*() {
      yield* items;
    }
    return iterator();
  }

  size() {
    return this.size_;
  }

  add(item) {
    if (item === null || item === undefined) {
      throw `item is ${item}`;
    }
    const key = this.createKey_(item);
    if (this.get(key) === null) {
      this.items_.add(key, item);
      this.size_++;
    }
    return key;
  }

  get(key) {
    if (key === null || key === undefined) {
      return null;
    }
    return this.items_.get(key);
  }

  remove(key) {
    if (this.get(key) !== null) {
      this.items_.remove(key);
      this.size_--;
    }
  }

}
