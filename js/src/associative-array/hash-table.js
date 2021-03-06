export class HashTable {

  constructor(binCount = 1000) {
    if (binCount < 1) {
      throw `${binCount} is less than 1, the minimum number of bins`;
    }
    this.storage_ = [];
    this.intBitCount = 32;
    this.binCount_ = binCount;
    this.maxIntValue_ = Math.pow(2, this.intBitCount) - 1;
    this.factor_ = Math.floor(Math.random() * (this.maxIntValue_ - 1) + 1);
    this.bias_ = Math.floor(Math.random() * (this.maxIntValue_ - 1));
    this.size_ = 0;
  }

  [Symbol.iterator]() {
    const storage = this.storage_;
    const iterator = function*() {
      for (let item of storage) {
        if (item !== undefined && item !== null) {
          if (typeof item.size === 'function') {
            yield* item;
          } else {
            yield item.value;
          }
        }
      }
    }
    return iterator();
  }

  size() {
    return this.size_;
  }

  add(key, value) {
    const hash = this.hash(key);
    const binIndex = hash % this.binCount_;
    const item = this.createItem_(key, value, hash);
    const binItem = this.storage_[binIndex];
    if (binItem === null || binItem === undefined) {
      this.storage_[binIndex] = item;
    } else if (typeof binItem.add !== 'function') {
      if (this.areKeysEquivalent_(key, binItem.key)) {
        binItem.value = value;
        return;
      }
      const table = new HashTable();
      table.add(binItem.key, binItem.value);
      table.add(key, value);
      this.storage_[binIndex] = table;
    } else {
      binItem.add(key, value);
    }
    this.size_++;
  }

  get(key) {
    const hash = this.hash(key);
    const binIndex = hash % this.binCount_;
    const binItem = this.storage_[binIndex];
    if (binItem === null || binItem === undefined) {
      return null;
    } else if (binItem.value !== undefined) {
      return binItem.value;
    }
    return binItem.get(key);
  }

  remove(key) {
    if (key === null || key === undefined) {
      return;
    }
    const hash = this.hash(key);
    const binIndex = hash % this.binCount_;
    const binItem = this.storage_[binIndex];
    if (binItem === null || binItem === undefined) {
      return;
    } else if (typeof binItem.remove !== 'function') {
      this.storage_[binIndex] = null;
    } else {
      binItem.remove(key);
    }
    this.size_--;
  }

  hash(key) {
    if (key === null || key === undefined) {
      throw `key is ${key}`;
    }
    if (Number.isInteger(key) && key <= this.maxIntValue_) {
      return this.hashInteger_(key);
    } else if (typeof key === 'string') {
      return this.hashString_(key);
    } else {
      const keyString = JSON.stringify(key);
      return this.hashString_(keyString);
    }
  }

  createItem_(key, value, hash) {
    return {
      key: key,
      value: value,
      hash: hash,
    };
  }

  hashInteger_(key) {
    if (!Number.isInteger(key)) {
      throw `key '${key}' is not an integer`;
    }
    if (key > this.maxIntValue_) {
      throw `key '${key}' is larger than the maximum supported integer key of '${this.maxIntValue_}'`;
    }
    return (this.factor_ * key + this.bias_) % this.maxIntValue_;
  }

  hashString_(key) {
    if (typeof key !== 'string') {
      throw `key '${key}' is not a string`;
    }
    if (!key.length) {
      throw 'string key is empty and cannot be hashed';
    }
    const encodedKey = this.encodeBase64_(key);
    let hash = 0;
    for (let i = 0; i < encodedKey.length; i++) {
      const charCode = encodedKey.charCodeAt(i);
      hash = (this.factor_ * charCode * i + hash) % this.maxIntValue_;
    }
    return hash;
  }

  areKeysEquivalent_(key1, key2) {
    if (Number.isInteger(key1) && key1 <= this.maxIntValue_
        || typeof key === 'string') {
      return key1 === key2;
    } else {
      const key1String = JSON.stringify(key1);
      const key2String = JSON.stringify(key2);
      return key1String === key2String;
    }
  }

  encodeBase64_(key) {
    const uriEncodedKey = encodeURIComponent(key).replace(
        /%([0-9A-F]{2})/g,
        (match, p1) => String.fromCharCode('0x' + p1));
    return btoa(uriEncodedKey);
  }

}
