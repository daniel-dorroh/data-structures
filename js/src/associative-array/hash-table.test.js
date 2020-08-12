import { HashTable } from './hash-table';

/**
 * constructor tests
 */

describe('constructor', () => {

  test.each([0, -1])('throws if binCount is an invalid value', (invalidBinCount) => {
    expect(() => new HashTable(invalidBinCount))
        .toThrow(`${invalidBinCount} is less than 1, the minimum number of bins`);
  });

  test('creates a new HashTable', () => {
    expect(new HashTable()).toBeDefined();
  });

  test('creates a HashTable with the minimum number of bins', () => {
    const table = new HashTable(1);
    table.add(25, 'twenty-five');
    table.add(35, 'thirty-five');
    expect(table.storage_).toHaveLength(1);
    expect(table.size()).toBe(2);
  });

});

/**
 * hashInteger_ tests
 */
describe('hashInteger_', () => {

  test('throws when key larger than max', () => {
    const key = Math.pow(2, 32);
    const table = new HashTable();
    expect(() => table.hashInteger_(key))
        .toThrow(`key '${key}' is larger than the maximum supported integer key of '${table.maxIntValue_}'`);
  });

  test.each([1.233, [], {}, null, undefined])('throws when key is not an integer', (key) => {
    expect(() => new HashTable().hashInteger_(key))
        .toThrow(`key '${key}' is not an integer`);
  });

  // Long running test
  // TODO: uncomment the following test to test for hash uniqueness
  // test('produces unique hashes within 0.5% tolerance for ~1,000,000 random integers', () => {
  //   const hashUniquenessTolerance = 0.005;
  //   const table = new HashTable();
  //   const hashValues = new Set();
  //   const testInputs = new Set();
  //   for (let i = 0; i < 1_000_000; i++) {
  //     const testInput = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
  //     testInputs.add(testInput);
  //     hashValues.add(table.hashInteger_(testInput));
  //   }
  //   expect(hashValues.size).toBeGreaterThan(testInputs.size * (1.0 - hashUniquenessTolerance));
  //   expect(hashValues.size).toBeLessThan(testInputs.size * (1.0 + hashUniquenessTolerance));
  // });

});

/**
 * hashString_ tests
 */
describe('hashString_', () => {

  test.each([1.233, [], {}, null, undefined])('throws when key is not a string', (key) => {
    expect(() => new HashTable().hashString_(key))
        .toThrow(`key '${key}' is not a string`);
  });

  test('throws on empty string', () => {
    expect(() => new HashTable().hashString_(''))
        .toThrow('string key is empty and cannot be hashed');
  });

  test('creates different hash codes for strings containing the same characters', () => {
    const table = new HashTable();
    const key1 = "abc10";
    const key2 = "10abc";
    const key3 = "a1b0c";
    const key4 = "a10bc";
    const hash1 = table.hashString_(key1);
    const hash2 = table.hashString_(key2);
    const hash3 = table.hashString_(key3);
    const hash4 = table.hashString_(key4);
    expect([hash2, hash3, hash4]).not.toContainEqual(hash1);
    expect([hash1, hash3, hash4]).not.toContainEqual(hash2);
    expect([hash1, hash2, hash4]).not.toContainEqual(hash3);
    expect([hash1, hash2, hash3]).not.toContainEqual(hash4);
  });

  // Long running test
  // TODO: uncomment the following test to test for hash uniqueness
  // test('produces unique hashes within 0.5% tolerance for ~1,000,000 random 9 character strings', () => {
  //   const hashUniquenessTolerance = 0.005;
  //   const table = new HashTable();
  //   const hashValues = new Set();
  //   const testInputs = new Set();
  //   for (let i = 0; i < 1_000_000; i++) {
  //     let testInput = "";
  //     for (let j = 0; j < Math.floor(Math.random() * 8) + 1; j++) {
  //       testInput += String.fromCharCode(Math.floor(Math.random() * (Math.pow(2, 32) - 1)));
  //     }
  //     testInputs.add(testInput);
  //     hashValues.add(table.hashString_(testInput));
  //   }
  //   expect(hashValues.size).toBeGreaterThan(testInputs.size * (1.0 - hashUniquenessTolerance));
  //   expect(hashValues.size).toBeLessThan(testInputs.size * (1.0 + hashUniquenessTolerance));
  // });

});

/**
 * hash tests
 */
describe('hash', () => {

  const hashKeys = [25, 25.1212, 'twenty-five', [], {}, { a: 25 }];

  test.each(hashKeys)('produces valid hash for input', (key) => {
    const hash = new HashTable().hash(key);
    expect(hash).toBeGreaterThan(0);
    expect(hash).toBeLessThan(Math.pow(2, 32));
    expect(Number.isInteger(hash)).toBe(true);
  });

  test.each([null, undefined])('throws if null or undefined', (key) => {
    expect(() => new HashTable().hash(key)).toThrow(`key is ${key}`);
  });

  test.each(hashKeys)('produces same hash for unchanging input', (key) => {
    const table = new HashTable();
    const hash1 = table.hash(key);
    const hash2 = table.hash(key);
    expect(hash1).toStrictEqual(hash2);
  });

  test('produces different hash for two objects with same properties and different values', () => {
    const table = new HashTable();
    const key1 = { a: 1, b: 0 };
    const key2 = { a: 0, b: 1 };
    const hash1 = table.hash(key1);
    const hash2 = table.hash(key2);
    expect(hash1).not.toStrictEqual(hash2);
  });

  test('hashes int that is larger than 2^32', () => {
    const table = new HashTable();
    expect(table.hash(Math.pow(2, 33))).toBeDefined();
  });

});

