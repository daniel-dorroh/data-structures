import { SkipList } from './skip-list';

/**
 * constructor tests
 */
test('constructor makes a new SkipList', () => {
  const list = new SkipList();
  expect(list).toBeDefined();
});

/**
 * maxHeight tests
 */
test.each([
  { size: 0, maxHeight: 1 },
  { size: 1, maxHeight: 1 },
  { size: 4, maxHeight: 2 },
  { size: 1000, maxHeight: 9 },
  { size: 10000, maxHeight: 13 }])('maxHeight scales with list size', (args) => {
    const list = new SkipList();
    list.getBaseList_().size_ = args.size;
    expect(list.maxHeight()).toBe(args.maxHeight);
});

/**
 * insert tests
 */
describe('insert', () => {

  test('orders inserted items', () => {
    const list = new SkipList();
    list.insert(20);
    list.insert(2);
    list.insert(5);
    expect(list.levels_).toHaveLength(1);
    const baseList = list.getBaseList_();
    expect(baseList.getFront().value.value).toBe(2);
    expect(baseList.get(baseList.getFront().next).value.value).toBe(5);
    expect(baseList.get(baseList.backId_).value.value).toBe(20);
  });

  test('scales express lanes with added items', () => {
    const list = new SkipList();
    list.insert(65);
    list.insert(35);
    list.insert(55);
    list.insert(25);
    list.insert(45);
    list.insert(15);
    expect(list.levels_).toHaveLength(2);
  });

  test('inserts two items of the same value', () => {
    const list = new SkipList();
    list.insert(25);
    list.insert(25);
    expect(list.size()).toBe(2);
  });

});

/**
 * iterable protocol tests
 */
test('iterable protocol implementation returns items in order with for..of iteration', () => {
  const list = new SkipList();
  const values = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  list.insert(values[2]);
  list.insert(values[5]);
  list.insert(values[1]);
  list.insert(values[0]);
  list.insert(values[9]);
  list.insert(values[6]);
  list.insert(values[7]);
  list.insert(values[8]);
  list.insert(values[4]);
  list.insert(values[3]);
  const results = [];
  for (let item of list) {
    results.push(item.value.value);
  }
  expect(results).toStrictEqual(values);
});

/**
 * delete tests
 */
describe('delete', () => {

  test('updates frontId', () => {
    const list = new SkipList();
    const itemId = list.insert(25);
    list.delete(itemId);
    expect(list.levels_).toHaveLength(1);
    expect(list.frontId_).toBeNull();
  });

  test('removes excess levels', () => {
    const list = new SkipList();
    const itemId = list.insert(15);
    list.insert(35);
    list.insert(45);
    list.insert(55);
    list.delete(itemId);
    expect(list.levels_).toHaveLength(1);
  });

});
