import { Graph } from './graph';

/**
 * constructor tests
 */
describe('constructor', () => {

  test('makes a new Graph', () => {
    const graph = new Graph();
    expect(graph).toBeDefined();
    expect(graph.edgeCount()).toBe(0);
    expect(graph.nodeCount()).toBe(0);
  });

});

/**
 * nodeCount tests
 */
test('nodeCount returns number of edges', () => {
  const graph = new Graph();
  graph.addNode(25);
  expect(graph.nodeCount()).toBe(1);
});

/**
 * edgeCount tests
 */
test('should ', () => {
  const graph = new Graph();
  const node1Id = graph.addNode(25);
  const node2Id = graph.addNode(35);
  graph.addEdge(node1Id, node2Id);
  expect(graph.edgeCount()).toBe(1);
});

/**
 * getNode tests
 */
describe('getNode', () => {

  test.each([null, undefined])('null or undefined nodeId returns null', (nodeId) => {
    expect(new Graph().getNode(nodeId)).toBeNull();
  });

  test.each([{}, [], '1', true])('get non-number id throws -- arg "%s"', (id) => {
    expect(() => new Graph().getNode(id)).toThrow(`id was ${typeof id}, but it must be a number`);
  });

  test('get decimal id throws', () => {
    expect(() => new Graph().getNode(1.1)).toThrow('id was not an integer');
  });

  test('get with invalid id returns null', () => {
    expect(new Graph().getNode(2)).toBeNull();
  });

});

/**
 * addNode tests
 */
describe('addNode', () => {

  test.each([null, undefined])('throws if value is null or undefined', (value) => {
    expect(() => new Graph().addNode(value)).toThrow(`added value '${value}' is not valid`);
  });

  test('creates new node and adds it to the graph', () => {
    const graph = new Graph();
    const value = 25;
    const nodeId = graph.addNode(value);
    const node = graph.getNode(nodeId);
    expect(nodeId).toBeGreaterThanOrEqual(0);
    expect(node.id).toBe(nodeId);
    expect(node.value).toBe(value);
  });

});

/**
 * addEdge tests
 */
describe('addEdge', () => {

  test.each([null, undefined])('throws if node1Id is null or undefined', (node1Id) => {
    const graph = new Graph();
    const node2Id = graph.addNode(25);
    expect(() => graph.addEdge(node1Id, node2Id)).toThrow(`node1Id '${node1Id}' is not valid`);
  });

  test.each([null, undefined])('throws if node2Id is null or undefined', (node2Id) => {
    const graph = new Graph();
    const node1Id = graph.addNode(25);
    expect(() => graph.addEdge(node1Id, node2Id)).toThrow(`node2Id '${node2Id}' is not valid`);
  });

});