/**
 * get tests
 */
describe('get', () => {

  test.each([null, undefined])('throws for null or undefined key', (key) => {
    expect(() => new HashTable().get(key)).toThrow(`key is ${key}`);
  });

  test('returns null for unknown key', () => {
    expect(new HashTable().get(25)).toBeNull();
  });

  test('returns value for key', () => {
    const table = new HashTable();
    const key = 25;
    const value = 35;
    table.add(key, value);
    expect(table.get(key)).toBe(value);
  });

});

/**
 * add tests
 */
describe('add', () => {

  test.each([null, undefined])('throws for null or undefined key', (key) => {
    expect(() => new HashTable().add(key, 25)).toThrow(`key is ${key}`);
  });

  test.each([25, 25.1212, 'twenty-five', [], {}, { a: 25 }])('replaces value if same key is used twice', (key) => {
    const table = new HashTable();
    const finalValue = 45;
    table.add(key, 35);
    table.add(key, finalValue);
    expect(table.get(key)).toStrictEqual(finalValue);
    expect(table.size()).toBe(1);
  });

});

/**
 * remove tests
 */
describe('remove', () => {

  test.each([null, undefined])('does not throw if key is null or undefined', (key) => {
    expect(() => new HashTable().remove(key)).not.toThrow();
  });

  test('does not throw if key does not exist', () => {
    expect(() => new HashTable().remove(25)).not.toThrow();
  });

  test('removes ordinary item', () => {
    const table = new HashTable();
    const key = 25;
    table.add(key, 55);
    table.remove(key);
    expect(table.get(key)).toBeNull();
    expect(table.size()).toBe(0);
  });

  test('removes nested item', () => {
    const table = new HashTable();
    const hashValues = new Set();
    const previousKeys = {};
    const collisionKeys = [];
    while (true) {
      const key = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
      const hash = table.hash(key);
      if (hashValues.has(hash) && key !== previousKeys[hash]) {
        collisionKeys.push(key);
        collisionKeys.push(previousKeys[hash]);
        break;
      }
      previousKeys[hash] = key;
      hashValues.add(hash);
    }
    let value = 55;
    for (let key of collisionKeys) {
      table.add(key, value++);
    }
    table.remove(collisionKeys[0]);
    expect(table.get(collisionKeys[1])).toBe(56);
    expect(table.get(collisionKeys[0])).toBeNull();
    expect(table.size()).toBe(1);
  });

});

/**
 * collision tests
 */
describe('when hash collisions happen', () => {

  let table1, table2;
  let hashValues, previousKeys, collisionKeys;
  let isKeyFound, binIndex;

  beforeEach(() => {

    table1 = new HashTable();
    table2 = new HashTable();
    hashValues = new Set();
    previousKeys = {};
    collisionKeys = [];
    isKeyFound = false;
    binIndex = null;
    while (true) {
      const key = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
      const hash = table1.hash(key);
      if (isKeyFound && hash % table1.binCount_ === binIndex) {
        collisionKeys.push(key);
        break;
      }
      if (!isKeyFound && hashValues.has(hash) && key !== previousKeys[hash]) {
        collisionKeys.push(key);
        collisionKeys.push(previousKeys[hash]);
        isKeyFound = true;
        binIndex = hash % table1.binCount_;
      }
      previousKeys[hash] = key;
      hashValues.add(hash);
    }

  });

  test('different hash tables produce different hash results', () => {
    expect(table1.hash(collisionKeys[0])).toStrictEqual(table1.hash(collisionKeys[1]));
    expect(table2.hash(collisionKeys[0])).not.toStrictEqual(table2.hash(collisionKeys[1]));
  });

  test('table handles collision by adding bin table', () => {
    const value1 = 25;
    const value2 = 35;
    const key1 = collisionKeys[0];
    const key2 = collisionKeys[1];
    table1.add(key1, value1);
    table1.add(key2, value2);
    const binTable = table1.storage_[binIndex];
    expect(typeof binTable.get).toBe('function');
    expect(binTable.get(key1)).not.toStrictEqual(binTable.get(key2));
    expect(table1.get(key1)).toBe(value1);
    expect(table1.get(key2)).toBe(value2);
  });

  test('3rd or more item is added to the bin table ', () => {
    const value1 = 25;
    const value2 = 35;
    const value3 = 45;
    const key1 = collisionKeys[0];
    const key2 = collisionKeys[1];
    const key3 = collisionKeys[2];
    table1.add(key1, value1);
    table1.add(key2, value2);
    table1.add(key3, value3);
    const binTable = table1.storage_[binIndex];
    expect(binTable.get(key3)).toBe(value3);
    expect(table1.size()).toBe(3);
  });

  test('iterable protocol allows for for..of', () => {
    const value1 = 25;
    const value2 = 35;
    const value3 = 45;
    const value4 = 55;
    const key1 = collisionKeys[0];
    const key2 = collisionKeys[1];
    const key3 = collisionKeys[2];
    const key4 = 12322;
    table1.add(key1, value1);
    table1.add(key2, value2);
    table1.add(key3, value3);
    table1.add(key4, value4);
    const values = new Set([
      {
        key: key1,
        value: value1,
      },
      {
        key: key2,
        value: value2,
      },
      {
        key: key3,
        value: value3,
      },
      {
        key: key4,
        value: value4,
      },
    ]);
    const result = new Set();
    for (let item of table1) {
      result.add({key: item.key, value: item.value});
    }
    expect(result).toStrictEqual(values);
  });

});
