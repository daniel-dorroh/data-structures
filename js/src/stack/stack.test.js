import { Stack } from './stack';

/**
 * constructor tests
 */
test('constructor makes a stack', () => {
  const stack = new Stack();
  expect(stack).toBeDefined();
  expect(stack.stack_).toHaveLength(0);
});

/**
 * push tests
 */
test.each([null, undefined])('push %s throws', (item) => {
  expect(() => new Stack().push(item)).toThrow(`pushed item is ${item}`);
});

test('push item and item added to stack', () => {
  const stack = new Stack();
  const item = 40;
  stack.push(item);
  expect(stack.stack_).toHaveLength(1);
  expect(stack.stack_[0]).toBe(item);
});

/**
 * pop tests
 */
test('pop empty stack throws', () => {
  expect(() => new Stack().pop()).toThrow('no items on stack to pop');
});

test('pop returns items in lifo order', () => {
  const stack = new Stack();
  const item1 = 25;
  const item2 = 35;
  stack.push(item1);
  stack.push(item2);
  expect(stack.pop()).toBe(item2);
  expect(stack.pop()).toBe(item1);
});

/**
 * peek tests
 */
test('peek empty stack returns undefined', () => {
  expect(new Stack().peek()).toBeUndefined();
});

test('peek stack returns top item', () => {
  const stack = new Stack();
  const item1 = 25;
  const item2 = 35;
  stack.push(item1);
  stack.push(item2);
  expect(stack.peek()).toBe(item2);
  stack.pop();
  expect(stack.peek()).toBe(item1);
});

/**
 * isEmpty tests
 */
test('isEmpty true for empty stack', () => {
  expect(new Stack().isEmpty()).toBe(true);
});

test('isEmpty false for stack with items', () => {
  const stack = new Stack();
  stack.push(25);
  expect(stack.isEmpty()).toBe(false);
});
