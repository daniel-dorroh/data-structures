import { HashSet } from './hash-set';

/**
 * constructor tests
 */
describe('constructor', () => {

  const variousObjects = [1, '25', {}, []];

  test.each(variousObjects)('throws if createKey is not a function', (createKeyFunction) => {
    expect(() => new HashSet(createKeyFunction)).toThrow('createKeyFunction is not a function');
  });

  test.each(variousObjects)('createKey method is default when no function is passed', (item) => {
    const set = new HashSet();
    const key = set.createKey_(item);
    expect(key).toStrictEqual(item);
  });

  test('createKey method works as expected when set', () => {
    const createKeyFunction = (item) => {
      const {id, ...data} = item;
      return data;
    };
    const set = new HashSet(createKeyFunction);
    const data = {a: 25, b: [35, 45]};
    const item = {id: 1234, ...data};
    expect(set.createKey_(item)).toStrictEqual(data);
  });

});

/**
 * add tests
 */
describe('add', () => {

  test.each([null, undefined])('throws if item is null or undefined', (item) => {
    expect(() => new HashSet().add(item)).toThrow(`item is ${item}`);
  });

  test('adds item and returns key', () => {
    const set = new HashSet();
    const item = 25;
    const key = set.add(item);
    expect(set.size()).toBe(1);
    expect(key).toBe(item);
  });

  test('same item twice only adds item once', () => {
    const set = new HashSet();
    const item = 25;
    set.add(item);
    set.add(item);
    expect(set.size()).toBe(1);
  });

});

/**
 * get tests
 */
describe('get', () => {

  test.each([null, undefined])('returns null if key is null or undefined', (key) => {
    expect(new HashSet().get(key)).toBeNull();
  });

  test('returns null for unknown key', () => {
    expect(new HashSet().get(12)).toBeNull();
  });

  test('returns value at key', () => {
    const set = new HashSet();
    const value = 55;
    const key = set.add(55);
    expect(set.get(key)).toBe(value);
  });

});

/**
 * remove tests
 */
describe('remove', () => {

  test('does nothing if item does not exist', () => {
    const set = new HashSet();
    const item = 25;
    set.add(item);
    set.remove(item + 1);
    expect(set.size()).toBe(1);
    expect(set.get(item)).toBe(item);
  });

  test('removes item', () => {
    const set = new HashSet();
    const item = 25;
    set.add(item);
    set.remove(item);
    expect(set.size()).toBe(0);
    expect(set.get(item)).toBeNull();
  });

});

/**
 * iterable protocol tests
 */
test('iterable protocol implementation allows for for..of iteration', () => {
  const set = new HashSet();
  const values = new Set([15, 25, 35, 45]);
  for (let value of values) {
    set.add(value);
  }
  const setValues = new Set();
  for (let value of set) {
    setValues.add(value);
  }
  expect(setValues).toStrictEqual(values);
});
