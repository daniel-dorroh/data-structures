import { Heap, HEAP_TYPES } from './heap';

/**
 * constructor tests
 */
describe('constructor', () => {

  test.each(['minimum', 'mummy', 'mum', 'maxine'])('throws if type is not a valid option', (type) => {
    expect(() => new Heap(type)).toThrow(`type '${type}' is not a valid option. Use HEAP_TYPES`);
  });

  test.each([123, {}, () => true])('throws if initialItems is not iterable', (items) => {
    expect(() => new Heap(HEAP_TYPES.MAXIMUM, items)).toThrow('initialItems is not iterable');
  });

});

/**
 * max heap tests
 */
describe('max heap', () => {

  const type = HEAP_TYPES.MAXIMUM;

  /**
   * max heap constructor tests
   */
  describe('constructor', () => {

    test('default makes a new Heap', () => {
      expect(new Heap()).toBeDefined();
    });

    test('makes a heap with initial items', () => {
      const heap = new Heap(type, [1, 2, 3]);
      expect(heap).toBeDefined();
      expect(heap.pop()).toBe(3);
    });

    test('initializes in correct order', () => {
      const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const heap = new Heap(type, values);
      heap.siftDown_(0);
      expect(heap.heap_).toStrictEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

  });

  /**
   * max heap replace tests
   */
  describe('replace', () => {

    test('pops max value and correctly inserts the replacement', () => {
      const heap = new Heap(type, [1, 2, 3, 4, 5]);
      heap.replace(0);
      expect(heap.pop()).toBe(4);
    });

  });

  /**
   * max heap peek tests
   */
  describe('peek', () => {

    test('returns maximum value without removing it', () => {
      const heap = new Heap(type, [1, 2, 3]);
      expect(heap.peek()).toBe(3);
      expect(heap.pop()).toBe(3);
    });

  });

  /**
   * max heap isValue1Priority_ tests
   */
  describe('isValue1Priority_', () => {

    test.each([
          [null, null],
          [undefined, undefined],
          [null, undefined],
          [undefined, null],
          [25, null],
          [25, undefined],
          [35, 25],
        ])('true if value1 has max priority', (value1, value2) => {
      expect(new Heap(type).isValue1Priority_(value1, value2)).toBe(true);
    });

    test.each([
          [null, 25],
          [undefined, 25],
          [25, 35],
        ])('false if value2 has max priority', (value1, value2) => {
      expect(new Heap(type).isValue1Priority_(value1, value2)).toBe(false);
    });

  });

  /**
   * max heap priorityCompare_ tests
   */
  describe('priorityCompare_', () => {

    test.each([
          [null, null],
          [undefined, undefined],
          [35, 35],
        ])('0 if value1 is the same as value2', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(0);
    });

    test.each([
          [null, undefined],
          [undefined, null],
          [25, null],
          [25, undefined],
          [35, 25],
        ])('1 if value1 has max priority', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(1);
    });

    test.each([
          [null, 25],
          [undefined, 25],
          [25, 35],
        ])('-1 if value2 has max priority', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(-1);
    });

  });

});

/**
 * min heap tests
 */
describe('min heap', () => {

  const type = HEAP_TYPES.MINIMUM;

  /**
   * min heap constructor tests
   */
  describe('constructor', () => {

    test('makes a heap with initial items', () => {
      const heap = new Heap(type, [1, 2, 3]);
      expect(heap).toBeDefined();
      expect(heap.pop()).toBe(1);
    });

    test('initializes in correct order for min Heap', () => {
      const values = [9, 8, 7, 6, 5, 4, 3, 2, 1];
      const heap = new Heap(type, values);
      heap.siftDown_(0);
      expect(heap.heap_).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

  });

  /**
   * min heap replace tests
   */
  describe('replace', () => {

    test('pops max value and correctly inserts the replacement', () => {
      const heap = new Heap(type, [1, 2, 3, 4, 5]);
      heap.replace(0);
      expect(heap.pop()).toBe(0);
    });

  });

  /**
   * min heap peek tests
   */
  describe('peek', () => {

    test('returns minimum value without removing it', () => {
      const heap = new Heap(type, [3, 2, 1]);
      expect(heap.peek()).toBe(1);
      expect(heap.pop()).toBe(1);
    });

  });

  /**
   * min heap isValue1Priority_ tests
   */
  describe('isValue1Priority_', () => {

    test.each([
          [null, null],
          [undefined, undefined],
          [null, undefined],
          [undefined, null],
          [25, null],
          [25, undefined],
          [25, 35],
        ])('true if value1 has min priority', (value1, value2) => {
      expect(new Heap(type).isValue1Priority_(value1, value2)).toBe(true);
    });

    test.each([
          [null, 25],
          [undefined, 25],
          [35, 25],
        ])('false if value2 has min priority', (value1, value2) => {
      expect(new Heap(type).isValue1Priority_(value1, value2)).toBe(false);
    });

  });

  /**
   * min heap priorityCompare_ tests
   */
  describe('priorityCompare_', () => {

    test.each([
          [null, null],
          [undefined, undefined],
          [35, 35],
        ])('0 if value1 is the same as value2', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(0);
    });

    test.each([
          [null, undefined],
          [undefined, null],
          [25, null],
          [25, undefined],
          [25, 35],
        ])('1 if value1 has min priority', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(1);
    });

    test.each([
          [null, 25],
          [undefined, 25],
          [35, 25],
        ])('-1 if value2 has min priority', (value1, value2) => {
      expect(new Heap(type).priorityCompare_(value1, value2)).toBe(-1);
    });

  });

});

/**
 * general heap tests
 */
describe.each([HEAP_TYPES.MINIMUM, HEAP_TYPES.MAXIMUM])('%s heap', (type) => {

  describe('push', () => {

    test('adds item to empty heap at the root', () => {
      const heap = new Heap(type);
      heap.push(25);
      expect(heap.heap_[0]).toBe(25);
    });

    test('heap property is maintained after pushing value', () => {
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < values.length; i++) {
        const initialValues = values.slice(0, i).concat(values.slice(i + 1));
        const heap = new Heap(type, initialValues);
        heap.push(i);
        const heapValues = Array.from(heap);
        for (let j = 0; j < values.length; j++) {
          const parent = heapValues[j];
          const left = heapValues[heap.getLeftChildPosition_(j)];
          const right = heapValues[heap.getRightChildPosition_(j)];
          if (left !== undefined) {
            expect(heap.isValue1Priority_(parent,left)).toBe(true);
          }
          if (right !== undefined) {
            expect(heap.isValue1Priority_(parent, right)).toBe(true);
          }
        }
      }
    });

  });

  /**
   * replace tests
   */
  describe('replace', () => {

    test('works on an empty heap', () => {
      const heap = new Heap(type);
      heap.replace(0);
      expect(heap.pop()).toBe(0);
    });

  });

});
