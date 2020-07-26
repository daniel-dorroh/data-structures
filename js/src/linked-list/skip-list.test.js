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
  { size: 5, maxHeight: 2 },
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
    debugger;
    list.insert(20);
    list.insert(2);
    list.insert(5);
    expect(list.lists_).toHaveLength(1);
    const baseList = list.getBaseList_();
    expect(baseList.getFront().value.value).toBe(2);
    expect(baseList.get(baseList.getFront().next).value.value).toBe(5);
    expect(baseList.get(baseList.backId_).value.value).toBe(20);
  });

  test('scales express lanes with added items', () => {
    const list = new SkipList();
    debugger;
    list.insert(65);
    list.insert(55);
    list.insert(45);
    list.insert(35);
    list.insert(25);
    list.insert(15);
    expect(list.lists_).toHaveLength(2);
  });

});
