import { Queue } from './queue';

/**
 * constructor tests
 */
test('constructor creates a new Queue', () => {
  const queue = new Queue();
  expect(queue).toBeDefined();
  expect(queue.size()).toBe(0);
});

/**
 * size tests
 */
test('size returns number of elements enqueued', () => {
  const queue = new Queue();
  queue.enqueue(25);
  expect(queue.size()).toBe(1);
  queue.enqueue(35);
  expect(queue.size()).toBe(2);
  queue.dequeue();
  expect(queue.size()).toBe(1);
});


/**
 * enqueue tests
 */
test.each([null, undefined])('enqueue %s throws', (itemValue) => {
  expect(() => new Queue().enqueue(itemValue)).toThrow(`item value was ${itemValue}`);
});

test('enqueue enqueues items in the correct order', () => {
  const queue = new Queue();
  const value1 = 25;
  const value2 = 35;
  const value3 = 45;
  queue.enqueue(value1);
  queue.enqueue(value2);
  queue.enqueue(value3);
  expect(queue.dequeue()).toBe(value1);
  expect(queue.dequeue()).toBe(value2);
  expect(queue.dequeue()).toBe(value3);
});

/**
 * peek tests
 */
test('peek returns null if no items in queue', () => {
  expect(new Queue().peek()).toBeNull();
});

test('peek returns value without dequeuing', () => {
  const queue = new Queue();
  const value = 25;
  queue.enqueue(value);
  expect(queue.peek()).toBe(value);
  expect(queue.size()).toBe(1);
});

/**
 * dequeue tests
 */
test('dequeue returns null if no items in queue', () => {
  expect(new Queue().dequeue()).toBeNull();
});

test('dequeue removes and returns item from the queue', () => {
  const queue = new Queue();
  const value = 25;
  queue.enqueue(value);
  expect(queue.size()).toBe(1);
  expect(queue.dequeue()).toBe(value);
  expect(queue.size()).toBe(0);
});
