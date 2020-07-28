import { ForwardIterator } from './forward-iterator';
import { SingleList } from './single-list';

/**
 * constructor tests
 */
describe('constructor', () => {

  test('throws if list has incorrect interface', () => {
    expect(() => new ForwardIterator([])).toThrow('list does not have get and/or getFront methods');
  });

  test('initializes mid-list traversal if given initial element id', () => {
    const list = new SingleList();
    list.pushBack(25);
    const item2Id = list.pushBack(35);
    list.pushBack(45);
    const iterator = new ForwardIterator(list, item2Id);
    const item2 = iterator.next().value;
    const item3 = iterator.next().value;
    const finalResult = iterator.next();
    expect(item2.id).toBe(item2Id);
    expect(item2.value).toBe(35);
    expect(item3.value).toBe(45);
    expect(finalResult.done).toBe(true);
  });

});
