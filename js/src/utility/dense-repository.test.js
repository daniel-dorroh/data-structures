import { DenseRepository } from './dense-repository';

/**
 * constructor tests
 */
test('constructor creates new DenseRepository', () => {
  const repository = new DenseRepository();
  expect(repository).toBeDefined();
});

/**
 * size tests
 */
describe('size', () => {

  test('is 0 for new repository', () => {
    expect(new DenseRepository().size()).toBe(0);
  });

  test('reflects size of the repository', () => {
    const repository = new DenseRepository();
    const item1Id = repository.add(25);
    const item2Id = repository.add(35);
    expect(repository.size()).toBe(2);
    repository.remove(item2Id);
    expect(repository.size()).toBe(1);
    repository.remove(item1Id);
    expect(repository.size()).toBe(0);
  });

});

/**
 * add tests
 */
describe('add', () => {

  test.each([null, undefined])('throws if item is null or undefined', (item) => {
    expect(() => new DenseRepository().add(item)).toThrow(`item is ${item}`);
  });

  test('adds item and returns id', () => {
    const repository = new DenseRepository();
    const item = 25;
    const itemId = repository.add(item);
    expect(repository.get(itemId)).toBe(item);
  });

  test('sets id property on item if it exists', () => {
    const repository = new DenseRepository();
    const item = { value: 25, id: null };
    const itemId = repository.add(item);
    expect(item.id).toBe(itemId);
  });

  test('issues freed id if one exists', () => {
    const repository = new DenseRepository();
    const value = 35;
    const item = { value: 25, id: null };
    const itemId = repository.add(item);
    repository.remove(itemId);
    const item2 = { value: value, id: null };
    repository.add(item2);
    expect(item.id).toBe(item2.id);
    expect(item2.id).toBe(itemId);
  });

  /**
   * contains
   */
  describe('contains', () => {

    test.each([null, undefined])('false if checked ID is null or undefined', (id) => {
      expect(new DenseRepository().contains(id)).toBe(false);
    });

    test('false if checked ID is not in the repository', () => {
      expect(new DenseRepository().contains(1)).toBe(false);
    });

    test('true if checked ID is in the repository', () => {
      const repository = new DenseRepository();
      const itemId = repository.add(25);
      expect(repository.contains(itemId)).toBe(true);
    });

  });

  /**
   * get tests
   */
  describe('get', () => {

    test.each([null, undefined])('%s id returns null', (id) => {
      expect(new DenseRepository().get(id)).toBeNull();
    });

    test.each([{}, [], '1', true])('non-number id throws -- arg "%s"', (id) => {
      expect(() => new DenseRepository().get(id)).toThrow(`id was ${typeof id}, but it must be a number`);
    });

    test('floating point id throws', () => {
      expect(() => new DenseRepository().get(1.1)).toThrow('id was not an integer');
    });

    test('invalid id returns null', () => {
      expect(new DenseRepository().get(2)).toBeNull();
    });

    test('gets item', () => {
      const repository = new DenseRepository();
      const item = 25;
      const itemId = repository.add(item);
      expect(repository.get(itemId)).toBe(item);
    });

  });

  /**
   * remove tests
   */
  describe('remove', () => {

    test.each([null, undefined, 25])('does nothing for invalid id', (id) => {
      const repository = new DenseRepository();
      const itemId = repository.add(35);
      expect(repository.size()).toBe(1);
      repository.remove(id);
      expect(repository.size()).toBe(1);
      expect(repository.freedIds_).toHaveLength(0);
      expect(repository.get(itemId)).not.toBeNull();
    });

    test('remove removes item and adds freed id', () => {
      const repository = new DenseRepository();
      const item = 25;
      const itemId = repository.add(item);
      repository.remove(itemId);
      expect(repository.size()).toBe(0);
      expect(repository.freedIds_).toHaveLength(1);
      expect(repository.freedIds_[0]).toBe(itemId);
      expect(repository.get(itemId)).toBe(null);
    });

  });

});
