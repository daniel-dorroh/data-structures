import { DenseRepository } from './dense-repository';

/**
 * constructor tests
 */
test('constructor creates new DenseRepository', () => {
  const repository = new DenseRepository();
  expect(repository).toBeDefined();
  expect(repository.size()).toBe(0);
});
