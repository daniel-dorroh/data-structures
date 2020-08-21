import { Heap, HEAP_TYPES } from './heap';

describe('constructor', () => {

  test.each(['minimum', 'mummy', 'mum', 'maxine'])('throws if type is not a valid option', (type) => {
    expect(() => new Heap(type)).toThrow(`type '${type}' is not a valid option. Use HEAP_TYPES`);
  });

  test.each([123, {}, () => true])('throws if initialItems is not iterable', (items) => {
    expect(() => new Heap(HEAP_TYPES.MAXIMUM, items)).toThrow('initialItems is not iterable');
  });

});

describe('max heap', () => {

  const type = HEAP_TYPES.MAXIMUM;

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

  describe('replace', () => {

    test('returns max value and correctly inserts the replacement', () => {
      const heap = new Heap(type, [1, 2, 3, 4, 5]);
      heap.replace(0);
      expect(heap.pop()).toBe(4);
    });

  });

});

describe('min heap', () => {

  const type = HEAP_TYPES.MINIMUM;

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

  describe('replace', () => {

    test('returns max value and correctly inserts the replacement', () => {
      const heap = new Heap(type, [1, 2, 3, 4, 5]);
      heap.replace(0);
      expect(heap.pop()).toBe(0);
    });

  });

});
