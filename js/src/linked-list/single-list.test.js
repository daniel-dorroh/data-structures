import { SingleList } from './single-list';

/**
 * constructor tests
 */
test('constructor makes a list', () => {
  const list = new SingleList();
  expect(list).toBeDefined();
  expect(list.list_).toHaveLength(0);
});

/**
 * pushBack tests
 */
test('pushBack on empty list, front and back the same', () => {
  const list = new SingleList();
  const itemId = list.pushBack(25);
  expect(list.frontId_).toBe(itemId);
  expect(list.backId_).toBe(itemId);
});

test('pushBack two items, first is front second is back', () => {
  const list = new SingleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  expect(list.frontId_).toBe(item1Id);
  expect(list.backId_).toBe(item2Id);
});

test('pushBack two items, items are forward-linked', () => {
  const list = new SingleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  expect(list.get(item1Id).next).toBe(item2Id);
  expect(list.get(item2Id).next).toBe(null);
});

/**
 * pushFront tests
 */
test('pushFront on empty list, front and back the same', () => {
  const list = new SingleList();
  const itemId = list.pushFront(25);
  expect(list.frontId_).toBe(itemId);
  expect(list.backId_).toBe(itemId);
});

test('pushFront two items, second is front first is back', () => {
  const list = new SingleList();
  const item1Id = list.pushFront(25);
  const item2Id = list.pushFront(35);
  expect(list.frontId_).toBe(item2Id);
  expect(list.backId_).toBe(item1Id);
});

test('pushFront two items, items are forward-linked', () => {
  const list = new SingleList();
  const item1Id = list.pushFront(25);
  const item2Id = list.pushFront(35);
  expect(list.get(item2Id).next).toBe(item1Id);
  expect(list.get(item1Id).next).toBe(null);
});

/**
 * size tests
 */
test('size is 0 for empty list', () => {
  expect(new SingleList().size()).toBe(0);
});

test('size returns length of list', () => {
  const list = new SingleList();
  list.pushBack(25);
  expect(list.size()).toBe(1);
  list.pushFront(35);
  expect(list.size()).toBe(2);
});

/**
 * getFront tests
 */
test('getFront on an empty list throws', () => {
  expect(() => new SingleList().getFront()).toThrow();
});

test('getFront on a list with item returns the front item', () => {
  const list = new SingleList();
  const item = 25;
  list.pushFront(item);
  expect(list.getFront().value).toBe(item);
});

/**
 * get tests
 */
test.each([null, undefined])('push %s id throws', (id) => {
  expect(() => new SingleList().get(id)).toThrow(`id was ${id}`);
});

test.each([{}, [], '1', true])('get non-number id throws -- arg "%s"', (id) => {
  expect(() => new SingleList().get(id)).toThrow(`id was ${typeof id}, but it must be a number`);
});

test('get decimal id throws', () => {
  expect(() => new SingleList().get(1.1)).toThrow('id was not an integer');
});

test('get with valid ids returns items', () => {
  const list = new SingleList();
  const value1 = 25;
  const value2 = 35;
  const item1Id = list.pushFront(value1);
  const item2Id = list.pushFront(value2);
  expect(list.get(item1Id).value).toBe(value1);
  expect(list.get(item2Id).value).toBe(value2);
});

test('get with invalid id returns null', () => {
  expect(new SingleList().get(2)).toBeNull();
});

/**
 * deleteAt tests
 */
test('deleteAt removes only item', () => {
  const list = new SingleList();
  const itemId = list.pushBack(25);
  list.deleteAt(itemId);
  expect(list.size()).toBe(0);
  expect(list.backId_).toBeNull();
  expect(list.frontId_).toBeNull();
});

test('deleteAt removes item at beginning of the list', () => {
  const list = new SingleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  list.deleteAt(item1Id);
  expect(list.size()).toBe(1);
  expect(list.backId_).toBe(item2Id);
  expect(list.frontId_).toBe(item2Id);
});

test('deleteAt removes item at end of the list', () => {
  const list = new SingleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  list.deleteAt(item2Id);
  expect(list.size()).toBe(1);
  expect(list.backId_).toBe(item1Id);
  expect(list.frontId_).toBe(item1Id);
  expect(list.get(item1Id).next).toBeNull();
});

test('deleteAt removes item and relinks existing items', () => {
  const list = new SingleList();
  const item1Id = list.pushBack(25);
  const item2Id = list.pushBack(35);
  const item3Id = list.pushBack(45);
  list.deleteAt(item2Id);
  expect(list.size()).toBe(2);
  expect(list.backId_).toBe(item3Id);
  expect(list.frontId_).toBe(item1Id);
  expect(list.get(item1Id).next).toBe(item3Id);
});

test('deleteAt does nothing when item id does not exist', () => {
  const list = new SingleList();
  const itemId = list.pushBack(25);
  list.deleteAt(itemId + 1);
  expect(list.size()).toBe(1);
});

/**
 * delete tests
 */
test('delete item without an id throws', () => {
  const list = new SingleList();
  const itemId = list.pushBack(25)
  expect(() => list.delete({ value: 25, next: null }))
      .toThrow('item does not have an id');
});

test('delete deletes item', () => {
  const list = new SingleList();
  const itemId = list.pushBack(25);
  const item = list.get(itemId);
  list.delete(item);
  expect(list.get(itemId)).toBeNull();
  expect(list.size()).toBe(0);
});

/**
 * getIterator tests
 */
test('getIterator returns new iterator at beginning of list', () => {
  const list = new SingleList();
  const value1 = 25;
  const value2 = 35;
  list.pushBack(value1);
  list.pushBack(value2);
  for (let i = 0; i < 2; i++) {
    const iterator = list.getIterator();
    expect(iterator).toBeDefined();
    expect(iterator.next().value.value).toBe(value1);
    expect(iterator.next().value.value).toBe(value2);
  }
});

/**
 * iterable protocol tests
 */
test('iterable protocol implementation allows for for..of iteration', () => {
  const list = new SingleList();
  const value1 = 25;
  const value2 = 35;
  list.pushBack(value1);
  list.pushBack(value2);
  const results = [];
  for (let item of list) {
    results.push(item.value);
  }
  expect(results).toStrictEqual([value1, value2]);
});

/**
 * isEmpty tests
 */
test('isEmpty true for empty list', () => {
  expect(new SingleList().isEmpty()).toBe(true);
});

test('isEmpty false for list with items', () => {
  const list = new SingleList();
  list.pushBack(25);
  expect(list.isEmpty()).toBe(false);
});
