import { DoubleList } from './double-list';

/**
 * constructor tests
 */
test('constructor creates new DoubleList', () => {
  const list = new DoubleList();
  expect(list).toBeDefined();
  expect(list.size()).toBe(0);
});

/**
 * getBack tests
 */
test('getBack on an empty list throws', () => {
  expect(() => new DoubleList().getBack()).toThrow();
});

test('getBack returns the back item', () => {
  const list = new DoubleList();
  const item = 25;
  list.pushBack(35);
  list.pushBack(item);
  expect(list.getBack().value).toBe(item);
});

/**
 * pushBack tests
 */
test('pushBack on empty list, front and back the same', () => {
  const list = new DoubleList();
  const itemId = list.pushBack(25);
  expect(list.frontId_).toBe(itemId);
  expect(list.backId_).toBe(itemId);
});

test('pushBack two items, first is front second is back', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  expect(list.frontId_).toBe(item1Id);
  expect(list.backId_).toBe(item2Id);
});

test('pushBack two items, items are two-way-linked', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  const item1 = list.get(item1Id);
  const item2 = list.get(item2Id);
  expect(item1.previous).toBeNull();
  expect(item2.previous).toBe(item1Id);
  expect(item1.next).toBe(item2Id);
  expect(item2.next).toBeNull();
});

test('pushBack an item after a deletion and id is recycled', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  list.delete(item1Id);
  const item2Id = list.pushBack(35);
  expect(item1Id).toBe(item2Id);
});

/**
 * pushFront tests
 */
test('pushFront on empty list, front and back the same', () => {
  const list = new DoubleList();
  const itemId = list.pushFront(25);
  expect(list.frontId_).toBe(itemId);
  expect(list.backId_).toBe(itemId);
});

test('pushFront two items, second is front first is back', () => {
  const list = new DoubleList();
  const item1Id = list.pushFront(25);
  const item2Id = list.pushFront(35);
  expect(list.frontId_).toBe(item2Id);
  expect(list.backId_).toBe(item1Id);
});

test('pushFront two items, items are two-way-linked', () => {
  const list = new DoubleList();
  const item2Id = list.pushFront(25);
  const item1Id = list.pushFront(35);
  const item1 = list.get(item1Id);
  const item2 = list.get(item2Id);
  expect(item1.previous).toBeNull();
  expect(item2.previous).toBe(item1Id);
  expect(item1.next).toBe(item2Id);
  expect(item2.next).toBeNull();
});

test('pushFront an item after a deletion and id is recycled', () => {
  const list = new DoubleList();
  const item1Id = list.pushFront(25);
  list.delete(item1Id);
  const item2Id = list.pushFront(35);
  expect(item1Id).toBe(item2Id);
});

/**
 * insertAfter tests
 */
test('insertAfter with invalid referenceItemId throws', () => {
  expect(() => new DoubleList().insertAfter(0, 25))
      .toThrow('itemId specified does not exist');
});

test('insertAfter adds item to list between two items', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item3Id = list.pushBack(35);
  const item2Id = list.insertAfter(item1Id, 45);
  const item1 = list.get(item1Id);
  const item2 = list.get(item2Id);
  const item3 = list.get(item3Id);
  expect(item1.previous).toBeNull();
  expect(item2.previous).toBe(item1Id);
  expect(item3.previous).toBe(item2Id);
  expect(item1.next).toBe(item2Id);
  expect(item2.next).toBe(item3Id);
  expect(item3.next).toBeNull();
  expect(list.size()).toBe(3);
});

test('insertAfter adds item to end of list', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.insertAfter(item1Id, 45);
  const item2 = list.get(item2Id);
  expect(item2.previous).toBe(item1Id);
  expect(item2.next).toBeNull();
  expect(list.size()).toBe(2);
  expect(list.backId_).toBe(item2Id);
});

test('insertAfter an item after a deletion and id is recycled', () => {
  const list = new DoubleList();
  const item1Id = list.pushFront(25);
  const item2Id = list.pushFront(35);
  list.delete(item1Id);
  const item3Id = list.insertAfter(item2Id, 45);
  expect(item1Id).toBe(item3Id);
  expect(list.size()).toBe(2);
});

/**
 * insertBefore tests
 */
test('insertBefore with invalid referenceItemId throws', () => {
  expect(() => new DoubleList().insertBefore(0, 25))
      .toThrow('itemId specified does not exist');
});

test('insertBefore adds item to list between two items', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item3Id = list.pushBack(35);
  const item2Id = list.insertBefore(item3Id, 45);
  const item1 = list.get(item1Id);
  const item2 = list.get(item2Id);
  const item3 = list.get(item3Id);
  expect(item1.previous).toBeNull();
  expect(item2.previous).toBe(item1Id);
  expect(item3.previous).toBe(item2Id);
  expect(item1.next).toBe(item2Id);
  expect(item2.next).toBe(item3Id);
  expect(item3.next).toBeNull();
  expect(list.size()).toBe(3);
});

test('insertBefore adds item to beginning of list', () => {
  const list = new DoubleList();
  const item2Id = list.pushBack(25);
  const item1Id = list.insertBefore(item2Id, 45);
  const item1 = list.get(item1Id);
  expect(item1.previous).toBeNull();
  expect(item1.next).toBe(item2Id);
  expect(list.size()).toBe(2);
  expect(list.frontId_).toBe(item1Id);
});

test('insertBefore an item after a deletion and id is recycled', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  list.delete(item1Id);
  const item3Id = list.insertBefore(item2Id, 45);
  expect(item1Id).toBe(item3Id);
  expect(list.size()).toBe(2);
});

/**
 * delete tests
 */
test('delete removes only item', () => {
  const list = new DoubleList();
  const itemId = list.pushBack(25);
  list.delete(itemId);
  expect(list.size()).toBe(0);
  expect(list.backId_).toBeNull();
  expect(list.frontId_).toBeNull();
});

test('delete removes item at beginning of the list', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  list.delete(item1Id);
  expect(list.size()).toBe(1);
  expect(list.backId_).toBe(item2Id);
  expect(list.frontId_).toBe(item2Id);
});

test('delete removes item at end of the list', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  list.delete(item2Id);
  expect(list.size()).toBe(1);
  expect(list.backId_).toBe(item1Id);
  expect(list.frontId_).toBe(item1Id);
  expect(list.get(item1Id).next).toBeNull();
});

test('delete removes item and relinks existing items', () => {
  const list = new DoubleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  const item3Id = list.pushBack(45);
  list.delete(item2Id);
  expect(list.size()).toBe(2);
  expect(list.backId_).toBe(item3Id);
  expect(list.frontId_).toBe(item1Id);
  const item1 = list.get(item1Id);
  const item3 = list.get(item3Id);
  expect(item1.previous).toBeNull();
  expect(item3.previous).toBe(item1Id);
  expect(item1.next).toBe(item3Id);
  expect(item3.next).toBeNull();
});

test('delete does nothing when item id does not exist', () => {
  const list = new DoubleList();
  const itemId = list.pushBack(25);
  list.delete(itemId + 1);
  expect(list.size()).toBe(1);
});

test('delete adds freed id', () => {
  const list = new DoubleList();
  const itemId = list.pushBack(25);
  list.delete(itemId);
  expect(list.freedIds_).toStrictEqual([itemId]);
});
