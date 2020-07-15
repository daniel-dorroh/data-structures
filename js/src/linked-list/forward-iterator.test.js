import { ForwardIterator } from './forward-iterator';

/**
 * constructor tests
 */
test('constructor throws if list has incorrect interface', () => {
  expect(() => new ForwardIterator([])).toThrow('list does not have get and/or getFront methods');
});
